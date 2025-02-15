import { firestoreDB } from "@/lib/firebase";
import parseEventUser from "@/parsers/user";
import { doc, getDoc } from "firebase/firestore";

export async function getUser(userId: string): Promise<EventUser> {
  const userDoc = await getDoc(doc(firestoreDB, 'users', userId));
  if (userDoc.exists()) {
    return parseEventUser(userDoc.id, userDoc.data());
  } else {
    throw new Error(`User with ID ${userId} not found`);
  }
}
