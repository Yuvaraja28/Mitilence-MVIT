'use client';
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@heroui/button";
import { Tabs, Tab, Image } from "@heroui/react";
import TechnicalEventsImg from '@/assets/images/technical_events.png';
import HeaderSection from "@/components/internal/headerSection";
import { BlurFade } from "@/components/magicui/blur-fade";
import { getDepartments } from "@/Firestore/departments";
import { getEventCategories } from "@/Firestore/eventCategories";
import { getEvents } from "@/Firestore/events";

export default function Events() {
  const [events, setEvents] = React.useState<Events[]>([])
  const [currentSearch, setCurrentSearch] = React.useState('')
  const [departments, setDepartments] = React.useState<Department[]>([]);
  const [eventCategories, setEventCategories] = React.useState<EventCategory[]>([{ id: 'all_events', name: 'All Events', order: 0 }])
  const [currentDepartment, setCurrentDepartment] = React.useState<Department>();
  const [currentEventCategory, setCurrentEventCategory] = React.useState<EventCategory>(eventCategories[0]);

  const filteredEvents = React.useMemo(() => (
    events.filter((e) => 
      (e.departmentId === currentDepartment?.id) &&
      (e.name.toLowerCase().includes(currentSearch.toLowerCase())) &&
      (
        (e.eventCategory === currentEventCategory.id) ||
        (currentEventCategory.id === 'all_events')
      )
    )
  ), [events, currentDepartment, currentEventCategory, currentSearch]);

  React.useLayoutEffect(() => {
    getDepartments()
      .then(data => setDepartments(() => data))
    getEventCategories()
      .then(data => setEventCategories(prev => {
        const newCategories = data.filter(newCat => !prev.find(prevCat => prevCat.id === newCat.id));
        return [...prev, ...newCategories];
      }))
    getEvents()
      .then(data => setEvents(data))
  }, []);

  return (
    <div
      className="flex flex-col items-center text-white"
    >
      <HeaderSection
        bannerName={currentEventCategory?.name || "Events"}
        bannerImg={TechnicalEventsImg.src}
       />
      <div
        className="bg-white rounded-full w-[90%] lg:mt-[-6vh] lg:w-[60%] overflow-auto flex flex-row items-center gap-2 p-1 lg:p-2 mb-6"
      >
        <input
          placeholder="Search for events"
          onChange={(e) => setCurrentSearch(e.target.value)}
          className="w-full outline-none border-none px-4 font-medium text-md text-black"
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
        {(filteredEvents.length === 0) &&
          <span
            className="text-xl w-full font-normal mt-2"
          >
            Currently, there are no events available under this filter.
          </span>
        }
        <div
          className="flex flex-col items-center md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full rounded-xl gap-6"
        >
          {filteredEvents.map((event, idx) =>
            <BlurFade
              inView
              key={event.id}
              delay={0.25 + (idx+1) * 0.1}
            >
              <Image
                isBlurred
                isZoomed
                key={idx}
                alt={event.name}
                src={event.bannerUrl}
                className="object-cover w-full h-full cursor-pointer"
              /> 
            </BlurFade>
          )}
        </div>        
      </div>
    </div>
  )
}