import { firestoreDB } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { parseEventOrganizer } from "@/parsers/organizer";

interface EventOrganizer {
  readonly id: string;
  name: string;
  role: string;
  emailId: string;
  phoneNo: string;
  departmentId: string;
  imageUrl?: string;
}

export async function getOrganizer(organizerId: string): Promise<EventOrganizer> {
  const organizerDoc = await getDoc(doc(firestoreDB, 'organizers', organizerId));
  if (organizerDoc.exists()) {
    return parseEventOrganizer(organizerDoc.id, organizerDoc.data());
  } else {
    throw new Error(`Organizer with ID ${organizerId} not found`);
  }
}