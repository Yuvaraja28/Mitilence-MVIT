'use client';
import React from "react";
import Link from "next/link";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { DefaultMemberImg } from "@/variables";
import { useFirebase } from "@/contexts/firebase";
import UserRegistration from "@/components/internal/userRegistration";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { ArrowUpRight, BadgeCheck, Building2, CalendarDays, ChevronDown, CircleDashed, Clock8, FileText, IndianRupee, Navigation, UserRoundPen } from "lucide-react";

export default function Profile() {
  const firebaseContext = useFirebase();
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;
  const eventsObject = firebaseContext?.eventsObject || {};
  const fireCustomClaims = firebaseContext?.fireCustomClaims;
  const eventPayments: EventUserPayments = firebaseContext?.eventPayments || {} as EventUserPayments;

  const [userUpdate, setUserUpdate] = React.useState(false)
  const [currentEvent, setCurrentEvent] = React.useState<string | null>(null)

  const paidEvents = React.useMemo(() => Object.entries(eventPayments?.events || {}), [eventPayments?.events])
  const paidDepartments = React.useMemo(() => Object.entries(eventPayments?.mitilence || {}), [eventPayments?.mitilence])

  const Fields = [
    { name: "Phone No", param: "phoneNo", type: "tel", value: fireUserData?.phoneNumber },
    { name: "Enroll No", param: "enrollNo", type: "text" },
    { name: "College", param: "college", type: "text" },
    { name: "Department", param: "department", type: "text" },
    { name: "Graduation Year", param: "gradYear", type: "number" },
    { name: "Gender", param: "gender", type: "select" },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 w-full pt-28 lg:pt-22 py-8 min-h-[100vh]"
    >
      <div
        className="flex flex-col gap-4 w-[90%] lg:w-[42em]"
      >
        <div
          className="flex flex-col gap-4 bg-white rounded-2xl p-8"
        >
          <div
            className="flex flex-row gap-2 self-end"
          >
            {(fireCustomClaims?.role != null) &&
              <Link
                href={`/${fireCustomClaims?.role}`}
                className="flex flex-row gap-2 text-md font-medium bg-cyan-600 text-white px-5 py-2 rounded-[10px] capitalize"
              >
                {fireCustomClaims.role}
              </Link>
            }
            <Button
              color="primary"
              onPress={() => setUserUpdate(true)}
              startContent={<UserRoundPen size={20} />}
              className="flex flex-row gap-2 text-md font-medium bg-blue-500 text-white px-4 py-1.5 rounded-[10px]"
            >
              Update
            </Button>
          </div>
          <div
            className="flex md:flex-row gap-2.5 items-center justify-between flex-col-reverse"
          >
            <div
              className="flex flex-col items-center md:items-start h-full"
            >
              <span
                className="text-4xl font-medium text-center md:text-start"
              >
                {fireUserDoc?.name}
              </span>
              <span
                className="text-[18px] text-center md:text-start"
              >
                {fireUserDoc?.emailId}
              </span>
            </div>
            <Image
              width={100}
              height={100}
              src={fireUserDoc?.imageUrl || DefaultMemberImg}
              classNames={{
                wrapper: 'bg-contain bg-no-repeat'
              }}
              fallbackSrc={DefaultMemberImg}
              className="object-cover bg-contain"
            />
          </div>
          {(paidDepartments.length > 0) &&
            <div
              className="flex flex-col gap-2 px-1 mt-[-5px] lg:mt-[-15px]"
            >
              <span
                className="text-xl font-semibold uppercase"
              >
                Paid Departments
              </span>
              <div
                className="flex flex-row flex-wrap gap-2"
              >
                {paidDepartments.map(mitilence =>
                  <Popover
                    showArrow
                    placement="top"
                    key={mitilence[0]}
                  >
                    <PopoverTrigger>
                      <Button
                        size="sm"
                        className="text-lg bg-purpleAccent text-white font-medium w-fit !px-1 !py-2 uppercase"
                      >
                        {mitilence[0]}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="text-md font-medium px-4 py-2">
                      You have paid for {mitilence[0].toUpperCase()} department events
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          }
          <div
            className="grid md:grid-cols-2 gap-4"
          >
            {Fields.map(field =>
              <Input
                key={field.param}
                label={field.name}
                disabled={true}
                labelPlacement={"outside"}
                placeholder={field.name}
                size="lg"
                className="font-medium border-2 border-gray-300 rounded-2xl"
                value={(typeof fireUserDoc == 'object') ? String(fireUserDoc?.[field.param as keyof EventUser] || '') : ''}
              />
            )}
          </div>
        </div>
        <span
          className="flex flex-row justify-between items-center gap-4 bg-white rounded-2xl px-8 py-4 text-xl font-medium"
        >
          Registered Events ( {paidEvents.length} )
          {(paidEvents.length > 0) ?
            <ChevronDown size={30} />
          :
            <Link
              href={'/events'}
              className="flex flex-row gap-1 items-center justify-center px-5 py-1.5 bg-purpleAccent rounded-xl text-white shadow-sm shadow-purple-400 drop-shadow-sm hover:-translate-y-0.5 transition-transform"
            >
              Register Now
              <ArrowUpRight />
            </Link>
          }
        </span>
        {(paidEvents.length > 0) &&
          <div
            className="flex flex-col sm:grid grid-cols-2 gap-4 bg-white text-white rounded-2xl px-6 py-8"
          >
            {(Object.entries(eventPayments?.events || {})).map(registerEve => 
              <div
                key={registerEve[0]}
                className="flex flex-col gap-3 bg-boxBlack p-4 rounded-3xl"
              >
                <div
                  className="flex flex-row justify-between"
                >
                  <div
                    className="flex flex-col px-1 gap-0.5"
                  >
                    <span
                      className="text-xl font-medium"
                    >
                      {eventsObject[registerEve[0]].name}
                    </span>
                    <span
                      className="text-md font-normal uppercase"
                    >
                      {eventsObject[registerEve[0]].departmentId}
                    </span>
                    <Popover placement="top" showArrow>
                      <PopoverTrigger>
                        <Button
                          size="sm"
                          color={(registerEve[1]?.checkedInStatus) ? "success" : "warning"}
                          startContent={(registerEve[1]?.checkedInStatus) ? <BadgeCheck /> : <CircleDashed />}
                          className="text-sm font-medium w-fit !px-4 !py-2 capitalize"
                        >
                          {(registerEve[1]?.checkedInStatus) ? 'Checked In' : 'Not Checked In'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="text-md font-medium px-4 py-2">
                        You have {(registerEve[1]?.checkedInStatus) ? 'checked' : 'not checked'} in for the Event
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button
                    isIconOnly
                    onPress={() => setCurrentEvent(registerEve[0])}
                    className="bg-white/5 text-white border border-white/20"
                  >
                    <FileText size={20} />
                  </Button>
                </div>
                <Image
                  src={eventsObject[registerEve[0]].logoUrl}
                />
              </div>
            )}
          </div>
        }
      </div>
      {(currentEvent != null) &&
        <Modal
          size={'lg'}
          placement="center"
          scrollBehavior="inside"
          isOpen={currentEvent != null}
          onClose={() => setCurrentEvent(null)}
        >
          <ModalContent>
            <ModalHeader className="text-2xl">
              {eventsObject[currentEvent].name}
            </ModalHeader>
            <ModalBody>
              <div
                className="flex flex-col gap-4 pb-8 px-2"
              >
                <Image
                  className="w-[17em]"
                  src={eventsObject[currentEvent].logoUrl}
                />
                <Popover placement="top" showArrow>
                  <PopoverTrigger>
                    <Button
                      color={(eventPayments.events[currentEvent]?.checkedInStatus) ? "success" : "warning"}
                      startContent={(eventPayments.events[currentEvent]?.checkedInStatus) ? <BadgeCheck /> : <CircleDashed />}
                      className="text-sm font-medium w-fit !px-4 !py-2 capitalize"
                    >
                      {(eventPayments.events[currentEvent]?.checkedInStatus) ? 'Checked In' : 'Not Checked In'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="text-md font-medium px-4 py-2">
                    You have {(eventPayments.events[currentEvent]?.checkedInStatus) ? 'checked' : 'not checked'} in for the Event
                  </PopoverContent>
                </Popover>
                <div
                  className="flex flex-row flex-wrap gap-1.5"
                >
                  <span
                    className="flex flex-row gap-2 bg-boxBlack text-white font-medium px-4 py-1.5 rounded-full uppercase"
                  >
                    <Building2 />
                    {eventsObject[currentEvent].departmentId} Dept
                  </span>
                  <span
                    className="flex flex-row gap-2 bg-boxBlack text-white font-medium px-4 py-1.5 rounded-full uppercase"
                  >
                    <Navigation />
                    {eventsObject[currentEvent].place}
                  </span>
                  <span
                    className="flex flex-row gap-2 bg-boxBlack text-white font-medium px-4 py-1.5 rounded-full uppercase"
                  >
                    <CalendarDays />
                    {new Date(eventsObject[currentEvent]?.startTime).toLocaleDateString('en-us', { day: "2-digit", month: 'short', year: 'numeric' })}
                  </span>
                  <span
                    className="flex flex-row gap-2 bg-boxBlack text-white font-medium px-4 py-1.5 rounded-full uppercase"
                  >
                    <Clock8 />
                    {new Date(eventsObject[currentEvent]?.startTime).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', hour12: true })} - {new Date(eventsObject[currentEvent]?.endTime).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </span>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      }
      {userUpdate &&
        <UserRegistration
          update={true}
        />
      }
    </div>
  )
}