'use client';
import React from "react";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useFirebase } from "@/contexts/firebase";
import { UserProfile } from "@/components/internal/userProfile";
import UserRegistration from "@/components/internal/userRegistration";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { BadgeCheck, Building2, CalendarDays, CircleDashed, Clock8, FileText, Navigation } from "lucide-react";
import FeedbackFormModal from "@/components/internal/feedbackModal";

export default function Profile() {
  const firebaseContext = useFirebase();
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const userFeedback = firebaseContext?.userFeedback;
  const eventsObject = firebaseContext?.eventsObject || {};
  const fireCustomClaims = firebaseContext?.fireCustomClaims;
  const eventPayments: EventUserPayments = firebaseContext?.eventPayments || {} as EventUserPayments;

  const [userUpdate, setUserUpdate] = React.useState(false)
  const [easterFeedback, setEasterFeedback] = React.useState(0)
  const [currentEvent, setCurrentEvent] = React.useState<string | null>(null)

  const checkedInEvents = React.useMemo(() => Object.entries(eventPayments?.events || {}).filter(events => events[1].checkedInStatus), [eventPayments?.events])
  const paidDepartments = React.useMemo(() => Object.entries(eventPayments?.mitilence || {}), [eventPayments?.mitilence])

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (fireUserDoc == null) {
        window.location.replace('/');
      }
    }, 6000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [fireUserDoc]);
  
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 w-full pt-28 lg:pt-22 py-8 min-h-[100vh]"
    >
      <div
        className="flex flex-col gap-4 w-[90%] lg:w-[42em]"
      >
        <UserProfile
          fireUserDoc={fireUserDoc}
          setUserUpdate={setUserUpdate}
          paidDepartments={paidDepartments}
          fireCustomClaims={fireCustomClaims}
          callback={() => setEasterFeedback((i) => i+1)}
        />
        <span
          className="flex flex-row justify-between items-center gap-4 bg-white rounded-2xl px-8 py-4 text-xl font-medium"
        >
          Checked In Events: {checkedInEvents.length}
          {/* {(paidEvents.length > 0) ?
            <ChevronDown size=.filter(events => events[1].checkedInStatus){30} />
          :
            <Link
              href={'/events'}
              className="flex flex-row gap-1 items-center justify-center px-5 py-1.5 bg-purpleAccent rounded-xl text-white shadow-sm shadow-purple-400 drop-shadow-sm hover:-translate-y-0.5 transition-transform"
            >
              Register Now
              <ArrowUpRight />
            </Link>
          } */}
        </span>
        {(checkedInEvents.length > 0) &&
          <div
            className="flex flex-col sm:grid grid-cols-2 gap-4 bg-white text-white rounded-2xl px-6 py-8"
          >
            {checkedInEvents.map(registerEve => 
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
                      className="text-xl font-medium capitalize"
                    >
                      {eventsObject[registerEve[0]]?.name || registerEve[0]}
                    </span>
                    <span
                      className="text-base font-normal uppercase"
                    >
                      {eventsObject[registerEve[0]]?.departmentId}
                    </span>
                    <Popover placement="top" showArrow>
                      <PopoverTrigger>
                        <Button
                          size="sm"
                          color={"success"}
                          startContent={<BadgeCheck />}
                          className="text-sm font-medium w-fit !px-4 !py-2 capitalize"
                        >
                          Checked In
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="text-base font-medium px-4 py-2">
                        You have checked in for the Event
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button
                    isIconOnly
                    onPress={eventsObject[registerEve[0]]?.name ? () => setCurrentEvent(registerEve[0]) : () => {}}
                    className="bg-white/5 text-white border border-white/20"
                  >
                    <FileText size={20} />
                  </Button>
                </div>
                {(eventsObject[registerEve[0]]?.logoUrl) &&
                  <Image
                    src={eventsObject[registerEve[0]]?.logoUrl}
                  />
                }
              </div>
            )}
          </div>
        }
      </div>
      {(currentEvent != null) &&
        <Modal
          size={'lg'}
          placement="center"
          scrollBehavior="outside"
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
                      className="text-base font-medium w-fit !px-4 !py-2 capitalize"
                    >
                      {(eventPayments.events[currentEvent]?.checkedInStatus) ? 'Checked In' : 'Not Checked In'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="text-base font-medium px-4 py-2">
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
      {(userFeedback == null) &&
        <FeedbackFormModal
          formOpened={easterFeedback >= 3}
          setFormClose={() => setEasterFeedback(0)}
        />
      }
      {(userUpdate && !(paidDepartments.filter(mitilence => (mitilence[1]?.paymentStatus == true)).length > 0)) &&
        <UserRegistration
          update={true}
        />
      }
    </div>
  )
}