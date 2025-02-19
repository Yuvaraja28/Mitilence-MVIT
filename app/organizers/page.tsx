'use client';
import DataGrid from "@/components/internal/datagrid";

export default function Organizers() {
  return (
    <div
      className="flex flex-col gap-2 w-full px-5 lg:px-16 pt-32 lg:pt-22 py-8 min-h-[100vh]"
    >
      <DataGrid />
    </div>
  )
}