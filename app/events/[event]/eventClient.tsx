'use client';
import React from "react";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { CircularLoader } from "@/components/internal/Loaders";
import { CalendarDays, ContactRound } from "lucide-react";


export default function EventClientRender({ eventData }: { eventData: Events }) {
  return (
    (eventData == null) ?
      <CircularLoader />
    :
      <div
        className="flex flex-col items-center gap-12 mt-[-2vh] lg:mt-[-6vh] w-full px-6 md:px-10 pb-20"
      >
        <Image
          isBlurred
          src={eventData.bannerUrl}
          style={{
            alignSelf: 'center'
          }}
          className="h-full sm:h-[45vh] object-cover md:h-[55vh] rounded-[8px]"
        />
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-[62.5em]"
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
                className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-2 px-6 gap-3.5"
              >
                <CalendarDays color="#000000" size={25} />
                <div
                  className="text-black flex flex-col"
                >
                  <span
                    className="uppercase font-semibold text-lg"
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
                className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-2 px-6 gap-3.5"
              >
                <CalendarDays color="#000000" size={25} />
                <div
                  className="text-black flex flex-col"
                >
                  <span
                    className="uppercase font-semibold text-lg"
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
                className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-2 px-6 gap-3.5"
              >
                <CalendarDays color="#000000" size={25} />
                <div
                  className="text-black flex flex-col"
                >
                  <span
                    className="uppercase font-semibold text-lg"
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
                  className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-2 px-6 gap-3.5"
                >
                  <ContactRound color="#000000" size={25} />
                  <div
                    className="text-black flex flex-col"
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
                  className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-2 px-6 gap-3.5"
                >
                  <ContactRound color="#000000" size={25} />
                  <div
                    className="text-black flex flex-col"
                  >
                    <span
                      className="uppercase font-semibold text-md"
                    >
                      Student Coordinator
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
            <Button
              className="bg-purpleAccent text-white text-xl font-medium rounded-full uppercase h-[3.2rem]"
            >
              Register Now
            </Button>
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-[62.5em]"
        >
          About Event
        </div>
      </div>
  )
}