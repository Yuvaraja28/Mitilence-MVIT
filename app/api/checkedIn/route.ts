import * as admin from 'firebase-admin';
import parsePayments from '@/parsers/payments';
import { NextRequest, NextResponse } from 'next/server';

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
    if (!decodedToken?.roles?.some((role: string) => ['organizer'].includes(role))) {
      throw "Invalid Role";
    }
  } catch (e) {
    console.error('Invalid Token Passed');
    return NextResponse.json({ error: 'Invalid Token Passed' }, { status: 401 });
  }
  
  try {
    const userJson = await req.json();
    if ((userJson?.userId == null) || (userJson?.eventId == null)) throw "User Id / Event Id Type not passed";
    const userPaymentDocRef = db.collection('payments').doc(userJson?.userId)
    const userPaymentDoc = await  userPaymentDocRef.get();
    const userPaymentData = parsePayments(userPaymentDoc.id, userPaymentDoc.data() || {});
    
    if (!(userPaymentData?.mitilence || {})?.[decodedToken.departmentId]?.paymentStatus) {
      return NextResponse.json({ error: `${decodedToken.departmentId.toUpperCase()} Department Amount not Paid` }, { status: 403 });
    }

    const eventDataUpdate = {
      eventId: userJson.eventId,
      checkedInBy: decodedToken.uid,
      checkedInByName: decodedToken.name,
      departmentId: decodedToken.departmentId,
      checkedInTime: new Date().toISOString(),
      checkedInStatus: true
    }

    const eventUserPayment = {
      ...userPaymentData,
      events: {
        ...(userPaymentData?.events || {}),
        [String(userJson?.eventId)]: {
          ...(userPaymentData?.events?.[String(userJson?.eventId)] || {}), ...eventDataUpdate
        },
      },
    };
    await userPaymentDocRef.set(eventUserPayment, { merge: true });
    return NextResponse.json({ message: "Successfully Checked in this Participant" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
  }
}