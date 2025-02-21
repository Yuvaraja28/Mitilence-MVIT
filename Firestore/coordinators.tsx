import { firestoreDB } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { parseEventCoordinator } from "@/parsers/coordinator";

export async function getCoordinator(coordinatorId: string): Promise<EventCoordinator> {
  const organizerDoc = await getDoc(doc(firestoreDB, 'coordinators', coordinatorId));
  if (organizerDoc.exists()) {
    return parseEventCoordinator(organizerDoc.id, organizerDoc.data());
  } else {
    throw new Error(`Coordinator with ID ${coordinatorId} not found`);
  }
}