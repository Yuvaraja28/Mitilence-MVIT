import { firestoreDB } from "@/lib/firebase";
import parsePayments from "@/parsers/payments";
import { doc, getDoc } from "firebase/firestore";

export async function getPayment(userId: string): Promise<EventUserPayments | null> {
  const paymentDoc = await getDoc(doc(firestoreDB, 'payments', userId));
  if (paymentDoc.exists()) {
    return parsePayments(paymentDoc.id, paymentDoc.data());
  } else {
    return null
  }
}