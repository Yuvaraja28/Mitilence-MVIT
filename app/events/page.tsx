'use client';
import React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Tabs, Tab, Image } from "@heroui/react";
import Footer from "@/components/internal/footer";
import { useFirebase } from "@/contexts/firebase";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GoogleMap } from "@/components/internal/googleMap";
import { CircularLoader } from "@/components/internal/Loaders";
import HeaderSection from "@/components/internal/headerSection";
import { ArrowUpRight, BadgeCheck, Search } from "lucide-react";
import CrossVelocity from "@/components/internal/crossVelocity";
import { EventsFallbackImg, TechnicalEventsImg } from "@/variables";

const eventCategories = [
  { id: 'all_events', name: 'All Events', order: 0 },
  { id: 'technical', name: 'Technical', order: 1 },
  { id: 'non_technical', name: 'Non-Technical', order: 2 },
  { id: 'presentation', name: 'Presentation', order: 3 },
  { id: 'expo', name: 'Expo', order: 4 },
]

export default function Events() {
  const firebaseContext = useFirebase();
  const events = firebaseContext?.events
  const departments = firebaseContext?.departments || []
  const registeredEventsSet = firebaseContext?.registeredEventsSet;

  React.useEffect(() => {
    const searchParams = new URL(location.href).searchParams;
    const departmentParam = searchParams.get('department');
    const categoryParam = searchParams.get('category');
      if (departmentParam) {
      const department = departments.find(dept => dept.id === departmentParam);
      setCurrentDepartment(() => department);
    } else {
      setCurrentDepartment(() => departments[0]);
    }
    if (categoryParam) {
      const category = eventCategories.find(cat => cat.id === categoryParam);
      if (category) {
        setCurrentEventCategory(() => category);
      }
    } else {
      setCurrentEventCategory(() => eventCategories[0]);
    }
  }, [departments, eventCategories]);

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
      className="flex flex-col items-center text-white w-full"
    >
      <HeaderSection
        bannerName={currentEventCategory?.name || "Events"}
        bannerImg={TechnicalEventsImg}
      />
      {((events == null) || (filteredEvents == null)) ?
          <div
            className="h-[62vh]"
          >
            <CircularLoader />
          </div>
        :
        <>
          <div
            className="bg-white rounded-full w-[90%] lg:mt-[-2em] lg:w-[60%] overflow-auto flex flex-row items-center gap-2 px-1 lg:px-2 mb-6"
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
            selectedKey={currentDepartment?.id}
            defaultSelectedKey={currentDepartment?.id}
            shouldSelectOnPressUp={false}
            onSelectionChange={(index) => {
              if (currentDepartment == null) return;
              const selectedDepartment = departments.find(dep => dep.id === index);
              setCurrentDepartment(() => selectedDepartment);
              const params = new URLSearchParams(window.location.search);
              if (selectedDepartment) { params.set('department', selectedDepartment.id) }
              else { params.delete('department') }
              window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
            }}
            classNames={{
              tabList: "empty:hidden grid md:flex grid-cols-3 gap-1 p-2 border-1.5 border-purpleAccent rounded-2xl",
              cursor: "w-full bg-purpleAccent text-white font-medium text-lg outline-none border-none",
              tab: "px-5 py-2 outline-none border-none font-medium",
              tabContent: "group-data-[selected=true]:text-white text-white border-none",
            }}
          >
            {departments.map((dept) => (
              <Tab
                key={dept.id}
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
              selectedKey={currentEventCategory?.id}
              onSelectionChange={(index) => {
                const selectedCategory = eventCategories.find(cat => cat.id === index);
                if (selectedCategory) {
                  setCurrentEventCategory(() => selectedCategory);
                }
                const params = new URL(location.href).searchParams;
                if (selectedCategory) { params.set('category', selectedCategory.id) }
                else { params.delete('category') }
                window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
              }}
              classNames={{
                tabList: "flex-col gap-2 p-2 border-1.5 border-purpleAccent rounded-2xl bg-[#9648ff0f] w-[18em]",
                cursor: "w-full bg-purpleAccent text-white font-medium text-lg outline-none border-none",
                tab: "px-5 py-6 font-medium outline-none border-none",
                tabContent: "group-data-[selected=true]:text-white text-white border-none",
              }}
            >
              {eventCategories.map((categ) => (
                <Tab
                  key={categ.id}
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
                className="flex flex-row flex-wrap items-center justify-center md:items-start md:justify-start w-full rounded-xl gap-3"
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
                        </button>
                      }
                      <Image
                        key={idx}
                        alt={event.name}
                        fallbackSrc={EventsFallbackImg}
                        src={event?.logoUrl || EventsFallbackImg}
                        className="object-cover w-[15em] h-[15em] cursor-pointer"
                      />
                      <div className="absolute z-30 bottom-3 right-3 bg-white text-black shadow-2xl drop-shadow-2xl p-2 rounded-xl transform transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:scale-105">
                        <ArrowUpRight size={20} />
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
        REGISTER NOW
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </div>
  )
}