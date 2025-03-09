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
    if (new Date("2025-03-09T23:23:23") > new Date()) {
      throw "On-spot Registrations are only available"
    }
  
    const departmentData = await req.json();
    if (departmentData?.departmentId == null) throw "Department Id not passed";

    const userDoc = db.collection('users').doc(userId);
    const userData = (await userDoc.get()).data();

    if (userData == null) throw "User onboarding has not been done";

    const userPaymentDoc = db.collection('payments').doc(userId);
    const userPaymentData = (await userPaymentDoc.get()).data() || {};

    // const eventsDoc = await db.collection('events').doc(departmentData?.eventId).get();
    // if (!eventsDoc.exists) {
    //   return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    // }
    // const eventDBData = parseEvents(eventsDoc.id, eventsDoc.data() || {});
    // if ((eventDBData?.eventClosed || false) || (eventDBData?.registrationsClosed || false)) {
    //   return NextResponse.json({ error: 'Department Registrations closed' }, { status: 403 });
    // }
    
    if ((userPaymentData?.mitilence?.[departmentData.departmentId] || {})?.registrationStatus) {
      return NextResponse.json({ error: 'Department Registration already done' }, { status: 403 });
    }
    
    const departmentObject: any = {
      departmentId: String(departmentData.departmentId),
      registeredTime: new Date().toISOString(),
      registrationStatus: true
    }

    const departmentUserPayment = {
      ...userPaymentData,
      mitilence: {
        ...(userPaymentData?.mitilence || {}),
        [String(departmentData.departmentId)]: {
          ...(userPaymentData?.mitilence?.[String(departmentData.departmentId)] || {}), ...departmentObject
        },
      },
    };
    
    await userPaymentDoc.set(departmentUserPayment, { merge: true });
    return NextResponse.json({ message: 'Department registration successfully' }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: (typeof error === 'string') ? error : 'Invalid department data' }, { status: 400 });
  }
}