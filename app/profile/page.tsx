'use client';
import React from "react";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useFirebase } from "@/contexts/firebase";
import { BadgeCheck, ChevronDown, FileText } from "lucide-react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";

type EventsObjectType = {
  [key: string]: Events;
};

export default function Profile() {
  const firebaseContext = useFirebase();
  const fireUserDoc = firebaseContext?.fireUserDoc
  const fireUserData = firebaseContext?.fireUserData
  const events = firebaseContext?.events || [];
  const registeredEvents = firebaseContext?.registeredEvents || {};

  const [currentEvent, setCurrentEvent] = React.useState<string | null>(null)

  const Fields = [
    { name: "Phone No", param: "phoneNo", type: "tel", value: fireUserData?.phoneNumber },
    { name: "Enroll No", param: "enrollNo", type: "text" },
    { name: "College", param: "college", type: "text" },
    { name: "Department", param: "department", type: "text" },
    { name: "Year", param: "year", type: "number" },
    { name: "Gender", param: "gender", type: "select" },
  ];

  const EventsObject = React.useMemo(() => events ? events.reduce<EventsObjectType>((acc, event) => {
    acc[event.id as string] = event;
    return acc;
  }, {} as EventsObjectType) : {}, [events])

  return (
    <div
      className="flex flex-col items-center gap-2 mt-10 lg:mt-[6vh] w-full pb-8"
    >
      <div
        className="flex flex-col gap-4 w-[90%] lg:w-[42em]"
      >
        <div
          className="flex flex-col gap-5 bg-white rounded-2xl px-8 py-10"
        >
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
            className="flex flex-col md:grid grid-cols-2 gap-4 bg-white text-white rounded-2xl px-6 py-8"
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
                      {EventsObject[registerEve[0]].name}
                    </span>
                    <span
                      className="text-md font-normal uppercase"
                    >
                      {EventsObject[registerEve[0]].departmentId}
                    </span>
                    <Button
                      size="sm"
                      color="success"
                      startContent={<BadgeCheck />}
                      className="text-md font-medium w-fit !px-4 !py-2 capitalize"
                    >
                      Registered
                      {/* Payment {registerEve[1].paymentStatus || 'pending'} */}
                    </Button>
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
                  src={EventsObject[registerEve[0]].logoUrl}
                />
              </div>
            )}
          </div>
        }
      </div>
      <Modal isOpen={currentEvent != null} size={'3xl'} onClose={() => setCurrentEvent(null)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-2xl">
            General Instruction
          </ModalHeader>
          <ModalBody>
            <div
              className='flex flex-col px-2'
            >
              <span
                className='text-xl font-semibold text-purpleAccent uppercase mb-2'
              >
                Registration Fee
              </span>
              {[200, 100].map(price =>
                <span
                  key={price}
                  className='mb-2'
                >
                  <span className='bg-purpleAccent text-white w-[20px] px-2 py-1 rounded-[6px] font-medium'>₹ {price}</span> for {(price == 100) ? 'in' : 'ex'}ternal participants
                </span>
              )}
            </div>
            <div
              className='flex flex-col gap-0.5 px-2'
            >
              <span
                className='text-xl font-semibold text-purpleAccent uppercase'
              >
                Note
              </span>
              <span>
                The registration fee covers the entire Mitilence event, permitting participation in multiple events, provided there are no scheduling conflicts. The fee must be paid at the designated payment desk within the college premises.
              </span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className='bg-purpleAccent text-white font-medium text-lg mb-4'
            >
              Register Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}