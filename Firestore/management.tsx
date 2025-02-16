import { firestoreDB } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getManagementMembers(): Promise<ManagementMember[]> {
  const querySnapshot = await getDocs(collection(firestoreDB, 'management'));
  const members = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      role: data.role,
      imageUrl: data.imageUrl,
      order: data.order
    } as ManagementMember;
  });
  return members.sort((a, b) => a.order - b.order);
}
