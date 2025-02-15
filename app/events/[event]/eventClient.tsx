'use client';
import './styles.css';
import React from "react";
import remarkGfm from 'remark-gfm';
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import Markdown from 'react-markdown';
import { useFirebase } from '@/contexts/firebase';
import { CircularLoader } from "@/components/internal/Loaders";
import { BadgeCheck, Building2, CalendarDays, ContactRound, Navigation, UsersRound } from "lucide-react";

export default function EventClientRender({ eventData }: { eventData: Events }) {
  const firebaseContext = useFirebase();
  const registeredEvents = firebaseContext?.registeredEvents || {};

  const registeredEventsSet = React.useMemo(() => new Set(Object.keys(registeredEvents)), [registeredEvents])

  return (
    (eventData == null) ?
      <CircularLoader />
    :
      <div
        className="flex flex-col items-center gap-8 mt-[-2vh] lg:mt-[-6vh] w-full px-6 md:px-10 pb-20"
      >
        <div
          className="flex flex-col gap-6 w-full lg:w-[62.5em]"
        >
          <Image
            isBlurred
            src={eventData.bannerUrl}
            className="h-full w-full object-cover rounded-[20px] border border-gray-800"
          />
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div
              className="w-full bg-[#9648ff1c] border-1.5 border-purpleAccent/50 pt-5 pb-7 px-5 lg:px-8 rounded-3xl shadow-xl flex flex-col gap-4"
            >
              <span
                className="uppercase font-semibold text-2xl text-center"
              >
                Event Details
              </span>
              <div
                className="flex flex-col gap-3"
              >
                <div
                  className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-1.5 px-6 gap-3.5"
                >
                  <CalendarDays color="#000000" size={25} />
                  <div
                    className="text-black flex flex-col gap-0.5"
                  >
                    <span
                      className="uppercase font-semibold text-md"
                    >
                      {new Date(eventData?.startTime).toLocaleDateString('en-us', { day: "2-digit", month: 'long', year: 'numeric' })}
                    </span>
                    <span
                      className="font-medium text-md mt-[-5px]"
                    >
                      {new Date(eventData?.startTime).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', hour12: true })} - {new Date(eventData?.endTime).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                  </div>
                </div>
                <div
                  className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-1.5 px-6 gap-3.5"
                >
                  <Building2 color="#000000" size={25} />
                  <div
                    className="text-black flex flex-col gap-0.5"
                  >
                    <span
                      className="uppercase font-semibold text-md"
                    >
                      Organized By
                    </span>
                    <span
                      className="font-medium text-md mt-[-5px] uppercase"
                    >
                      {eventData?.departmentId} Dept
                    </span>
                  </div>
                </div>
                <div
                  className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-1.5 px-6 gap-3.5"
                >
                  <Navigation color="#000000" size={25} />
                  <div
                    className="text-black flex flex-col gap-0.5"
                  >
                    <span
                      className="uppercase font-semibold text-md"
                    >
                      Location
                    </span>
                    <span
                      className="font-medium text-md mt-[-5px] uppercase"
                    >
                      {eventData?.place}
                    </span>
                  </div>
                </div>
                <div
                  className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-1.5 px-6 gap-3.5"
                >
                  <UsersRound color="#000000" size={25} />
                  <div
                    className="text-black flex flex-col gap-0.5"
                  >
                    <span
                      className="uppercase font-semibold text-md"
                    >
                      No. of Participants
                    </span>
                    <span
                      className="font-medium text-md mt-[-5px]"
                    >
                      {eventData?.teamSize} Members
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col justify-between gap-4"
            >
              <div
                className="w-full bg-[#9648ff1c] border-1.5 border-purpleAccent/50 pt-5 pb-7 px-5 lg:px-8 rounded-3xl shadow-xl flex flex-col gap-4"
              >
                <span
                  className="uppercase font-semibold text-xl text-center"
                >
                  Coordinator Details
                </span>
                <div
                  className="flex flex-col gap-3"
                >
                  <div
                    className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-1.5 px-6 gap-3.5"
                  >
                    <ContactRound color="#000000" size={25} />
                    <div
                      className="text-black flex flex-col gap-0.5"
                    >
                      <span
                        className="uppercase font-semibold text-md"
                      >
                        Department Staff
                      </span>
                      <span
                        className="font-medium text-md mt-[-5px] uppercase"
                      >
                        {eventData?.departmentId} Dept
                      </span>
                    </div>
                  </div>
                  <div
                    className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-1.5 px-6 gap-3.5"
                  >
                    <ContactRound color="#000000" size={25} />
                    <div
                      className="text-black flex flex-col gap-0.5"
                    >
                      <span
                        className="uppercase font-semibold text-md"
                      >
                        Student Coordinator - 1
                      </span>
                      <span
                        className="font-medium text-md mt-[-5px] uppercase"
                      >
                        {eventData?.departmentId} Dept
                      </span>
                    </div>
                  </div>
                  <div
                    className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-1.5 px-6 gap-3.5"
                  >
                    <ContactRound color="#000000" size={25} />
                    <div
                      className="text-black flex flex-col gap-0.5"
                    >
                      <span
                        className="uppercase font-semibold text-md"
                      >
                        Student Coordinator - 2
                      </span>
                      <span
                        className="font-medium text-md mt-[-5px] uppercase"
                      >
                        {eventData?.departmentId} Dept
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {registeredEventsSet.has(eventData.id) ?
                <span
                  className="flex items-center justify-center gap-2 bg-purpleAccent/30 select-none text-white text-xl font-medium rounded-full uppercase h-[3.2rem]"
                >
                  Registered <BadgeCheck />
                </span>
              :
                <Button
                  disabled={registeredEventsSet.has(eventData.id)}
                  className="bg-purpleAccent text-white text-xl font-medium rounded-full uppercase h-[3.2rem]"
                >
                  Register Now
                </Button>
              }
            </div>
          </div>
          <div
            className="bg-[#9648ff1c] flex flex-col rounded-3xl border border-purpleAccent/50 overflow-auto w-full"
          >
            <span
              className="bg-purpleAccent/50 px-7 py-2.5 text-2xl font-medium"
            >
              About Event
            </span>
            <Markdown
              remarkPlugins={[remarkGfm]}
              className={'p-6 flex flex-col gap-5 text-xl'}
            >
              {eventData?.eventDescription || ''}
            </Markdown>
          </div>
        </div>
      </div>
  )
}