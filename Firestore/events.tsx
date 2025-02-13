import { firestoreDB } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export async function getEvents(): Promise<Events[]> {
  const querySnapshot = await getDocs(collection(firestoreDB, 'events'));
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data?.name,
      departmentId: data?.departmentId,
      startTime: (data.startTime instanceof Timestamp ? data.startTime.toDate() : new Date(data.startTime)).toISOString(),
      endTime: (data.endTime instanceof Timestamp ? data.endTime.toDate() : new Date(data.endTime)).toISOString(),
      teamSize: data?.teamSize,
      place: data?.place,
      totalSeats: data?.totalSeats,
      seatsLeft: data?.seatsLeft,
      entryFee: data?.entryFee,
      bannerUrl: data?.bannerUrl,
      eventCategory: data?.eventCategory,
      registrationEndTime: (data.registrationEndTime instanceof Timestamp ? data.registrationEndTime.toDate() : new Date(data.registrationEndTime)).toISOString(),
      studentOrganizerId: data?.studentOrganizerId,
      facultyOrganizerId: data?.facultyOrganizerId,
      eventType: data?.eventType,
      eventDescription: data?.eventDescription
    };
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

export async function getEvent(eventId: string): Promise<Events> {
  const eventDoc = await getDoc(doc(firestoreDB, 'events', eventId));
  if (eventDoc.exists()) {
    const data = eventDoc.data();
    return {
      id: eventDoc.id,
      name: data?.name,
      departmentId: data?.departmentId,
      startTime: (data.startTime instanceof Timestamp ? data.startTime.toDate() : new Date(data.startTime)).toISOString(),
      endTime: (data.endTime instanceof Timestamp ? data.endTime.toDate() : new Date(data.endTime)).toISOString(),
      teamSize: data?.teamSize,
      place: data?.place,
      totalSeats: data?.totalSeats,
      seatsLeft: data?.seatsLeft,
      entryFee: data?.entryFee,
      bannerUrl: data?.bannerUrl,
      eventCategory: data?.eventCategory,
      registrationEndTime: (data.registrationEndTime instanceof Timestamp ? data.registrationEndTime.toDate() : new Date(data.registrationEndTime)).toISOString(),
      studentOrganizerId: data?.studentOrganizerId,
      facultyOrganizerId: data?.facultyOrganizerId,
      eventType: data?.eventType,
      eventDescription: data?.eventDescription
    };
  } else {
    throw new Error(`Event with ID ${eventId} not found`);
  }
}