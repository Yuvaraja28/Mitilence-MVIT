export function parseEventOrganizer(id: string, data: any): EventOrganizer {
  return {
    id: id,
    name: data?.name,
    role: data?.role,
    emailId: data?.emailId,
    phoneNo: data?.phoneNo,
    departmentId: data?.departmentId,
    imageUrl: data?.imageUrl
  };
}