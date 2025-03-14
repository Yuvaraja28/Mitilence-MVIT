'use client';
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem
} from "@heroui/react";
import ExcelJS from "exceljs";
import parseEventUser from "@/parsers/user";
import parsePayments from "@/parsers/payments";
import { DefaultMemberImg } from "@/variables";
import downloadBlob from "@/utils/downloadBlob";
import { useFirebase } from "@/contexts/firebase";
import "@/components/styles/overideHerouiSelect.css";
import { parseDateTimeShort } from "@/utils/parseDate";
import { ChevronDownIcon, Download, SearchIcon } from "lucide-react";
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "ENROLL NO", uid: "enrollNo" },
  { name: "PHONE", uid: "phoneNo" },
  { name: "COLLEGE", uid: "college" },
  { name: "GENDER", uid: "gender" },
  { name: "REGISTER TIME", uid: "registerTime" },
  { name: "CHECKED IN", uid: "checkedIn" },
  { name: "PAYMENT", uid: "payment" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  paid: "success",
  not_paid: "warning",
};

const INITIAL_VISIBLE_COLUMNS = columns.map(c => c.uid);

interface EventProps {
  currentDepartment: string | null;
  setPopupUser: (param: EventUserPayments) => void;
  selectedEvent: string | null;
  setSelectedEvent: (param: string) => void;
  checkInCallback?: (userId: string) => void;
  setCheckInModal?: (value: boolean) => void;
  children?: React.ReactNode
}

