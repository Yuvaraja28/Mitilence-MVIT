import { firestoreDB } from "@/lib/firebase";
import parsePayments from "@/parsers/payments";
import { doc, getDoc } from "firebase/firestore";

export async function getPayment(userId: string): Promise<EventUserPayments> {
  const organizerDoc = await getDoc(doc(firestoreDB, 'payments', userId));
  if (organizerDoc.exists()) {
    return parsePayments(organizerDoc.id, organizerDoc.data());
  } else {
    throw new Error(`User with ID ${userId} not found`);
  }
}