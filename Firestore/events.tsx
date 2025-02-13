import { firestoreDB } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getEvents(): Promise<Events[]> {
  const querySnapshot = await getDocs(collection(firestoreDB, 'events'));
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data?.name,
      departmentId: data?.departmentId,
      startTime: data?.startTime,
      endTime: data?.endTime,
      teamSize: data?.teamSize,
      place: data?.place,
      totalSeats: data?.totalSeats,
      seatsLeft: data?.seatsLeft,
      entryFee: data?.entryFee,
      bannerUrl: data?.bannerUrl,
      eventCategory: data?.eventCategory,
      registrationEndTime: data?.registrationEndTime,
      studentOrganizerId: data?.studentOrganizerId,
      facultyOrganizerId: data?.facultyOrganizerId,
      eventType: data?.eventType,
    };
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}