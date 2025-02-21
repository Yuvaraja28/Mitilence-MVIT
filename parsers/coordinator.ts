export function parseEventCoordinator(id: string, data: any): EventCoordinator {
  return {
    id: id,
    name: data?.name,
    role: data?.role,
    departmentId: data?.departmentId
  };
}