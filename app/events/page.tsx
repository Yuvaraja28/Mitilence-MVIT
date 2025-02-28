'use client';
import "./styles.css";
import React from "react";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import { Button } from "@heroui/button";
import confettiPopUp from "@/animations/confetti";
import Footer from "@/components/internal/footer";
import { useFirebase } from "@/contexts/firebase";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GoogleMap } from "@/components/internal/googleMap";
import { CircularLoader } from "@/components/internal/Loaders";
import HeaderSection from "@/components/internal/headerSection";
import CrossVelocity from "@/components/internal/crossVelocity";
import { EventsFallbackImg, TechnicalEventsImg } from "@/variables";
import { ArrowUpRight, BadgeCheck, BadgeIndianRupee, Building2, CalendarDays, ContactRound, Link2, Search, Share2, UsersRound } from "lucide-react";
import { Tabs, Tab, Image, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";

const Markdown = dynamic(() => import("react-markdown"), { ssr: false });

const GeneralInstruction = [
  'Engineering students only allowed to participate in the symposium',
  'Spot registration is allowed except paper presentation',
  'College ID card essential for participation',
  'Lunch & Participation certificates are provided for registered participants',
  'Students are advised to maintain the formal dress code'
];

const eventCategories = [
  { id: 'all_events', name: 'All Events', order: 0 },
  { id: 'technical', name: 'Technical', order: 1 },
  { id: 'non_technical', name: 'Non-Technical', order: 2 },
  { id: 'presentation', name: 'Presentation', order: 3 },
  { id: 'expo', name: 'Expo', order: 4 },
]

// import { getEvent } from "@/Firestore/events";
// type Params = Promise<{ event: string }> 
// export async function generateMetadata({ params }: { params: Params }) {
//   const eventData = await getEvent((await params).event)
//   console.log(eventData);
//   const eventDate = new Date(eventData.startTime).toLocaleDateString('en-us', { month: 'short', year: 'numeric', day: '2-digit' });
//   const startTime = new Date(eventData.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
//   const endTime = new Date(eventData.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

//   return {
//     title: `${eventData.name} • ${eventData.departmentId.toUpperCase()}`,
//     description: `Join us at the Mitilence event in ${eventData.place.toUpperCase()} on ${eventDate} from ${startTime} to ${endTime}. Team size: ${eventData.teamSize}`,
//     icons: {
//       icon: eventData.logoUrl,
//       apple: eventData.logoUrl
//     },
//     openGraph: {
//       type: "website",
//       title: `${eventData.name} • ${eventData.departmentId.toUpperCase()}`,
//       description: `Join us at the Mitilence event in ${eventData.place.toUpperCase()} on ${eventDate} from ${startTime} to ${endTime}. Team size: ${eventData.teamSize}`,
//       siteName: "Mitilence • MVIT",
//       images: [{
//         url: eventData.logoUrl,
//       }],
//     },
//     twitter: {
//       card: `Join us at the Mitilence event in ${eventData.place.toUpperCase()} on ${eventDate} from ${startTime} to ${endTime}. Team size: ${eventData.teamSize}.`,
//       images: eventData.logoUrl,
//       creator: 'Yuvaraja'
//     }
//   }
// }

export default function Events() {
  const firebaseContext = useFirebase();
  const events = firebaseContext?.events;
  const LoginGoogle = firebaseContext?.LoginGoogle;
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;
  const departments = firebaseContext?.departments || [];
  const eventsObject = firebaseContext?.eventsObject || {};
  // const checkedInEventsSet = firebaseContext?.checkedInEventsSet || new Set();
  const eventPayments = firebaseContext?.eventPayments || {} as EventUserPayments;
  const [isEventSubmitting, setIsEventSubmitting] = React.useState<boolean>(false);
  const [generalInstructionsRead, setGeneralInstructionsRead] = React.useState(false);
  // const [studentOrganizer, setStudentOrganizer] = React.useState<EventCoordinator | null>(null);
  // const [facultyOrganizer, setFacultyOrganizer] = React.useState<EventCoordinator | null>(null);
  
  const [currentSearch, setCurrentSearch] = React.useState('');
  const [currentEvent, setCurrentEvent] = React.useState<Events | null>();
  const [currentDepartment, setCurrentDepartment] = React.useState<Department>();
  const [currentEventCategory, setCurrentEventCategory] = React.useState<EventCategory>(eventCategories[0]);
  
  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    const searchParams = new URL(location.href).searchParams;
    const departmentParam = searchParams.get('department');
    const categoryParam = searchParams.get('category');
    const eventParam = searchParams.get('event');
    if (eventParam) {
      const event = eventsObject[eventParam];
      if (event) {
        setCurrentEvent(() => event);
      }
    }
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
    
  }, [events, departments, eventCategories]);

  // React.useEffect(() => {
  //   if (currentEvent?.facultyCoordinatorId) {
  //     getCoordinator(currentEvent.facultyCoordinatorId)
  //       .then(data => setFacultyOrganizer(data))
  //       .catch(() => {})
  //   }
  //   if (currentEvent?.studentCoordinatorId && typeof currentEvent.studentCoordinatorId === 'string') {
  //     getCoordinator(currentEvent.studentCoordinatorId)
  //       .then(data => setStudentOrganizer(data))
  //       .catch(() => {})
  //   }
  // }, [currentEvent])
  
  async function registerNow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentDepartment?.id == null) return;
    setIsEventSubmitting(() => true);
    fetch("/api/departmentRegister", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${fireUserData?.accessToken}`
      },
      body: JSON.stringify({
        departmentId: currentDepartment.id
      })
    })
      .then(() => {
        onClose()
        confettiPopUp()
      })
      .finally(() => setIsEventSubmitting(() => false))
  }
  
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
              className="w-full outline-none border-none px-4 font-medium text-base text-black py-4"
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
              if (currentDepartment?.id == null) return;
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
                const selectedCategory = eventCategories.find(cat => cat.id === index) || eventCategories[0];
                if (selectedCategory) {
                  setCurrentEventCategory(() => selectedCategory);
                }
                const params = new URL(location.href).searchParams;
                if (selectedCategory.id != "all_events") { params.set('category', selectedCategory.id) }
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
            <div
              className="flex flex-col items-center lg:items-start gap-6 lg:gap-4"
            >
              {(eventPayments.mitilence?.[currentDepartment?.id || '']?.registrationStatus) ? (
                <span className={`flex items-center justify-center gap-2 ${(eventPayments.mitilence?.[currentDepartment?.id || '']?.paymentStatus) ? "bg-[#17C964]" : "bg-yellow-500"} select-none text-black text-xl font-medium rounded-xl px-6 py-2.5 mt-1 w-fit`}>
                  Registered {(eventPayments.mitilence?.[currentDepartment?.id || '']?.paymentStatus) ? 'and Paid' : 'but not Paid'} {(eventPayments.mitilence?.[currentDepartment?.id || '']?.paymentStatus) ? <BadgeCheck /> : <BadgeIndianRupee />}
                </span>
              ) : (
                <Button
                  size="lg"
                  onPress={onOpen}
                  // disabled={checkedInEventsSet.has(currentEvent?.id || '')}
                  // isDisabled={
                  //   !checkedInEventsSet.has(currentEvent?.id || '') &&
                  //   (currentEvent?.registrationsClosed || currentEvent?.eventClosed)
                  // }
                  className={`bg-purpleAccent text-white text-xl font-medium rounded-xl mt-1 w-fit`}
                    // ${!checkedInEventsSet.has(currentEvent?.id || '') &&
                    // (currentEvent?.registrationsClosed || currentEvent?.eventClosed)
                    //   ? "bg-red-500"
                    //   : "bg-purpleAccent"}
                >
                  {/* {!checkedInEventsSet.has(currentEvent?.id || '') &&
                  (currentEvent?.registrationsClosed || currentEvent?.eventClosed)
                    ? "Registrations Closed" */}
                    Register Now for {currentDepartment?.id.toUpperCase()} Events
                </Button>
              )}
              {(events?.length == 0) || (filteredEvents?.length == 0) ?
                <span
                  className="text-xl w-full font-normal text-center md:text-start px-1"
                >
                  Currently, there are no events available under this filter.
                </span>
                :
                <div
                  className="flex flex-row flex-wrap items-center justify-center md:items-start md:justify-start w-full rounded-xl gap-3"
                >
                  {filteredEvents.map((event, idx) =>
                    <div
                      key={event.id}
                      className="group"
                      onClick={() => {
                        const selectedEvent = eventsObject[event.id];
                        if (selectedEvent) {
                          setCurrentEvent(() => selectedEvent);
                        }
                        const params = new URL(location.href).searchParams;
                        if (selectedEvent) { params.set('event', selectedEvent.id) }
                        else { params.delete('event') }
                        window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
                      }}
                    >
                      <BlurFade
                        inView
                        delay={0 + (idx+1) * 0.05}
                      >
                        {/* {(checkedInEventsSet?.has(event.id)) &&
                          <button
                            className="flex flex-row gap-2 rounded-xl top-2 left-2 drop-shadow-xl shadow-xl absolute z-30 bg-[#17C964] text-black text-base font-medium w-fit !px-4 !py-1.5 capitalize"
                          >
                            <BadgeCheck /> Registered
                          </button>
                        } */}
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
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        </>
      }
      {(currentEvent != null) &&
        <Modal
          isOpen={true}
          size={"3xl"}
          backdrop="blur"
          placement="bottom"
          scrollBehavior="outside"
            classNames={{
              body: "py-6",
              backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
              base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] rounded-3xl customScrollBar",
              header: "border-b-[1px] border-[#292f46]",
              footer: "border-t-[1px] border-[#292f46]",
              closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
            onClose={
              isEventSubmitting
                ? () => {}
                : () => {
                  setGeneralInstructionsRead(() => false);
                  setCurrentEvent(() => null);
                  const params = new URL(location.href).searchParams;
                  params.delete('event')
                  window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
                }
            }
          >
          <ModalContent>
            <ModalBody
              className="flex flex-col gap-3 overflow-auto"
            >
              <div className="md:grid md:grid-cols-2 flex flex-col h-fit gap-3">
                <div
                  className="flex flex-col gap-1.5"
                >
                  <BlurFade inView delay={1 * 0.05} className="h-full">
                    <Image
                      classNames={{
                        wrapper: '!h-full'
                      }}
                      fallbackSrc={EventsFallbackImg}
                      src={currentEvent?.logoUrl || EventsFallbackImg}
                      className="h-full md:h-full object-cover rounded-[20px] border border-gray-800"
                    />
                    <Popover placement="left">
                      <PopoverTrigger>
                        <Button
                          isIconOnly
                          className="absolute top-4 right-4 z-30 bg-boxBlack text-white border border-white/20"
                        >
                          <Share2 size={20} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-row p-2 gap-1.5 bg-boxBlack text-white">
                        <Link
                          target="_blank"
                          className="bg-[#25D366] rounded-[8px] text-white p-1.5"
                          href={`https://api.whatsapp.com/send/?text=Check%20out%20this%20great%20event%20happening%20in%20MVIT:%0A${window.location.origin}/events?event=${currentEvent.id}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                          </svg>
                        </Link>
                        <Button
                          size="sm"
                          isIconOnly
                          className="bg-white/5"
                          onPress={() =>
                            navigator?.clipboard.writeText(`${window.location.origin}/events?event=${currentEvent.id}`)
                          }
                        >
                          <Link2 color="#FFFFFF" size={20} />
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </BlurFade>
                </div>
                <div className="w-full bg-[#9648ff1c] border-1.5 border-purpleAccent/50 py-3 px-2.5 rounded-3xl shadow-xl flex flex-col justify-between gap-2 select-none">
                  <span className="flex items-center justify-center uppercase font-semibold text-2xl text-center h-full">
                    Event Details
                  </span>
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#ebe4ff] rounded-2xl flex flex-row items-center py-1.5 px-5 gap-3">
                      <CalendarDays color="#000000" size={25} />
                      <div className="text-black flex flex-col h-full">
                        <span className="uppercase font-semibold text-base">
                          {currentEvent?.startTime ? new Date(currentEvent?.startTime).toLocaleDateString(
                            "en-us",
                            { day: "2-digit", month: "long", year: "numeric" }
                          ) : ""}
                        </span>
                        <span className="font-medium text-base mt-[-5px]">
                          {currentEvent?.startTime ? new Date(currentEvent?.startTime).toLocaleTimeString(
                            "en-us",
                            { hour: "2-digit", minute: "2-digit", hour12: true }
                          ) : ""}{" "}
                          -{" "}
                          {currentEvent?.endTime ? new Date(currentEvent?.endTime).toLocaleTimeString(
                            "en-us",
                            { hour: "2-digit", minute: "2-digit", hour12: true }
                          ) : ""}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#ebe4ff] rounded-2xl flex flex-row items-center py-1.5 px-5 gap-3">
                      <Building2 color="#000000" size={25} />
                      <div className="text-black flex flex-col gap-0.5 h-full">
                        <span className="uppercase font-semibold text-base">
                          Organized By
                        </span>
                        <span className="font-medium text-base mt-[-5px] uppercase leading-[19px]">
                          {currentEvent?.departmentId} Dept - {currentEvent?.place}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#ebe4ff] rounded-2xl flex flex-row items-center py-1.5 px-5 gap-3 w-full">
                      <UsersRound color="#000000" size={25} />
                      <div className="text-black flex flex-col h-full">
                        <span className="uppercase font-semibold text-base">
                          Participants
                        </span>
                        <span className="font-medium text-base mt-[-5px]">
                          {currentEvent?.teamSize} Members
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#ebe4ff] rounded-2xl flex flex-row items-center py-1.5 px-5 gap-3">
                      <ContactRound color="#000000" size={25} />
                      <div className="text-black flex flex-col gap-0.5 h-full">
                        <span className="uppercase font-semibold text-base">
                          Department Staff
                        </span>
                        <span className="font-medium text-base mt-[-5px] leading-[19px]">
                          {currentEvent?.facultyOrganizer || "TBA"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#ebe4ff] rounded-2xl flex flex-row items-center py-1.5 px-5 gap-3">
                      <ContactRound color="#000000" size={25} />
                      <div className="text-black flex flex-col gap-0.5 h-full">
                        <span className="uppercase font-semibold text-base">
                          Student Coordinator
                        </span>
                        <span className="font-medium text-base mt-[-5px] leading-[19px]">
                          {currentEvent?.studentOrganizer || "TBA"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Markdown
                remarkPlugins={[remarkGfm]}
                className={"bg-[#9648ff1c] rounded-3xl border border-purpleAccent/50 w-full py-6 px-5 flex flex-col gap-5 text-xl select-none"}
              >
                {currentEvent?.eventDescription || ""}
              </Markdown>
            </ModalBody>
          </ModalContent>
        </Modal>
      }
      <Modal
        size={'lg'}
        isOpen={isOpen}
        scrollBehavior="outside"
        onClose={isEventSubmitting ? () => {} : () => {onClose(); setGeneralInstructionsRead(() => false)}}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-2xl">
            {(generalInstructionsRead) ?
              "Registration"
            :
              "General Instruction"
            }
          </ModalHeader>
          <form
            onSubmit={registerNow}
            className="select-none"
          >
            <ModalBody>
              {(generalInstructionsRead) ?
                <div
                  className='flex flex-col gap-2'
                >
                  <Input
                    type="text"
                    size="lg"
                    isRequired={true}
                    variant={"bordered"}
                    name={`Participant Name`}
                    label={`Participant Name`}
                    disabled={true}
                    value={fireUserDoc?.name || ''}
                  />
                  <Input
                    type="text"
                    size="lg"
                    isRequired={true}
                    variant={"bordered"}
                    name={`Department`}
                    label={`Department`}
                    disabled={true}
                    value={currentDepartment?.name?.toUpperCase() || ''}
                  />
                  <ul
                    className='flex flex-col gap-1'
                  >
                    <li className="text-[#F31260] text-sm px-1">
                      I confirm, I have read and understood all instructions and consent to register.
                    </li>
                  </ul>
                  <Input
                    type="text"
                    size="md"
                    isRequired={true}
                    variant={"bordered"}
                    name={`Decleration`}
                    label={`Decleration`}
                    pattern={"REGISTER"}
                    errorMessage={`type REGISTER and click the register button`}
                    placeholder={`type REGISTER and click the register button`}
                  />
                </div>
              :
                <>
                  <ul>
                    {GeneralInstruction.map((instr, idx) =>
                      <li
                        key={idx}
                        className='text-black'
                      >
                        {instr}
                      </li>
                    )}
                  </ul>
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
                  {/* <div
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
                  </div> */}
                </>
              }
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isEventSubmitting}
                type={generalInstructionsRead ? 'submit' : 'button'}
                onPress={generalInstructionsRead ? () => {} : () => {
                  if ((fireUserData == null) && (LoginGoogle != null)) {
                    return LoginGoogle(false);
                  };
                  setGeneralInstructionsRead(() => true)
                }}
                className='bg-purpleAccent text-white font-medium text-lg mb-4'
              >
                Register Now
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <CrossVelocity>
        REGISTER NOW
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </div>
  )
}