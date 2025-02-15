'use client';
import React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Tabs, Tab, Image } from "@heroui/react";
import Footer from "@/components/internal/footer";
import { ArrowUpRight, BadgeCheck, Search } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GoogleMap } from "@/components/internal/googleMap";
import CrossVelocity from "@/components/internal/crossVelocity";
import { CircularLoader } from "@/components/internal/Loaders";
import HeaderSection from "@/components/internal/headerSection";
import TechnicalEventsImg from '@/assets/images/technical_events.png';
import { useFirebase } from "@/contexts/firebase";

export default function Events() {
  const firebaseContext = useFirebase();
  const events = firebaseContext?.events
  const departments = firebaseContext?.departments || []
  const eventCategories = firebaseContext?.eventCategories || []
  const registeredEventsSet = firebaseContext?.registeredEventsSet;

  const [currentSearch, setCurrentSearch] = React.useState('')
  const [currentDepartment, setCurrentDepartment] = React.useState<Department>();
  const [currentEventCategory, setCurrentEventCategory] = React.useState<EventCategory>(eventCategories[0]);

  const filteredEvents = React.useMemo(() => (
    events?.filter((e) => 
      (e.departmentId === currentDepartment?.id) &&
      (e.name.toLowerCase().includes(currentSearch.toLowerCase())) &&
      (
        (e.eventCategory === currentEventCategory.id) ||
        (currentEventCategory.id === 'all_events')
      )
    )
  ), [events, currentDepartment, currentEventCategory, currentSearch]);

  return (
    <div
      className="flex flex-col items-center text-white"
    >
      <HeaderSection
        bannerName={currentEventCategory?.name || "Events"}
        bannerImg={TechnicalEventsImg.src}
       />
      {((events == null) || (filteredEvents == null)) ?
          <div
            className="h-[60vh]"
          >
            <CircularLoader />
          </div>
        :
        <>
          <div
            className="bg-white rounded-full w-[90%] lg:mt-[-5vh] lg:w-[60%] overflow-auto flex flex-row items-center gap-2 px-1 lg:px-2 mb-6"
          >
            <input
              placeholder="Search for events"
              onChange={(e) => setCurrentSearch(e.target.value)}
              className="w-full outline-none border-none px-4 font-medium text-md text-black py-4"
            />
            <Button
              className="bg-purpleAccent text-white w-2 rounded-full"
            >
              <Search />
            </Button>
          </div>
          <Tabs
            size="lg"
            aria-label="Options"
            color="primary"
            variant="bordered"
            onSelectionChange={(index) => setCurrentDepartment(departments[+index])}
            classNames={{
              tabList: "empty:hidden grid md:flex grid-cols-3 gap-1 p-2 border-1.5 border-purpleAccent rounded-2xl",
              cursor: "w-full bg-purpleAccent text-white font-medium text-lg outline-none border-none",
              tab: "px-5 py-2 outline-none border-none font-medium",
              tabContent: "group-data-[selected=true]:text-white text-white border-none",
            }}
          >
            {departments.map((dept, i) => (
              <Tab
                key={i}
                title={dept.name.toUpperCase()}
              />
            ))}
          </Tabs>
          <div
            className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full p-4 lg:px-14 mt-2 pb-10"
          >
            <Tabs
              size="lg"
              aria-label="Options"
              color="primary"
              variant="bordered"
              isVertical={true}
              onSelectionChange={(index) => setCurrentEventCategory(eventCategories[+index])}
              classNames={{
                tabList: "flex-col gap-2 p-2 border-1.5 border-purpleAccent rounded-2xl bg-[#9648ff0f] w-[18em]",
                cursor: "w-full bg-purpleAccent text-white font-medium text-lg outline-none border-none",
                tab: "px-5 py-6 font-medium outline-none border-none",
                tabContent: "group-data-[selected=true]:text-white text-white border-none",
              }}
            >
              {eventCategories.map((categ, i) => (
                <Tab
                  key={i}
                  title={categ?.name?.toUpperCase()}
                />
              ))}
            </Tabs>
            {(events?.length == 0) || (filteredEvents?.length == 0) ?
              <span
                className="text-xl w-full font-normal mt-2 text-center md:text-start"
              >
                Currently, there are no events available under this filter.
              </span>
              :
              <div
                className="flex flex-row flex-wrap items-center justify-center md:items-start md:justify-start w-full rounded-xl gap-6"
              >
                {filteredEvents.map((event, idx) =>
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="group"
                  >
                    <BlurFade
                      inView
                      delay={0 + (idx+1) * 0.05}
                    >
                      {(registeredEventsSet?.has(event.id)) &&
                        <button
                          className="flex flex-row gap-2 rounded-xl top-2 left-2 drop-shadow-xl shadow-xl absolute z-30 bg-[#17C964] text-black text-md font-medium w-fit !px-4 !py-1.5 capitalize"
                        >
                          <BadgeCheck /> Registered
                          {/* Payment {registerEve[1].paymentStatus || 'pending'} */}
                        </button>
                      }
                      <Image
                        isBlurred
                        key={idx}
                        alt={event.name}
                        src={event.logoUrl}
                        className="object-cover w-[20em] h-[20em] cursor-pointer"
                      />
                      <div className="absolute z-30 bottom-3 right-3 bg-white text-black shadow-2xl drop-shadow-2xl p-2 rounded-xl transform transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:scale-105">
                        <ArrowUpRight size={24} />
                      </div>
                    </BlurFade>
                  </Link>
                )}
              </div>
            }
          </div>
        </>
      }
      <CrossVelocity>
        Explore
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </div>
  )
}