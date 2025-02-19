import { firestoreDB } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { parseEventOrganizer } from "@/parsers/organizer";

export async function getOrganizer(organizerId: string): Promise<EventOrganizer> {
  const organizerDoc = await getDoc(doc(firestoreDB, 'organizers', organizerId));
  if (organizerDoc.exists()) {
    return parseEventOrganizer(organizerDoc.id, organizerDoc.data());
  } else {
    throw new Error(`Organizer with ID ${organizerId} not found`);
  }
}