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
    
    if (Object.keys(userPaymentData?.mitilence || {}).includes(String(decodedToken.departmentId))) {
      return NextResponse.json({ error: `${decodedToken.departmentId.toUpperCase()} Department Amount already Paid` }, { status: 403 });
    }

    const paymentDataUpdate = {
      departmentId: String(decodedToken.departmentId),
      paymentTime: new Date(),
      paymentVerifiedBy: decodedToken.uid,
      paymentVerifiedByName: decodedToken?.name,
      participantType: userJson?.participantType
    }

    const eventUserPayment = {
      ...userPaymentData,
      mitilence: {
        ...(userPaymentData?.mitilence || {}),
        [String(decodedToken.departmentId)]: {
          ...(userPaymentData?.mitilence?.[String(decodedToken.departmentId)] || {}), ...paymentDataUpdate
        },
      },
    };
    await userPaymentDocRef.set(eventUserPayment, { merge: true });

    const userDoc = await db.collection('users').doc(userJson?.userId).get()
    const userData = parseEventUser(userDoc.id, userDoc.data() || {}, false);
    const paymentDoc = await db.collection('payments').doc(userJson?.userId).get()
    const paymentData = parsePayments(paymentDoc.id, paymentDoc.data() || {});
    return NextResponse.json({
      user: userData,
      payments: paymentData
    }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
  }
}