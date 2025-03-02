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
import { ChevronDownIcon, Download, SearchIcon } from "lucide-react";
import { parseDateTimeShort } from "@/utils/parseDate";
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import { useFirebase } from "@/contexts/firebase";
import parseEventUser from "@/parsers/user";
import parsePayments from "@/parsers/payments";
import { DefaultMemberImg } from "@/variables";
import downloadBlob from "@/utils/downloadBlob";
import { PopUserProps } from "../../app/admin/page";

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
  setPopupUser: (param: PopUserProps) => void;
  selectedEvent: string | null;
  setSelectedEvent: (param: string) => void;
  checkInCallback?: (userId: string) => void;
  setCheckInModal?: (value: boolean) => void;
  children?: React.ReactNode
}

export default function EventParticipants({ setPopupUser, children, selectedEvent, setSelectedEvent, setCheckInModal, checkInCallback }: EventProps) {
  const firebaseContext = useFirebase();
  const events = firebaseContext?.events;
  const firestoreDB = firebaseContext?.firestoreDB;
  const eventsObject = firebaseContext?.eventsObject;
  const fireCustomClaims = firebaseContext?.fireCustomClaims;

  const filteredEvents = React.useMemo(() => [...(events?.filter(e => (e.departmentId == fireCustomClaims?.departmentId)) || []), { name: 'Food', id: 'food', departmentId: fireCustomClaims?.departmentId } as Events], [events, fireCustomClaims]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [departmentParticipants, setDepartmentParticipants] = React.useState<Record<string, EventUser>>({});
  const [departmentPaymentParticipants, setDepartmentPaymentParticipants] = React.useState<Record<string, EventUserPayments>>({});

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statusFilter, setStatusFilter] = React.useState<string>("All");

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns.filter((column) => Array.from(visibleColumns).includes(column.uid));

  React.useEffect(() => {
    if (events == null) return;
    setSelectedEvent(events[0].id)
  }, [events])
  
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
    filteredUsers = filteredUsers.filter((user) => (departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || '']?.paymentStatus || false));
    if (statusFilter != "All") {
      filteredUsers = filteredUsers.filter((user) => (departmentPaymentParticipants[user.id]?.events?.[selectedEvent || '']?.checkedInStatus || false) == (statusFilter == 'Checked In'));
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
    const first = new Date(departmentPaymentParticipants[a.id]?.mitilence?.[fireCustomClaims?.departmentId || '']?.registeredTime);
    const second = new Date(departmentPaymentParticipants[b.id]?.mitilence?.[fireCustomClaims?.departmentId || '']?.registeredTime);
    return first > second ? -1 : 0;
  });

  const renderCell = React.useCallback((user: EventUser, columnKey: React.Key) => {
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
            <p className="text-bold text-base capitalize">{parseDateTimeShort(departmentParticipants[user.id]?.createdTime)}</p>
          </div>
        );
      case "enrollNo":
        return (
          <div className="flex flex-col min-w-[5em]" title={departmentParticipants[user.id]?.enrollNo}>
            <p className="text-bold text-base capitalize truncate">{departmentParticipants[user.id]?.enrollNo}</p>
          </div>
        );
      case "college":
        return (
          <div className="flex flex-col max-w-[8em]" title={departmentParticipants[user.id]?.college}>
            <p className="text-bold text-base capitalize truncate">{departmentParticipants[user.id]?.college}</p>
          </div>
        );
      case "updatedTime":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-base capitalize">{(departmentParticipants[user.id]?.updatedTime == null) ? '' : parseDateTimeShort(departmentParticipants[user.id]?.updatedTime || '')}</p>
          </div>
        );
      case "registerTime":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-base capitalize truncate">{parseDateTimeShort(departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || '']?.registeredTime)}</p>
          </div>
        );
      case "checkedIn":
        return (
          <Popover placement="top" showArrow>
            <PopoverTrigger>
              <Chip className="capitalize font-medium cursor-pointer" color={statusColorMap[(departmentPaymentParticipants[user.id]?.events?.[selectedEvent || '']?.checkedInStatus) ? "paid" : "not_paid"]} size="lg" variant="flat">
                {(departmentPaymentParticipants[user.id]?.events?.[selectedEvent || '']?.checkedInStatus) ? '' : 'Not'} Checked In
              </Chip>
            </PopoverTrigger>
            {(departmentPaymentParticipants[user.id]?.events?.[selectedEvent || '']?.checkedInStatus) &&
              <PopoverContent>
                <div
                  className="flex flex-col items-center px-2 py-1 text-base font-medium gap-1"
                >
                  <span>
                    {parseDateTimeShort(departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || ''].paymentTime)}
                  </span>
                  <span>
                    <b className="text-purpleAccent font-medium">
                      {departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || ''].participantType}
                    </b> Participant
                  </span>
                  <span>
                    Checked In by <b className="text-purpleAccent font-medium">
                      {departmentPaymentParticipants[user.id]?.events?.[selectedEvent || ''].checkedInByName}
                    </b>
                  </span>
                </div>
              </PopoverContent>
            }
          </Popover>
        );
      case "payment":
        return (
          <Popover placement="top" showArrow>
            <PopoverTrigger>
              <Chip className="capitalize font-medium cursor-pointer" color={statusColorMap[(departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || ''].paymentStatus) ? "paid" : "not_paid"]} size="lg" variant="flat">
                {(departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || ''].paymentStatus) ? '' : 'Not'} Paid
              </Chip>
            </PopoverTrigger>
            {(departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || '']?.paymentStatus) &&
              <PopoverContent>
                <div
                  className="flex flex-col items-center px-2 py-1 text-base font-medium gap-1"
                >
                  <span>
                    Paid for <b className="text-purpleAccent">{departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || ''].departmentId?.toUpperCase()}</b> department event
                  </span>
                  <span>
                    {parseDateTimeShort(departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || ''].paymentTime)}
                  </span>
                  <span>
                    <b className="text-purpleAccent font-medium">
                      {departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || ''].participantType}
                    </b> Participant
                  </span>
                  <span>
                    Verified by <b className="text-purpleAccent font-medium">
                      {departmentPaymentParticipants[user.id]?.mitilence?.[fireCustomClaims?.departmentId || ''].paymentVerifiedByName}
                    </b>
                  </span>
                </div>
              </PopoverContent>
            }
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
                {((checkInCallback != null) && (!(departmentPaymentParticipants[user.id].events[selectedEvent || '']?.checkedInStatus || false))) ?
                  <DropdownItem
                    key="checkIn"
                    onPress={() => checkInCallback(user.id)}
                  >
                    Check In
                  </DropdownItem>
                  :
                  <></>
                }
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, [selectedEvent, departmentParticipants, departmentPaymentParticipants]);

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
                <Button endContent={<ChevronDownIcon className="text-base" />} variant="bordered" className="border-blue-500 text-blue-500 font-medium text-base">
                  Status
                </Button>
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
  
  const generateExcelDatas = async () => {  
    if (Object.keys(departmentParticipants).length === 0) {
      console.warn("No user data available to export.");
      return;
    }
  
    const workbook = new ExcelJS.Workbook();
    let eventSheetData: any[] = [];
  
    Object.entries(departmentPaymentParticipants).forEach(([userId, paymentData]) => {
      const user = departmentParticipants[userId];
      if (!user) return;
      
      Object.values(paymentData.events).forEach((event) => {
        if (event.eventId !== selectedEvent) return; // 🔹 Filter by selected event ID
        const eventName = eventsObject?.[event.eventId].name || "Uncategorized";
        
        if (event?.checkedInStatus) {
          eventSheetData.push({
            Name: user?.name,
            "Event Name": eventName,
            "Participant Type": departmentPaymentParticipants[userId]?.mitilence?.[fireCustomClaims?.departmentId || '']?.participantType,
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
    const fileName = `${fireCustomClaims?.departmentId?.toUpperCase()}_${eventsObject?.[selectedEvent || '']?.name}_mitilence_${new Date()
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
    const q = query(paymentsRef, where(`mitilence.${fireCustomClaims?.departmentId}.departmentId`, "==", fireCustomClaims?.departmentId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const payments = querySnapshot.docs.reduce((obj, doc) => ({...obj, [doc.id]: parsePayments(doc.id, doc.data())}), {});
      callback(payments);
    });
    return unsubscribe;
  }

  React.useEffect(() => {
    if (fireCustomClaims?.departmentId == null) return;
    const unsubscribePayments = listenToPayments(setDepartmentPaymentParticipants)
    return () => unsubscribePayments();
  }, [fireCustomClaims?.departmentId]);

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