export default function EventParticipants({ currentDepartment, setPopupUser, children, selectedEvent, setSelectedEvent, setCheckInModal, checkInCallback }: EventProps) {
  const firebaseContext = useFirebase();
  const events = firebaseContext?.events;
  const firestoreDB = firebaseContext?.firestoreDB;
  const eventsObject = firebaseContext?.eventsObject;

  const filteredEvents = React.useMemo(() => [...(events?.filter(e => (e.departmentId == currentDepartment)) || []), 
      // { name: 'Food', id: 'food', departmentId: currentDepartment } as Events
    ], [events, currentDepartment]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [departmentPaymentParticipants, setDepartmentPaymentParticipants] = React.useState<Record<string, EventUserPayments>>({});

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statusFilter, setStatusFilter] = React.useState<string>("All");

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => columns.filter((column) => Array.from(visibleColumns).includes(column.uid)), [visibleColumns]);

  React.useEffect(() => {
    if (filteredEvents == null) return;
    setDepartmentPaymentParticipants({})
    setSelectedEvent(filteredEvents[0].id)
  }, [filteredEvents, currentDepartment, setSelectedEvent])
  
  const filteredItems = React.useCallback(() => {
    let filteredUsers = [...Object.values(departmentPaymentParticipants)];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user?.user?.name?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        user?.user?.emailId?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        user?.user?.college?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        user?.user?.phoneNo?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        user?.user?.enrollNo?.toLowerCase()?.includes(filterValue.toLowerCase())
      );
    }
    filteredUsers = filteredUsers.filter((user) => (user?.mitilence?.[currentDepartment || '']?.paymentStatus || false));
    if (statusFilter != "All") {
      filteredUsers = filteredUsers.filter((user) => (user?.events?.[selectedEvent || '']?.checkedInStatus || false) == (statusFilter == 'Checked In'));
    }
    return filteredUsers;
  }, [departmentPaymentParticipants, filterValue, currentDepartment, statusFilter, selectedEvent]);

  const pages = Math.ceil(filteredItems().length / rowsPerPage);

  const items = React.useMemo(() => filteredItems().slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage), [filteredItems, page, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    const sorted = [...items];
    sorted.sort((a: EventUserPayments, b: EventUserPayments) => {
      const first = new Date(departmentPaymentParticipants[a.id]?.mitilence?.[currentDepartment || '']?.registeredTime);
      const second = new Date(departmentPaymentParticipants[b.id]?.mitilence?.[currentDepartment || '']?.registeredTime);
      return first > second ? -1 : 0;
    });
    return sorted;
  }, [items, departmentPaymentParticipants, currentDepartment]);

  const renderCheckedIn = React.useCallback((user: EventUserPayments) => {
    return (
      <Popover placement="top" showArrow>
        <PopoverTrigger>
          <Chip className="capitalize font-medium cursor-pointer" color={statusColorMap[(user?.events?.[selectedEvent || '']?.checkedInStatus) ? "paid" : "not_paid"]} size="lg" variant="flat">
            {(user?.events?.[selectedEvent || '']?.checkedInStatus) ? '' : 'Not'} Checked In
          </Chip>
        </PopoverTrigger>
        {(user?.events?.[selectedEvent || '']?.checkedInStatus) &&
          <PopoverContent>
            <div
              className="flex flex-col items-center px-2 py-1 text-base font-medium gap-1"
            >
              <span>
                {parseDateTimeShort(user?.events?.[selectedEvent || ''].checkedInTime)}
              </span>
              <span>
                <b className="text-purpleAccent font-medium">
                  {user?.mitilence?.[currentDepartment || ''].participantType}
                </b> Participant
              </span>
              <span>
                Checked In by <b className="text-purpleAccent font-medium">
                  {user?.events?.[selectedEvent || ''].checkedInByName}
                </b>
              </span>
            </div>
          </PopoverContent>
        }
      </Popover>
    );
  }, [selectedEvent, currentDepartment]);

  type RenderCellProps = {
    paymentUser: EventUserPayments;
    columnKey: React.Key;
  };
  
  const RenderCell: React.FC<RenderCellProps> = React.useCallback(({ paymentUser, columnKey }) => {
    const cellValue = paymentUser?.user?.[columnKey as keyof EventUser];
  
    switch (columnKey) {
      case "name":
        return (
          <User
            name={cellValue}
            description={paymentUser?.user?.emailId}
            avatarProps={{ radius: "lg", src: paymentUser?.user?.imageUrl, fallback: DefaultMemberImg, size: "md" }}
            classNames={{
              name: "text-lg font-medium",
              description: "text-base font-normal",
            }}
          >
            {paymentUser?.user?.emailId}
          </User>
        );
      case "createdTime":
        return (
          <div className="flex flex-col">
            <p className="text-black text-bold text-base capitalize">
              {parseDateTimeShort(paymentUser?.user?.createdTime)}
            </p>
          </div>
        );
      case "enrollNo":
        return (
          <div className="flex flex-col min-w-[5em]" title={paymentUser?.user?.enrollNo}>
            <p className="text-black text-bold text-base capitalize truncate">
              {paymentUser?.user?.enrollNo}
            </p>
          </div>
        );
      case "college":
        return (
          <div className="flex flex-col max-w-[8em]" title={paymentUser?.user?.college}>
            <p className="text-black text-bold text-base capitalize truncate">
              {paymentUser?.user?.college}
            </p>
          </div>
        );
      case "updatedTime":
        return (
          <div className="flex flex-col">
            <p className="text-black text-bold text-base capitalize">
              {(paymentUser?.user?.updatedTime == null) ? '' : parseDateTimeShort(paymentUser?.user?.updatedTime || '')}
            </p>
          </div>
        );
      case "registerTime":
        return (
          <div className="flex flex-col">
            <p className="text-black text-bold text-base capitalize truncate">
              {parseDateTimeShort(paymentUser?.mitilence?.[currentDepartment || '']?.registeredTime)}
            </p>
          </div>
        );
      case "checkedIn":
        return renderCheckedIn(paymentUser);  // Assuming `renderCheckedIn` is still used here
      case "payment":
        return (
          <Popover placement="top" showArrow>
            <PopoverTrigger>
              <Chip className="capitalize font-medium cursor-pointer" color={statusColorMap[(paymentUser?.mitilence?.[currentDepartment || ''].paymentStatus) ? "paid" : "not_paid"]} size="lg" variant="flat">
                {(paymentUser?.mitilence?.[currentDepartment || ''].paymentStatus) ? '' : 'Not'} Paid
              </Chip>
            </PopoverTrigger>
            {(paymentUser?.mitilence?.[currentDepartment || '']?.paymentStatus) && (
              <PopoverContent>
                <div className="flex flex-col items-center px-2 py-1 text-base font-medium gap-1">
                  <span>
                    Paid for <b className="text-purpleAccent">{paymentUser?.mitilence?.[currentDepartment || ''].departmentId?.toUpperCase()}</b> department event
                  </span>
                  <span>{parseDateTimeShort(paymentUser?.mitilence?.[currentDepartment || ''].paymentTime)}</span>
                  <span>
                    <b className="text-purpleAccent font-medium">
                      {paymentUser?.mitilence?.[currentDepartment || ''].participantType}
                    </b> Participant
                  </span>
                  <span>
                    Verified by <b className="text-purpleAccent font-medium">
                      {paymentUser?.mitilence?.[currentDepartment || ''].paymentVerifiedByName}
                    </b>
                  </span>
                </div>
              </PopoverContent>
            )}
          </Popover>
        );
      default:
        return <span className="text-black">{cellValue}</span>;
    }
  }, [currentDepartment, renderCheckedIn]);
  

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useCallback(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-3 w-full">
        <div
            className="flex flex-col items-center gap-2 w-full md:max-w-[44%]"
          >
            <Input
              isClearable
              size="lg"
              variant="bordered"
              className="w-full"
              placeholder="Search by name or email..."
              startContent={<SearchIcon />}
              classNames={{
                inputWrapper: 'bg-gray-100'
              }}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <form
              onSubmit={(e) => {e.preventDefault(); if ((setCheckInModal != null) && (selectedEvent != null)) { setCheckInModal(true) }}}
              className="flex flex-col lg:flex-row gap-2 w-full"
            >
              <Select
                size="sm"
                isRequired
                variant="bordered"
                className="w-full"
                label="Select Event"
                placeholder="Select an Event"
                selectedKeys={[String(selectedEvent)]}
                onSelectionChange={(e) => {if (e.currentKey == null) return; setDepartmentPaymentParticipants((prev) => ({...prev})); setSelectedEvent(String(e.currentKey)) }}
              >
                {filteredEvents.map((event) => (
                  <SelectItem key={String(event.id)}>{event.name}</SelectItem>
                ))}
              </Select>
              {children}
            </form>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  startContent={
                    <div
                      className="flex flex-col items-start"
                    >
                      <span>
                        Status
                      </span>
                      <span
                        className="text-[14px] text-black/80 mt-[-8px]"
                      >
                        {statusFilter}
                      </span>
                    </div>
                  }
                  endContent={<ChevronDownIcon className="text-base" />}
                  className="border-blue-500 text-blue-500 font-medium text-base"
                />
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                selectionMode="single"
                selectedKeys={[statusFilter]}
                onSelectionChange={(e) => setStatusFilter(String(e.currentKey))}
              >
                {['All', 'Checked In', 'Not Checked In'].map((status) => (
                  <DropdownItem key={status} className="capitalize">
                    {status}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button endContent={<ChevronDownIcon className="text-base" />} variant="bordered" className="border-blue-500 text-blue-500 font-medium text-base">
                  Filter
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              variant="solid"
              onPress={() => generateExcelDatas()}
              endContent={<Download size={20} className="text-base" />}
              className="bg-blue-500 text-white font-medium text-base"
            >
              Export
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-black text-base font-medium">Total {Object.keys(departmentPaymentParticipants)?.length} users</span>
          <label className="flex items-center text-black text-base">
            Rows per page:
            <select
              className="bg-transparent outline-none text-black text-base"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [selectedEvent, filteredEvents, filterValue, onClear, onSearchChange, setCheckInModal, children, statusFilter, visibleColumns, departmentPaymentParticipants, onRowsPerPageChange])

  const bottomContent = React.useCallback(() => {
    return (
      <div className="py-3 px-4 flex justify-center items-center">
        <Pagination
          isCompact
          size="lg"
          showControls
          showShadow
          page={page}
          total={pages || 1}
          onChange={setPage}
          classNames={{
            cursor: "bg-purpleAccent text-white"
          }}
        />
        {/* <span className="text-base text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}
      </div>
    );
  }, [page, pages])
  
  const generateExcelDatas = React.useCallback(async () => {  
    if (Object.keys(departmentPaymentParticipants).length === 0) {
      console.warn("No user data available to export.");
      return;
    }
  
    const workbook = new ExcelJS.Workbook();
    let eventSheetData: any[] = [];
  
    Object.entries(departmentPaymentParticipants).forEach(([userId, paymentData]) => {
      const user = departmentPaymentParticipants[userId]?.user;
      if (!user) return;
      
      Object.values(paymentData.events).forEach((event) => {
        if (event.eventId !== selectedEvent) return; // 🔹 Filter by selected event ID
        const eventName = eventsObject?.[event.eventId]?.name || event.eventId;
        
        if (event?.checkedInStatus) {
          eventSheetData.push({
            Name: user?.name,
            "Event Name": eventName,
            "Participant Type": departmentPaymentParticipants[userId]?.mitilence?.[currentDepartment || '']?.participantType,
            "Checked In Status": event?.checkedInStatus ? "Yes" : "No",
            "Checked In By": event?.checkedInByName || "N/A",
            "Checked In Time": event?.checkedInTime ? parseDateTimeShort(event.checkedInTime) : "N/A",
            "User ID": user?.id,
            "Checked In By Id": event?.checkedInBy || "N/A",
          });
        }
      });
    });
  
    if (eventSheetData.length === 0) {
      console.warn("No data found for the selected event.");
      return;
    }
  
    // 🔹 Create a single sheet for the selected event
    const sheetName =
      eventSheetData[0]["Event Name"].length > 31
        ? eventSheetData[0]["Event Name"].substring(0, 28) + "..."
        : eventSheetData[0]["Event Name"];
  
    const eventSheet = workbook.addWorksheet(sheetName);
  
    // 🔹 Define event sheet headers explicitly
    const eventHeaders = [
      "Name",
      "Event Name",
      "Participant Type",
      "Checked In Status",
      "Checked In By",
      "Checked In Time",
      "User ID",
      "Checked In By Id",
    ];
  
    eventSheet.columns = eventHeaders.map((header) => ({
      header,
      key: header,
      width: 25,
    }));
  
    eventSheet.addRows(eventSheetData);
  
    // Apply Bold Styling to Headers
    eventSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
  
    // Generate File Name
    const fileName = `${currentDepartment?.toUpperCase()}_${eventsObject?.[selectedEvent || '']?.name}_mitilence_${new Date()
      .toISOString()
      .replace(/[-T:]/g, "")
      .split(".")[0]}.xlsx`;
  
    // Write & Download File
    const buffer = await workbook.xlsx.writeBuffer();
    downloadBlob(new Blob([buffer]), fileName);
  }, [departmentPaymentParticipants, selectedEvent, eventsObject, currentDepartment]);
      
  const listenToPayments = React.useCallback((callback: (data: Record<string, EventUserPayments>) => void) => {
    if (firestoreDB == null) return () => {};
    const paymentsRef = collection(firestoreDB, "payments");
    const q = query(paymentsRef, where(`mitilence.${currentDepartment}.departmentId`, "==", currentDepartment));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const payments = querySnapshot.docs.reduce((obj, doc) => ({...obj, [doc.id]: parsePayments(doc.id, doc.data())}), {});
      callback(payments);
    });
    return unsubscribe;
  }, [currentDepartment, firestoreDB]);

  React.useEffect(() => {
    if (currentDepartment == null) return;
    setPage(1)
    const unsubscribePayments = listenToPayments(setDepartmentPaymentParticipants)
    return () => unsubscribePayments();
  }, [currentDepartment, listenToPayments]);

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent()}
      selectedKeys={selectedKeys}
      // selectionMode="multiple"
      topContent={topContent()}
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={headerColumns} className="text-2xl">
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"}>
        {sortedItems.map(item => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell> <RenderCell paymentUser={item} columnKey={columnKey} /></TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}