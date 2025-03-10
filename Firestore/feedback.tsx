import { firestoreDB } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function setFeedback(userId: string, feedback: Feedback): Promise<void> {
  const feedbackRef = doc(firestoreDB, 'feedbacks', userId);
  try {
    await setDoc(feedbackRef, feedback);
    console.log("Feedback set successfully for user:", userId);
  } catch (error) {
    console.error("Error setting feedback:", error);
    throw new Error(`Failed to set feedback for user ${userId}`);
  }
}