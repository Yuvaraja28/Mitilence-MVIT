import { firestoreDB } from "@/lib/firebase";
import parseEventUser from "@/parsers/user";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export async function getUser(userId: string): Promise<EventUser> {
  const userDoc = await getDoc(doc(firestoreDB, 'users', userId));
  if (userDoc.exists()) {
    return parseEventUser(userDoc.id, userDoc.data());
  } else {
    throw new Error(`User with ID ${userId} not found`);
  }
}

export async function getUsers(): Promise<EventUser[]> {
  const querySnapshot = await getDocs(collection(firestoreDB, 'users'));
  return querySnapshot.docs.map(doc => {
    return parseEventUser(doc.id, doc.data());
  });
}