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
  PopoverContent
} from "@heroui/react";
import ExcelJS from "exceljs";
import parsePayments from "@/parsers/payments";
import { DefaultMemberImg } from "@/variables";
import downloadBlob from "@/utils/downloadBlob";
import { useFirebase } from "@/contexts/firebase";
import { parseDateTimeShort } from "@/utils/parseDate";
import { ChevronDownIcon, Download, SearchIcon } from "lucide-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "ENROLL NO", uid: "enrollNo" },
  { name: "PHONE", uid: "phoneNo" },
  { name: "COLLEGE", uid: "college" },
  { name: "GENDER", uid: "gender" },
  { name: "REGISTER TIME", uid: "registerTime" },
  { name: "PAYMENT", uid: "payment" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  paid: "success",
  not_paid: "warning",
};

const INITIAL_VISIBLE_COLUMNS = columns.map(c => c.uid);

export default function AllParticipants({ currentDepartment, setPopupUser }: { currentDepartment: string | null, setPopupUser: (param: EventUserPayments) => void }) {
  const firebaseContext = useFirebase();
  const firestoreDB = firebaseContext?.firestoreDB;
  const eventsObject = firebaseContext?.eventsObject;

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [departmentPaymentParticipants, setDepartmentPaymentParticipants] = React.useState<Record<string, EventUserPayments>>({});

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statusFilter, setStatusFilter] = React.useState<string>("Paid");

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns.filter((column) => Array.from(visibleColumns).includes(column.uid));

  const filteredItems = () => {
    let filteredUsers = [...Object.values(departmentPaymentParticipants)];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        departmentPaymentParticipants[user.id]?.user?.name?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        departmentPaymentParticipants[user.id]?.user?.emailId?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        departmentPaymentParticipants[user.id]?.user?.college?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        departmentPaymentParticipants[user.id]?.user?.phoneNo?.toLowerCase()?.includes(filterValue.toLowerCase()) ||
        departmentPaymentParticipants[user.id]?.user?.enrollNo?.toLowerCase()?.includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter != "All") {
      filteredUsers = filteredUsers.filter((user) => (departmentPaymentParticipants[user.id]?.mitilence?.[currentDepartment || '']?.paymentStatus || false) == (statusFilter == 'Paid'));
    }
    return filteredUsers;
  }

  const pages = Math.ceil(Object.keys(departmentPaymentParticipants)?.length / rowsPerPage);

  const items = () => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems().slice(start, end);
  }

  const sortedItems = [...items()];
  sortedItems.sort((a: EventUserPayments, b: EventUserPayments) => {
    const first = new Date(departmentPaymentParticipants[a.id]?.mitilence?.[currentDepartment || '']?.registeredTime);
    const second = new Date(departmentPaymentParticipants[b.id]?.mitilence?.[currentDepartment || '']?.registeredTime);
    return first > second ? -1 : 0;
  });

  const renderCell = (user: EventUserPayments, columnKey: React.Key) => {
    const cellValue = departmentPaymentParticipants[user.id]?.user?.[columnKey as keyof EventUser];
    switch (columnKey) {
      case "name":
        return (
          <User
            name={cellValue}
            description={departmentPaymentParticipants[user.id]?.user?.emailId}
            avatarProps={{radius: "lg", src: departmentPaymentParticipants[user.id]?.user?.imageUrl, fallback: DefaultMemberImg, size: "md"}}
            classNames={{
              name: "text-lg font-medium",
              description: "text-base font-normal"
            }}
          >
            {departmentPaymentParticipants[user.id]?.user?.emailId}
          </User>
        );
      case "college":
        return (
          <div className="flex flex-col max-w-[8em]" title={departmentPaymentParticipants[user.id]?.user?.college}>
            <p className="text-black text-bold text-base capitalize truncate">{departmentPaymentParticipants[user.id]?.user?.college}</p>
          </div>
        );
      case "enrollNo":
        return (
          <div className="flex flex-col min-w-[5em]" title={departmentPaymentParticipants[user.id]?.user?.enrollNo}>
            <p className="text-black text-bold text-base capitalize truncate">{departmentPaymentParticipants[user.id]?.user?.enrollNo}</p>
          </div>
        );
      case "registerTime":
        return (
          <div className="flex flex-col">
            <p className="text-black text-bold text-base capitalize truncate">{parseDateTimeShort(departmentPaymentParticipants[user.id]?.mitilence?.[currentDepartment || '']?.registeredTime)}</p>
          </div>
        );
      case "payment":
        return (
          <Popover placement="top" showArrow>
            <PopoverTrigger>
              <Chip className="capitalize font-medium cursor-pointer" color={statusColorMap[(departmentPaymentParticipants[user.id]?.mitilence?.[currentDepartment || ''].paymentStatus) ? "paid" : "not_paid"]} size="lg" variant="flat">
                {(departmentPaymentParticipants[user.id]?.mitilence?.[currentDepartment || ''].paymentStatus) ? '' : 'Not'} Paid
              </Chip>
            </PopoverTrigger>
            {(departmentPaymentParticipants[user.id]?.mitilence?.[currentDepartment || '']?.paymentStatus) &&
              <PopoverContent>
                <div
                  className="flex flex-col items-center px-2 py-1 text-base font-medium gap-1"
                >
                  <span>
                    Paid for <b className="text-purpleAccent">{departmentPaymentParticipants[user.id]?.mitilence?.[currentDepartment || ''].departmentId?.toUpperCase()}</b> department event
                  </span>
                  <span>
                    {parseDateTimeShort(departmentPaymentParticipants[user.id]?.mitilence?.[currentDepartment || '']?.paymentTime)}
                  </span>
                  <span>
                    <b className="text-purpleAccent font-medium">
                      {departmentPaymentParticipants[user.id]?.mitilence?.[currentDepartment || '']?.participantType}
                    </b> Participant
                  </span>
                  <span>
                    Verified by <b className="text-purpleAccent font-medium">
                      {departmentPaymentParticipants[user.id]?.mitilence?.[currentDepartment || '']?.paymentVerifiedByName}
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
                    setPopupUser(departmentPaymentParticipants[user.id])
                  }}
                >
                  View Profile
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return (
          <span
            className="text-black"
          >
            {cellValue}
          </span>
        );
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
        <div className="flex flex-col md:flex-row justify-between gap-3 w-full">
          <Input
            isClearable
            size="lg"
            variant="bordered"
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or email..."
            startContent={<SearchIcon />}
            classNames={{
              inputWrapper: 'bg-gray-100'
            }}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
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
                {['All', 'Paid', 'Not Paid'].map((status) => (
                  <DropdownItem key={status} className="capitalize">
                    {status}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  endContent={<ChevronDownIcon className="text-base" />}
                  className="border-blue-500 text-blue-500 font-medium text-base"
                >
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
    console.log(departmentPaymentParticipants, departmentPaymentParticipants?.user);
  
    if (Object.keys(departmentPaymentParticipants).length === 0) {
      console.warn("No user data available to export.");
      return;
    }
  
    const workbook = new ExcelJS.Workbook();
  
    // Create Users Sheet
    const userSheet = workbook.addWorksheet("Users");
  
    // Define User Sheet Headers
    const userHeaders = [
      "Name",
      "Enrollment No",
      "Email",
      "Phone",
      "College",
      "Participant Type",
      "Payment Verified By",
      "Payment Time",
      "Department",
      "Gender",
      "Grad Year",
      "Created Time",
      "Updated Time",
      "User ID",
      "Payment Verified By Id",
    ];
  
    userSheet.columns = userHeaders.map((header) => ({
      header,
      key: header,
      width: 20, // Adjust column width
    }));
  
    // Add User Data
    const userSheetData: any = [];
    
    Object.values(departmentPaymentParticipants).forEach((user) => {    
      const paymentInfo =
        departmentPaymentParticipants[user?.id]?.mitilence?.[
        currentDepartment || ""
      ] || {};

      if (paymentInfo.paymentStatus) {
        userSheetData.push({
          "Name": user?.user?.name,
          "Enrollment No": user?.user?.enrollNo,
          "Email": user?.user?.emailId,
          "Phone": user?.user?.phoneNo,
          "College": user?.user?.college,
          "Participant Type": paymentInfo?.participantType || "N/A",
          "Payment Verified By": paymentInfo?.paymentVerifiedByName || "N/A",
          "Registered Time": parseDateTimeShort(paymentInfo?.registeredTime),
          "Payment Time": paymentInfo?.paymentTime
            ? parseDateTimeShort(paymentInfo?.paymentTime)
            : "N/A",
          "Department": user?.user?.department,
          "Gender": user?.user?.gender,
          "Grad Year": user?.user?.gradYear,
          "Created Time": parseDateTimeShort(user?.user?.createdTime),
          "Updated Time": user?.user?.updatedTime
            ? parseDateTimeShort(user?.user?.updatedTime)
            : "N/A",
          "User ID": user?.user?.id,
          "Payment Verified By Id": paymentInfo?.paymentVerifiedBy || "N/A",
        });
      }
    });
  
    userSheet.addRows(userSheetData);
  
    // Apply Bold Styling to Headers
    userSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
  
    // 🔹 Group events by name
    const eventGroups: Record<string, any[]> = {};
  
    Object.entries(departmentPaymentParticipants).forEach(([userId, paymentData]) => {
      const user = departmentPaymentParticipants[userId]?.user;
      if (!user) return;
  
      Object.values(paymentData.events).forEach((event) => {
        const eventName = eventsObject?.[event.eventId]?.name || event.eventId;
  
        if (!eventGroups[eventName]) {
          eventGroups[eventName] = [];
        }
  
        if (event?.checkedInStatus) {
          eventGroups[eventName].push({
            "Name": user?.name,
            "Event Name": eventName,
            "Participant Type": departmentPaymentParticipants[userId]?.mitilence?.[currentDepartment || '']?.participantType,
            "Checked In Status": event?.checkedInStatus ? "Yes" : "No",
            "Checked In By": event?.checkedInByName || "N/A",
            "Checked In Time": event?.checkedInTime
              ? parseDateTimeShort(event.checkedInTime)
              : "N/A",
            "User ID": user?.id,
            "Checked In By Id": event?.checkedInBy || "N/A",
          });
        }
      });
    });
  
    // 🔹 Define Event Sheet Headers
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
  
    // 🔹 Create a separate sheet for each event
    Object.entries(eventGroups).forEach(([eventName, eventData]) => {
      const sheetName =
        eventName.length > 31 ? eventName.substring(0, 28) + "..." : eventName; // Excel limits sheet names to 31 chars
      const eventSheet = workbook.addWorksheet(sheetName);
  
      eventSheet.columns = eventHeaders.map((header) => ({
        header,
        key: header,
        width: 25,
      }));
  
      eventSheet.addRows(eventData);
  
      // Apply Bold Styling to Headers
      eventSheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
    });
  
    // Generate File Name
    const fileName = `${currentDepartment?.toUpperCase()}_mitilence_${new Date()
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
    const q = query(paymentsRef, where(`mitilence.${currentDepartment}.departmentId`, "==", currentDepartment));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const payments = querySnapshot.docs.reduce((obj, doc) => ({...obj, [doc.id]: parsePayments(doc.id, doc.data())}), {});
      callback(payments);
    });
    return unsubscribe;
  }

  React.useEffect(() => {
    if (currentDepartment == null) return;
    setDepartmentPaymentParticipants({})
    const unsubscribePayments = listenToPayments(setDepartmentPaymentParticipants)
    return () => unsubscribePayments();
  }, [currentDepartment]);
  
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
