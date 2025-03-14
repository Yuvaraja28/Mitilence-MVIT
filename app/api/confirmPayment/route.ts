import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import parseEventUser from '@/parsers/user';
import parsePayments from '@/parsers/payments';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY as string);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const idToken = authHeader.split('Bearer ')[1];
    var decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedToken?.roles?.some((role: string) => ['paymentDesk'].includes(role))) {
      throw "Invalid Role";
    }
  } catch (e) {
    console.error('Invalid Token Passed');
    return NextResponse.json({ error: 'Invalid Token Passed' }, { status: 401 });
  }
  
  try {
    const userJson = await req.json();
    if ((userJson?.userId == null) || (userJson?.participantType == null)) throw "User Id / Participant Type not passed";
    const userPaymentDocRef = db.collection('payments').doc(userJson?.userId)
    const userPaymentDoc = await  userPaymentDocRef.get();
    const userPaymentData = parsePayments(userPaymentDoc.id, userPaymentDoc.data() || {});
    
    if ((userPaymentData?.mitilence || {})?.[decodedToken.departmentId]?.paymentStatus) {
      return NextResponse.json({ error: `${decodedToken.departmentId.toUpperCase()} Department Amount already Paid` }, { status: 403 });
    }

    const paymentDataUpdate = {
      ...userPaymentData?.mitilence?.[String(decodedToken.departmentId)] || {},
      paymentStatus: true,
      paymentVerifiedBy: decodedToken.uid,
      paymentTime: new Date().toISOString(),
      paymentVerifiedByName: decodedToken?.name,
      participantType: userJson?.participantType,
      departmentId: String(decodedToken.departmentId),
    }
    if (!(paymentDataUpdate?.registrationStatus || false)) {
      paymentDataUpdate['departmentId'] = String(decodedToken.departmentId),
      paymentDataUpdate['registeredTime'] = new Date().toISOString(),
      paymentDataUpdate['registrationStatus'] = true
    }

    const userDoc = await db.collection('users').doc(userJson?.userId).get()
    const userData = parseEventUser(userDoc.id, userDoc.data() || {});

    const eventUserPayment = {
      ...userPaymentData,
      user: userData,
      mitilence: {
        ...(userPaymentData?.mitilence || {}),
        [String(decodedToken.departmentId)]: { ...paymentDataUpdate },
      },
    };
    await userPaymentDocRef.set(eventUserPayment, { merge: true });

    const paymentDoc = await db.collection('payments').doc(userJson?.userId).get()
    const paymentData = parsePayments(paymentDoc.id, paymentDoc.data() || {});

//     const currentDepartment = decodedToken?.departmentId?.toUpperCase() || '';
//     const msgContents = `🎉 Payment Successful – Welcome to ${currentDepartment} Events at Mitilence! 🎉

// Hey ${userData.name},

// Your payment for ${currentDepartment} Department events has been successfully received! ✅ Get ready for an exciting day of tech, innovation, and fun! 🚀

// 📍 What’s next?
// ✔️ Your registration is confirmed—just show up and enjoy!
// ✔️ Visit mitilence.1he.dev to check event timings and venues.
// ✔️ Go to mitilence.1he.dev/profile to get your Profile QR.
// ✔️ Show your QR at event entry for a smooth check-in.

// See you at Mitilence! 🔥💻 Let’s make it an unforgettable event! 🚀`
//     const whatsappUrl = '';
//     fetch(`${whatsappUrl}/data`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ phone: `+91${userData.phoneNo}`, message: msgContents })
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Optionally handle the response data
//         console.log(data);
//       })
//       .catch(error => {
//         console.error('Whatsapp Error:', error);
//       });

    return NextResponse.json({
      user: userData,
      payments: paymentData
    }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
  }
}