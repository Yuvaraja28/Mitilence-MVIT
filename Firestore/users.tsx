import { firestoreDB } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

export async function getUser(userId: string): Promise<EventUser> {
  const userDoc = await getDoc(doc(firestoreDB, 'users', userId));
  if (userDoc.exists()) {
    const data = userDoc.data();
    return {
      id: userDoc.id,
      name: data?.name,
      enrollNo: data?.enrollNo,
      emailId: data?.emailId,
      phoneNo: data?.phoneNo,
      college: data?.college,
      department: data?.department,
      imageUrl: data?.imageUrl,
      gender: data?.gender,
      year: data?.year,
      createdTime: (data.createdTime instanceof Timestamp ? data.createdTime.toDate() : new Date(data.createdTime)).toISOString()
    };
  } else {
    throw new Error(`User with ID ${userId} not found`);
  }
}
