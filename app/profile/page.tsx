'use client';
import { Image } from "@heroui/image";
import { useFirebase } from "@/contexts/firebase";
import { Input } from "@heroui/input";
import { ChevronDown } from "lucide-react";
import React from "react";

type EventsObjectType = {
  [key: string]: Events;
};

export default function Profile() {
  const firebaseContext = useFirebase();
  const firestoreDB = firebaseContext?.firestoreDB
  const fireUserDoc = firebaseContext?.fireUserDoc
  const fireUserData = firebaseContext?.fireUserData
  const events = firebaseContext?.events || [];
  const departments = firebaseContext?.departments || []
  const eventCategories = firebaseContext?.eventCategories || []
  const registeredEvents = firebaseContext?.registeredEvents || {};

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
              src={fireUserDoc?.imageUrl}
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
          {(Object.keys(registeredEvents).length > 1) &&
            <ChevronDown size={30} />
          }
        </span>
        {(Object.keys(registeredEvents).length > 1) &&
          <div
            className="flex flex-col md:grid grid-cols-2 gap-4 bg-white text-white rounded-2xl px-6 py-8"
          >
            {(Object.entries(registeredEvents)).map(registerEve => 
              <div
                key={registerEve[0]}
                className="flex flex-col gap-2 bg-boxBlack p-4 rounded-3xl"
              >
                <div
                  className="flex flex-col px-1"
                >
                  <span
                    className="text-2xl font-medium"
                  >
                    {EventsObject[registerEve[0]].name}
                  </span>
                  <span
                    className="text-lg font-normal uppercase"
                  >
                    {EventsObject[registerEve[0]].departmentId}
                  </span>
                </div>
                <Image
                  src={EventsObject[registerEve[0]].logoUrl}
                />
              </div>
            )}
          </div>
        }
      </div>
    </div>
  )
}