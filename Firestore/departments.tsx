import { firestoreDB } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getDepartments(): Promise<Department[]> {
  const querySnapshot = await getDocs(collection(firestoreDB, 'departments'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data()?.name,
    fullName: doc.data()?.fullName,
    order: doc.data()?.order,
    logoUrl: doc.data()?.logoUrl,
    bannerUrl: doc.data()?.bannerUrl
  })).sort((a, b) => a.order - b.order);
}