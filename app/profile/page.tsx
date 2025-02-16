'use client';
import React from "react";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useFirebase } from "@/contexts/firebase";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { BadgeCheck, BadgeIndianRupee, Building2, CalendarDays, ChevronDown, CircleDashed, Clock8, FileText, Navigation, UserRoundPen } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import UserRegistration from "@/components/internal/userRegistration";

export default function Profile() {
  const firebaseContext = useFirebase();
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;
  const eventsObject = firebaseContext?.eventsObject || {};
  const registeredEvents = firebaseContext?.registeredEvents || {};

  const [userUpdate, setUserUpdate] = React.useState(false)
  const [currentEvent, setCurrentEvent] = React.useState<string | null>(null)

  const Fields = [
    { name: "Phone No", param: "phoneNo", type: "tel", value: fireUserData?.phoneNumber },
    { name: "Enroll No", param: "enrollNo", type: "text" },
    { name: "College", param: "college", type: "text" },
    { name: "Department", param: "department", type: "text" },
    { name: "Year", param: "year", type: "number" },
    { name: "Gender", param: "gender", type: "select" },
  ];

  return (
    <div
      className="flex flex-col items-center gap-2 mt-10 lg:mt-[6vh] w-full pb-8"
    >
      <div
        className="flex flex-col gap-4 w-[90%] lg:w-[42em]"
      >
        <div
          className="flex flex-col gap-6 bg-white rounded-2xl p-8"
        >
          <Button
            color="primary"
            onPress={() => setUserUpdate(true)}
            startContent={<UserRoundPen size={20} />}
            className="flex flex-row gap-2 text-md self-end font-medium bg-blue-500 text-white px-4 py-1.5 rounded-[10px]"
          >
            Update
          </Button>
          <div
            className="flex md:flex-row gap-2.5 items-center justify-between flex-col-reverse"
          >
            <div
              className="flex flex-col items-center md:items-start h-full"
            >
              <span
                className="text-3xl font-medium"
              >
                {fireUserDoc?.name}
              </span>
              <span
                className="text-[18px]"
              >
                {fireUserDoc?.emailId}
              </span>
              <Tooltip
                showArrow
                placement="bottom"
                className="text-md font-medium px-4 py-2"
                content={(fireUserDoc?.paymentStatus != "verified") ? 'You have not paid the one time Event fee in college permis' : 'You have paid the Event Fee'}
              >
                <Button
                  size="sm"
                  color={(fireUserDoc?.paymentStatus == "verified") ? "success" : "warning"}
                  startContent={<BadgeIndianRupee />}
                  className="text-md font-medium w-fit !px-4 !py-2 capitalize mt-1"
                >
                  Payment {fireUserDoc?.paymentStatus || 'pending'}
                </Button>
              </Tooltip>
            </div>
            <Image
              width={100}
              height={100}
              src={fireUserDoc?.imageUrl || '/images/default_user.png'}
              classNames={{
                wrapper: 'bg-contain bg-no-repeat'
              }}
              fallbackSrc={'/images/default_user.png'}
              className="object-cover bg-contain"
            />
          </div>
          <div
            className="grid md:grid-cols-2 gap-5"
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
          Registered Events ( {Object.keys(registeredEvents).length} )
          {(Object.keys(registeredEvents).length > 0) &&
            <ChevronDown size={30} />
          }
        </span>
        {(Object.keys(registeredEvents).length > 0) &&
          <div
            className="flex flex-col sm:grid grid-cols-2 gap-4 bg-white text-white rounded-2xl px-6 py-8"
          >
            {(Object.entries(registeredEvents)).map(registerEve => 
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
                    <Tooltip
                      showArrow
                      className="text-md font-medium px-4 py-2"
                      content={`You have ${(registerEve[1]?.checkedInStatus == 'checkedin') ? 'checked' : 'not checked'} in for the Event`}
                    >
                      <Button
                        size="sm"
                        color={(registerEve[1]?.checkedInStatus == 'checkedin') ? "success" : "warning"}
                        startContent={(registerEve[1]?.checkedInStatus == 'checkedin') ? <BadgeCheck /> : <CircleDashed />}
                        className="text-md font-medium w-fit !px-4 !py-2 capitalize"
                        >
                        {(registerEve[1]?.checkedInStatus == 'checkedin') ? 'Checked In' : 'Not Checked In'}
                      </Button>
                    </Tooltip>
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
            <ModalHeader className="flex flex-col gap-1 text-2xl pt-6">
              {eventsObject[currentEvent].name}
              <Tooltip
                showArrow
                className="text-md font-medium px-4 py-2"
                content={`You have ${(registeredEvents[currentEvent]?.checkedInStatus == 'checkedin') ? 'checked' : 'not checked'} in for the Event`}
              >
                <Button
                  size="sm"
                  color={(registeredEvents[currentEvent]?.checkedInStatus == 'checkedin') ? "success" : "warning"}
                  startContent={(registeredEvents[currentEvent]?.checkedInStatus == 'checkedin') ? <BadgeCheck /> : <CircleDashed />}
                  className="text-sm font-medium w-fit !px-4 !py-2 capitalize"
                >
                  {(registeredEvents[currentEvent]?.checkedInStatus == 'checkedin') ? 'Checked In' : 'Not Checked In'}
                </Button>
              </Tooltip>
            </ModalHeader>
            <ModalBody>
              <div
                className="flex flex-col gap-4 pb-8 px-2"
              >
                <Image
                  className="w-[17em]"
                  src={eventsObject[currentEvent].logoUrl}
                />
                <div
                  className="flex flex-col gap-2.5 w-full"
                >
                  <span
                    className="flex flex-row gap-1.5 items-center text-xl font-semibold"
                  >
                    Participants <span
                      className="bg-boxBlack px-2 rounded-[8px] text-md font-medium text-white"
                    >
                      {eventsObject[currentEvent].teamSize}
                    </span>
                  </span>
                  {(registeredEvents[currentEvent]?.teamMembers != null) &&
                    <div
                      className="flex flex-col gap-1.5"
                    >
                      {registeredEvents[currentEvent].teamMembers.map((members, membIndex) =>
                        <span
                          key={membIndex}
                          className="bg-gray-100 border border-gray-300 text-black text-lg font-medium px-4 py-1.5 rounded-xl"
                        >
                          {members}
                        </span>
                      )}
                    </div>
                  }
                </div>
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