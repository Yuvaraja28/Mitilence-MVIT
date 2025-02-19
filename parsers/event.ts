import { Timestamp } from 'firebase/firestore';

export default function parseEvents(id: string, data: any): Events {
  return {
    id: id,
    name: data?.name,
    departmentId: data?.departmentId,
    startTime: (data?.startTime instanceof Timestamp ? data?.startTime.toDate() : new Date(data?.startTime)).toISOString(),
    endTime: (data?.endTime instanceof Timestamp ? data?.endTime.toDate() : new Date(data?.endTime)).toISOString(),
    teamSize: data?.teamSize,
    place: data?.place,
    totalSeats: data?.totalSeats,
    seatsLeft: data?.seatsLeft,
    entryFee: data?.entryFee,
    logoUrl: data?.logoUrl,
    eventCategory: data?.eventCategory,
    registrationEndTime: (data.registrationEndTime instanceof Timestamp ? data.registrationEndTime.toDate() : new Date(data.registrationEndTime)).toISOString(),
    studentOrganizerId: data?.studentOrganizerId,
    facultyOrganizerId: data?.facultyOrganizerId,
    eventType: data?.eventType,
    eventDescription: data?.eventDescription,
    linkRegistration: data?.linkRegistration,
    closed: data?.closed || false,
  };
}