import { firestoreDB } from "@/lib/firebase";
import parsePayments from "@/parsers/payments";
import { doc, getDoc } from "firebase/firestore";

export async function getPayment(userId: string): Promise<EventUserPayments | null> {
  const organizerDoc = await getDoc(doc(firestoreDB, 'payments', userId));
  if (organizerDoc.exists()) {
    return parsePayments(organizerDoc.id, organizerDoc.data());
  } else {
    return null
  }
}