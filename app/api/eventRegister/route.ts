import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

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
    var userId = decodedToken.uid;
  } catch {
    return NextResponse.json({ error: 'Invalid Token Passed' }, { status: 401 });
  }
  
  try {
    const eventData = await req.json();
    if (eventData?.eventId == null) throw "Event Id not passed";
    const userPaymentDoc = db.collection('payments').doc(userId);
    const userPaymentData = (await userPaymentDoc.get()).data() || {};
    
    if (Object.keys(userPaymentData?.events || {}).includes(String(eventData.eventId))) {
      return NextResponse.json({ error: 'Event Registration already done' }, { status: 403 });      
    }
    
    const eventObject: any = {
      eventId: String(eventData.eventId),
      registeredTime: new Date()
    }

    const eventUserPayment = {
      ...userPaymentData,
      events: {
        ...(userPaymentData?.events || {}),
        [String(eventData.eventId)]: {
          ...(userPaymentData?.events?.[String(eventData.eventId)] || {}), ...eventObject
        },
      },
    };
    
    await userPaymentDoc.set(eventUserPayment, { merge: true });
    return NextResponse.json({ message: 'Event registered successfully' }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
  }
}