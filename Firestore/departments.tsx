import { realtimeDB } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export async function getDepartments(): Promise<Department[]> {
  const dbRef = ref(realtimeDB, 'departments');
  try {
    const snapshot = await get(dbRef);
    if (!snapshot.exists()) {
      return [];
    }
    const departments: Department[] = Object.entries(snapshot.val()).map(([id, data]: [string, any]) => ({
      id: data.id,
      name: data.name,
      staffName: data.staffName,
      staffPhone: data.staffPhone,
      logoUrl: data.logoUrl,
      order: data.order
    }));
    return departments.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching Departments:", error);
    return [];
  }
}