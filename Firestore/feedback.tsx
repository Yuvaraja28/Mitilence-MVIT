import { firestoreDB } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function getFeedback(userId: string): Promise<any> {
  const userDoc = await getDoc(doc(firestoreDB, 'feedbacks', userId));
  if (userDoc.exists()) {
    return {...userDoc.data()};
  } else {
    return null;
  }
}

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