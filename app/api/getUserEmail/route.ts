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
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!['paymentDesk', 'organizer', 'admin'].includes(decodedToken?.role)) throw "Invalid Role";
  } catch (e) {
    console.error('Invalid Token Passed');
    return NextResponse.json({ error: 'Invalid Token Passed' }, { status: 401 });
  }

  try {
    const eventData = await req.json();
    if (eventData?.emailId == null) throw "Email Id not passed";
    const userRecord = await admin.auth().getUserByEmail(eventData?.emailId);
    const userDoc = await db.collection('users').doc(userRecord.uid).get()
    const userData = parseEventUser(userDoc.id, userDoc.data() || {}, false);
    const paymentDoc = await db.collection('payments').doc(userRecord.uid).get()
    const paymentData = parsePayments(paymentDoc.id, paymentDoc.data() || {}, false);
    return NextResponse.json({
      user: userData,
      payments: paymentData
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}