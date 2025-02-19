import { realtimeDB } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export async function getAdministrationMembers(): Promise<AdministrationMember[]> {
  const dbRef = ref(realtimeDB, 'administration');
  try {
    const snapshot = await get(dbRef);
    if (!snapshot.exists()) {
      return [];
    }
    const members: AdministrationMember[] = Object.entries(snapshot.val()).map(([id, data]: [string, any]) => ({
      id,
      name: data.name,
      role: data.role,
      imageUrl: data.imageUrl,
      order: data.order
    }));
    return members.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching administration members:", error);
    return [];
  }
}