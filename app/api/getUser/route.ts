import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import parseEventUser from '@/parsers/user';
import parsePayments from '@/parsers/payments';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_JSON as string);
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
    if (!decodedToken?.roles?.some((role: string) => ['paymentDesk', 'organizer', 'admin', 'superadmin'].includes(role))) {
      throw "Invalid Role";
    }
  } catch (e) {
    console.error('Invalid Token Passed');
    return NextResponse.json({ error: 'Invalid Token Passed' }, { status: 401 });
  }

  try {
    const eventData = await req.json();
    var userId = null;
    if ((eventData?.emailId == null) && (eventData?.userId == null)) throw "Email Id or User Id not passed";
    if (eventData?.emailId != null) {
      const userRecord = await admin.auth().getUserByEmail(eventData?.emailId);
      userId = userRecord.uid
    } else if (eventData?.userId != null) {
      userId = eventData?.userId
    }
    const userDoc = await db.collection('users').doc(userId).get()
    const userData = parseEventUser(userDoc.id, userDoc.data() || {});
    if (userData?.name == null) {
      return NextResponse.json({ error: 'User not done onboarding process' }, { status: 403 });
    }
    const paymentDoc = await db.collection('payments').doc(userId).get()
    const paymentData = parsePayments(paymentDoc.id, paymentDoc.data() || {});
    return NextResponse.json({
      user: userData,
      payments: paymentData
    }, { status: 200 });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: (error?.details === 'Quota exceeded.') ? "Contact tehnical team 8778171244" : 'User not found' }, { status: 404 });
  }
}