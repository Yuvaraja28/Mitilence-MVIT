import { firestoreDB } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getEventCategories(): Promise<EventCategory[]> {
  const querySnapshot = await getDocs(collection(firestoreDB, 'eventCategories'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data()?.name,
    order: doc.data()?.order
  })).sort((a, b) => a.order - b.order);
}