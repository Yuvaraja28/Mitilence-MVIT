import { firestoreDB } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getFAQ(): Promise<FAQ[]> {
  const querySnapshot = await getDocs(collection(firestoreDB, 'faq'));
  const faqs = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      question: data.question,
      answer: data.answer
    } as FAQ;
  });
  return faqs;
}