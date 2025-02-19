'use client';
import './styles.css';
import React from "react";
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import { Input } from '@heroui/input';
import { Image } from "@heroui/image";
import NotFound from "@/app/not-found";
import { Button } from "@heroui/button";
import { useFirebase } from '@/contexts/firebase';
import Footer from "@/components/internal/footer";
import { getOrganizer } from '@/Firestore/organizers';
import { BlurFade } from '@/components/magicui/blur-fade';
import { GoogleMap } from "@/components/internal/googleMap";
import HeaderSection from "@/components/internal/headerSection";
import CrossVelocity from "@/components/internal/crossVelocity";
import { CircularLoader } from "@/components/internal/Loaders";
import { EventsFallbackImg, TechnicalEventsImg } from '@/variables';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { BadgeCheck, Building2, CalendarDays, ContactRound, Link2, Share2, UsersRound } from "lucide-react";
import confettiPopUp from '@/animations/confetti';
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("react-markdown"), { ssr: false });


const GeneralInstruction = [
  'Engineering students only allowed to participate in the symposium',
  'Spot registration is allowed except paper presentation',
  'College ID card essential for participation',
  'Lunch & Participation certificates are provided for registered participants',
  'Students are advised to maintain the formal dress code'
];

export default function Event({ params }: { params: Promise<{ event: string }> }) {
  const firebaseContext = useFirebase();
  const LoginGoogle = firebaseContext?.LoginGoogle;
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;
  const eventsObject = firebaseContext?.eventsObject || {};
  const registeredEventsSet = firebaseContext?.registeredEventsSet || new Set();
  const [studentOrganizer, setStudentOrganizer] = React.useState<EventOrganizer | null>(null);
  const [facultyOrganizer, setFacultyOrganizer] = React.useState<EventOrganizer | null>(null);
  
  const event = React.use(params).event
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [generalInstructionsRead, setGeneralInstructionsRead] = React.useState(false);

  if ((Object.keys(eventsObject).length != 0) && (eventsObject[event] == null)) {
    return <NotFound />
  }

  const eventData = eventsObject[event]

  async function registerNow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    fetch("/api/eventRegister", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${fireUserData?.accessToken}`
      },
      body: JSON.stringify({
        eventId: eventData.id
      })
    })
      .then(() => {
        onClose()
        confettiPopUp()
      })
  }

  React.useEffect(() => {
    if (eventData?.facultyOrganizerId) {
      getOrganizer(eventData.facultyOrganizerId)
        .then(data => setFacultyOrganizer(data))
        .catch(() => {})
    }
    if (eventData?.studentOrganizerId && typeof eventData.studentOrganizerId === 'string') {
      getOrganizer(eventData.studentOrganizerId)
        .then(data => setStudentOrganizer(data))
        .catch(() => {})
    }
  }, [eventData])

  return (
    <div
      className="flex flex-col items-center text-white w-full"
    >
      <HeaderSection
        bannerName={eventData?.name || ''}
        bannerImg={TechnicalEventsImg}
      />
      {(eventData == null) ?
        <div
          className="h-[62vh]"
        >
          <CircularLoader />
        </div>
      :
        <div
          className="flex flex-col items-center gap-8 lg:mt-[-6vh] px-6 md:px-10 pb-20 w-full lg:w-[62.5em]"
        >
          <div
            className='flex flex-col gap-5'
          >
            <div
              className="flex flex-col items-center xmd:items-start h-full xmd:flex-row gap-3"
            >
              <BlurFade
                inView
                delay={1 * 0.05}
                className='flex-[1.3]'
              >
                <Image
                  fallbackSrc={EventsFallbackImg}
                  src={eventData?.logoUrl || EventsFallbackImg}
                  className="h-[80vw] sm:h-[60vw] xmd:h-full w-full object-cover rounded-[20px] border border-gray-800"
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
                      target='_blank'
                      className='bg-[#25D366] rounded-[8px] text-white p-1.5'
                      href={`https://api.whatsapp.com/send/?text=Check%20out%20this%20great%20event%20happening%20in%20MVIT:%0A${window.location.href}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                    </Link>
                    <Button
                      size='sm'
                      isIconOnly
                      className='bg-white/5'
                      onPress={() => navigator?.clipboard.writeText(window.location.href)}
                    >
                      <Link2 color='#FFFFFF' size={20} />
                    </Button>
                  </PopoverContent>
                </Popover>
              </BlurFade>
              <div
                className="flex-1 w-full bg-[#9648ff1c] border-1.5 border-purpleAccent/50 pt-5 pb-7 px-5 rounded-3xl shadow-xl flex flex-col gap-4"
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
                    className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-1.5 px-6 gap-3.5 w-full"
                  >
                    <UsersRound color="#000000" size={25} />
                    <div
                      className="text-black flex flex-col gap-0.5"
                    >
                      <span
                        className="uppercase font-semibold text-md"
                      >
                        Participants
                      </span>
                      <span
                        className="font-medium text-md mt-[-5px]"
                      >
                        {eventData?.teamSize} Members
                      </span>
                    </div>
                  </div>
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
                          {facultyOrganizer?.name}
                        </span>
                      </div>
                    </div>
                    <div
                      className="bg-[#ebe4ff] rounded-full flex flex-row items-center py-1 lg:py-1.5 px-6 gap-3.5"
                    >
                      <ContactRound color="#000000" size={25} />
                      <div
                        className="text-black flex flex-col gap-1"
                      >
                        <span
                          className="uppercase font-semibold text-md leading-tight"
                        >
                          Coordinator
                        </span>
                        <span
                          className="font-medium text-md mt-[-5px] uppercase"
                        >
                          {studentOrganizer?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  {registeredEventsSet.has(eventData.id) ?
                    <span
                      className="flex items-center justify-center gap-2 bg-[#17C964] select-none text-black text-xl font-medium rounded-full uppercase h-[3.2rem]"
                    >
                      Registered <BadgeCheck />
                    </span>
                  :
                    <Button
                      onPress={onOpen}
                      disabled={registeredEventsSet.has(eventData.id)}
                      className="bg-purpleAccent text-white text-xl font-medium rounded-full uppercase h-[3.2rem]"
                    >
                      Register Now
                    </Button>
                  }
                </div>
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
          <Modal isOpen={isOpen} size={'lg'} onClose={() => {onClose(); setGeneralInstructionsRead(() => false)}}>
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
              >
                <ModalBody>
                  {(generalInstructionsRead) ?
                    <div
                      className='flex flex-col gap-2'
                    >
                      <Input
                        type="email"
                        size="lg"
                        required
                        variant={"bordered"}
                        name={`Participant Name`}
                        label={`Participant Name`}
                        disabled={true}
                        value={fireUserDoc?.name || ''}
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
                        required
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
                  {(eventData?.linkRegistration != null) ?
                    <Link
                      target='_blank'
                      href={eventData.linkRegistration}
                      className='bg-purpleAccent text-white font-medium text-lg mb-4 px-4 py-1.5 rounded-xl'
                    >
                      Register Now
                    </Link>
                  :
                    <Button
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
                  }
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </div>
      }
      <CrossVelocity>
        REGISTER NOW
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </div>
  )
}