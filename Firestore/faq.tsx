import { realtimeDB } from "@/lib/firebase";
import { get, ref } from "firebase/database";

export async function getFAQ(): Promise<FAQ[]> {
  const dbRef = ref(realtimeDB, 'faqs');
  try {
    const snapshot = await get(dbRef);
    if (!snapshot.exists()) {
      return [];
    }
    const faqs: FAQ[] = Object.entries(snapshot.val()).map(([id, data]: [string, any]) => ({
      question: data.question,
      answer: data.answer
    }));
    return faqs;
  } catch (error) {
    console.error("Error fetching faqs:", error);
    return [];
  }
}