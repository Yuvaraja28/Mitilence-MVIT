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
  SortDescriptor,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import ExcelJS from "exceljs";
import { ChevronDownIcon, Download, SearchIcon } from "lucide-react";
import { parseDateTimeShort } from "@/utils/parseDate";
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import { useFirebase } from "@/contexts/firebase";
import parseEventUser from "@/parsers/user";
import parsePayments from "@/parsers/payments";
import downloadBlob from "@/utils/downloadBlob";
import { CircularLoader } from "@/components/internal/Loaders";
import { DefaultMemberImg } from "@/variables";
import { PopUserProps } from "./page";

export const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "ENROLL NO", uid: "enrollNo", sortable: true },
  { name: "PHONE", uid: "phoneNo" },
  { name: "COLLEGE", uid: "college" },
  { name: "GENDER", uid: "gender", sortable: true },
  { name: "PAYMENT", uid: "payment" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  {name: "Amount Paid", uid: "paid"},
  {name: "Amount Not Paid", uid: "not_paid"},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  paid: "success",
  not_paid: "warning",
};

const INITIAL_VISIBLE_COLUMNS = columns.map(c => c.uid);

export default function EventParticipants({ setPopupUser }: { setPopupUser: (param: PopUserProps) => void }) {
  const firebaseContext = useFirebase();
  const events = firebaseContext?.events;
  const firestoreDB = firebaseContext?.firestoreDB;
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;
  const fireCustomClaims = firebaseContext?.fireCustomClaims;

  const filteredEvents = React.useMemo(() => (events?.filter(e => (e.departmentId == fireCustomClaims?.departmentId)) || []), [events, fireCustomClaims]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [departmentParticipants, setDepartmentParticipants] = React.useState<Record<string, EventUser>>({});
  const [departmentPaymentParticipants, setDepartmentPaymentParticipants] = React.useState<Record<string, EventUserPayments>>({});

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns.filter((column) => Array.from(visibleColumns).includes(column.uid));

  const filteredItems = () => {
    let filteredUsers = [...Object.values(departmentParticipants)];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        departmentParticipants[user.id]?.name?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        departmentParticipants[user.id]?.emailId?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        departmentParticipants[user.id]?.college?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        departmentParticipants[user.id]?.phoneNo?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        departmentParticipants[user.id]?.enrollNo?.toLowerCase()?.includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(departmentParticipants[user.id].gender),
      );
    }

    return filteredUsers;
  }

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = () => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems().slice(start, end);
  }

  const sortedItems = [...items()];
  sortedItems.sort((a: EventUser, b: EventUser) => {
    const first = departmentParticipants[a.id]?.[sortDescriptor.column as keyof EventUser] as number;
    const second = departmentParticipants[b.id]?.[sortDescriptor.column as keyof EventUser] as number;
    const cmp = first < second ? -1 : first > second ? 1 : 0;

    return sortDescriptor.direction === "descending" ? -cmp : cmp;
  });

  const renderCell = (user: EventUser, columnKey: React.Key) => {
    const cellValue = departmentParticipants[user.id]?.[columnKey as keyof EventUser];
    switch (columnKey) {
      case "name":
        return (
          <User
            name={cellValue}
            description={departmentParticipants[user.id]?.emailId}
            avatarProps={{radius: "lg", src: departmentParticipants[user.id]?.imageUrl, fallback: DefaultMemberImg, size: "md"}}
            classNames={{
              name: "text-lg font-medium",
              description: "text-base font-normal"
            }}
          >
            {departmentParticipants[user.id]?.emailId}
          </User>
        );
      case "createdTime":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-base capitalize">{parseDateTimeShort(departmentParticipants[user.id].createdTime)}</p>
          </div>
        );
      case "enrollNo":
        return (
          <div className="flex flex-col max-w-[3em]" title={departmentParticipants[user.id].enrollNo}>
            <p className="text-bold text-base capitalize truncate">{departmentParticipants[user.id].enrollNo}</p>
          </div>
        );
      case "college":
        return (
          <div className="flex flex-col max-w-[8em]" title={departmentParticipants[user.id].college}>
            <p className="text-bold text-base capitalize truncate">{departmentParticipants[user.id].college}</p>
          </div>
        );
      case "updatedTime":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-base capitalize">{(departmentParticipants[user.id]?.updatedTime == null) ? '' : parseDateTimeShort(departmentParticipants[user.id]?.updatedTime || '')}</p>
          </div>
        );
      case "payment":
        return (
          <Popover placement="top" showArrow>
            <PopoverTrigger>
              <Chip className="capitalize font-medium cursor-pointer" color={statusColorMap["paid"]} size="lg" variant="flat">
                Paid
              </Chip>
            </PopoverTrigger>
            <PopoverContent>
              <div
                className="flex flex-col items-center px-2 py-1 text-base font-medium gap-1"
              >
                <span>
                  Paid for <b className="text-purpleAccent">{departmentPaymentParticipants[user.id].mitilence?.[fireCustomClaims?.departmentId || ''].departmentId?.toUpperCase()}</b> department event
                </span>
                <span>
                  {parseDateTimeShort(departmentPaymentParticipants[user.id].mitilence?.[fireCustomClaims?.departmentId || ''].paymentTime)}
                </span>
                <span>
                  <b className="text-purpleAccent font-medium">
                    {departmentPaymentParticipants[user.id].mitilence?.[fireCustomClaims?.departmentId || ''].participantType}
                  </b> Participant
                </span>
                <span>
                  Verified by <b className="text-purpleAccent font-medium">
                    {departmentPaymentParticipants[user.id].mitilence?.[fireCustomClaims?.departmentId || ''].paymentVerifiedByName}
                  </b>
                </span>
              </div>
            </PopoverContent>
          </Popover>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="profile"
                  onPress={() => {
                    setPopupUser({
                      user: user,
                      payment: departmentPaymentParticipants[user.id]
                    })
                  }}
                >
                  View Profile
                </DropdownItem>
                <DropdownItem key="checkin">Check In</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }

  const onSearchChange = (value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }

  const onClear = () => {
    setFilterValue("");
    setPage(1);
  }

  const topContent = () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div
            className="flex flex-row items-center gap-2 w-full sm:max-w-[44%]"
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
            <Autocomplete
              size="sm"
              variant="bordered"
              className="max-w-2xl"
              label="Select Event"
              placeholder="Select an Event"
              onSelectionChange={(e) => {if (e == selectedEvent) return; setDepartmentParticipants(() => ({})); setSelectedEvent(String(e))}}
            >
              {filteredEvents.map((event) => (
                <AutocompleteItem key={String(event.id)}>{event.name}</AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-base" />} variant="bordered" className="border-blue-500 text-blue-500 font-medium text-base">
                  Payment
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
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
  }

  const bottomContent = () => {
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
  }

  const classNames = {
    td: [
      // changing the rows border radius
      // first
      "group-data-[first=true]/tr:first:before:rounded-none",
      "group-data-[first=true]/tr:last:before:rounded-none",
      // middle
      "group-data-[middle=true]/tr:before:rounded-none",
      // last
      "group-data-[last=true]/tr:first:before:rounded-none",
      "group-data-[last=true]/tr:last:before:rounded-none",
    ],
  }

  const generateExcelDatas = async () => {  
    if (Object.keys(departmentParticipants).length === 0) {
      console.warn("No user data available to export.");
      return;
    }
  
    const workbook = new ExcelJS.Workbook();
    
    let eventSheetData: any = [];
  
    Object.entries(departmentPaymentParticipants).forEach(([userId, paymentData]) => {
      const user = departmentParticipants[userId];
      if (!user) return;
  
      Object.values(paymentData.events).forEach((event) => {
        if (event.eventId !== selectedEvent) return; // 🔹 Filter by selected event ID
        
        eventSheetData.push({
          Name: user?.name,
          "Event Name": event.eventName,
          "Registered Time": parseDateTimeShort(event.registeredTime),
          "Checked In Status": event?.checkedInStatus ? "Yes" : "No",
          "Checked In By": event?.checkedInByName || "N/A",
          "Checked In Time": event?.checkedInTime ? parseDateTimeShort(event.checkedInTime) : "N/A",
          "User ID": user?.id,
          "Checked In By Id": event?.checkedInBy || "N/A",
        });
      });
    });
  
    if (eventSheetData.length === 0) {
      console.warn("No data found for the selected event.");
      return;
    }
  
    // 🔹 Create a single sheet for the selected event
    const sheetName = eventSheetData[0]["Event Name"].length > 31 
      ? eventSheetData[0]["Event Name"].substring(0, 28) + "..." 
      : eventSheetData[0]["Event Name"];
  
    const eventSheet = workbook.addWorksheet(sheetName);
  
    eventSheet.columns = Object.keys(eventSheetData[0]).map((key) => ({
      header: key,
      key,
      width: 25,
    }));
  
    eventSheet.addRows(eventSheetData);
  
    // Apply Bold Styling to Headers
    eventSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
  
    // Generate File Name
    const fileName = `Event_${selectedEvent}_${new Date()
      .toISOString()
      .replace(/[-T:]/g, "")
      .split(".")[0]}.xlsx`;
  
    // Write & Download File
    const buffer = await workbook.xlsx.writeBuffer();
    downloadBlob(new Blob([buffer]), fileName);
  };
      
  function listenToPayments(callback: (data: Record<string, EventUserPayments>) => void) {
    if (firestoreDB == null) return () => {};
    const paymentsRef = collection(firestoreDB, "payments");
    const q = query(paymentsRef, where(`events.${selectedEvent}.departmentId`, "==", fireCustomClaims?.departmentId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const payments = querySnapshot.docs.reduce((obj, doc) => ({...obj, [doc.id]: parsePayments(doc.id, doc.data())}), {});
      console.log(payments)
      callback(payments);
    });
    return unsubscribe;
  }

  React.useEffect(() => {
    if ((fireCustomClaims?.departmentId == null) || (selectedEvent == null)) return;
    const unsubscribePayments = listenToPayments(setDepartmentPaymentParticipants)
    return () => unsubscribePayments();
  }, [fireCustomClaims?.departmentId, selectedEvent]);

  function listenToUsersByIds(
    userIds: string[], 
    callback: (users: Record<string, any>, removedUserIds: string[]) => void
  ) {
    if (userIds.length === 0 || firestoreDB == null) return () => {}; 
  
    // Firestore allows a max of 10 elements in "in" query, so split into chunks
    const chunks: string[][] = [];
    for (let i = 0; i < userIds.length; i += 10) {
      chunks.push(userIds.slice(i, i + 10));
    }
  
    let unsubscribers: (() => void)[] = [];
    let knownUserIds = new Set(userIds); // Track known user IDs
  
    chunks.forEach((chunk) => {
      const usersRef = collection(firestoreDB, "users");
      const q = query(usersRef, where(documentId(), "in", chunk));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const usersObject: Record<string, any> = {};
        const fetchedUserIds = new Set<string>(); // Track users in snapshot
  
        querySnapshot.docs.forEach(doc => {
          usersObject[doc.id] = parseEventUser(doc.id, doc.data());
          fetchedUserIds.add(doc.id);
        });
  
        // Find removed users (present in knownUserIds but not in fetchedUserIds)
        const removedUserIds = [...knownUserIds].filter(id => !fetchedUserIds.has(id));
  
        // Update known user list
        knownUserIds = fetchedUserIds;
  
        callback(usersObject, removedUserIds);
      });
  
      unsubscribers.push(unsubscribe);
    });
  
    return () => unsubscribers.forEach(unsub => unsub());
  }
  
  React.useEffect(() => {
    if (Object.keys(departmentPaymentParticipants).length === 0) return;
  
    const unsubscribeListenToUsers = listenToUsersByIds(
      Object.keys(departmentPaymentParticipants), 
      (updatedUsers, removedUserIds) => {
        console.log("Updated Users:", updatedUsers);
        console.log("Removed Users:", removedUserIds);
  
        setDepartmentParticipants((prevUsers) => {
          // Remove users who have been deleted
          const filteredUsers = { ...prevUsers };
          removedUserIds.forEach(userId => delete filteredUsers[userId]);
  
          return {
            ...filteredUsers,
            ...updatedUsers, // Merge updated users
          };
        });
      }
    );
  
    return () => unsubscribeListenToUsers();
  }, [firestoreDB, departmentPaymentParticipants]);
    
  if ((fireUserDoc == null) || (fireUserData == null)) {
    return (
      <div
        className="flex flex-col items-center gap-6 w-full px-6 lg:px-16 pt-28 lg:pt-22 py-8 min-h-[100vh] text-white"
      >
        <CircularLoader />
      </div>
    )
  }

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent()}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent()}
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      classNames={classNames}
    >
      <TableHeader columns={headerColumns} className="text-2xl">
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
