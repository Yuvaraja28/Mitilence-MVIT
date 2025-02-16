import parseEvents from "@/parsers/event";
import { firestoreDB } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export async function getEvents(): Promise<Events[]> {
  const querySnapshot = await getDocs(collection(firestoreDB, 'events'));
  return querySnapshot.docs.map(doc => {
    return parseEvents(doc.id, doc.data());
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

export async function getEvent(eventId: string): Promise<Events> {
  const eventDoc = await getDoc(doc(firestoreDB, 'events', eventId));
  if (eventDoc.exists()) {
    return parseEvents(eventDoc.id, eventDoc.data());
  } else {
    throw new Error(`Event with ID ${eventId} not found`);
  }
}