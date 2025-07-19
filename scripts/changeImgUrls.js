require('dotenv').config(); // Load env vars from .env
const admin = require('firebase-admin');

// Parse service account JSON from env variable
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Base URL to remove
const baseUrl = 'https://ik.imagekit.io/azpbhf6oa';

async function updateEventLogos() {
  const eventsRef = db.collection('events');
  const snapshot = await eventsRef.get();

  if (snapshot.empty) {
    console.log('No events found.');
    return;
  }

  const batch = db.batch();

  snapshot.forEach(doc => {
    const data = doc.data();
    const logoUrl = data.logoUrl;

    if (logoUrl && logoUrl.startsWith(baseUrl)) {
      const newLogoUrl = logoUrl.replace(baseUrl, '');
      console.log(`Updating [${doc.id}] logoUrl: ${logoUrl} -> ${newLogoUrl}`);

      const docRef = eventsRef.doc(doc.id);
      batch.update(docRef, { logoUrl: newLogoUrl });
    }
  });

  await batch.commit();
  console.log('All matching logoUrls updated.');
}

updateEventLogos().catch(console.error);