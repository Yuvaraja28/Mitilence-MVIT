export default function parseEvents(id: string, data: any): Events {
  return {
    id: id,
    name: data?.name,
    departmentId: data?.departmentId,
    startTime: data?.startTime,
    endTime: data?.endTime,
    teamSize: data?.teamSize,
    place: data?.place,
    totalSeats: data?.totalSeats,
    seatsLeft: data?.seatsLeft,
    entryFee: data?.entryFee,
    logoUrl: data?.logoUrl,
    eventCategory: data?.eventCategory,
    registrationEndTime: data?.registrationEndTime,
    studentCoordinatorId: data?.studentCoordinatorId,
    facultyCoordinatorId: data?.facultyCoordinatorId,
    eventType: data?.eventType,
    eventDescription: data?.eventDescription,
    linkRegistration: data?.linkRegistration,
    studentOrganizer: data?.studentOrganizer,
    facultyOrganizer: data?.facultyOrganizer,
  };
}