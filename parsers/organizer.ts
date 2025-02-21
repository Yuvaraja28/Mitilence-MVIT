export function parseEventOrganizer(id: string, data: any): EventOrganizer {
  return {
    id: id,
    name: data?.name,
    roles: data?.roles || [],
    emailId: data?.emailId,
    departmentId: data?.departmentId
  };
}