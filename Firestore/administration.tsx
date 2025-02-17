import { firestoreDB } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getadministrationMembers(): Promise<AdministrationMember[]> {
  const querySnapshot = await getDocs(collection(firestoreDB, 'administration'));
  const members = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      role: data.role,
      imageUrl: data.imageUrl,
      order: data.order
    } as AdministrationMember;
  });
  return members.sort((a, b) => a.order - b.order);
}
