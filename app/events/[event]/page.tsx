'use client';
import './styles.css';
import React from "react";
import NotFound from "@/app/not-found";
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import Markdown from 'react-markdown';
import { getUser } from '@/Firestore/users';
import { useFirebase } from '@/contexts/firebase';
import Footer from "@/components/internal/footer";
import { GoogleMap } from "@/components/internal/googleMap";
import { getDatabase, ref, update } from 'firebase/database';
import HeaderSection from "@/components/internal/headerSection";
import CrossVelocity from "@/components/internal/crossVelocity";
import { CircularLoader } from "@/components/internal/Loaders";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import TechnicalEventsImg from '@/assets/images/technical_events.png';
import { BadgeCheck, Building2, CalendarDays, ContactRound, Navigation, UsersRound } from "lucide-react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';

const GeneralInstruction = [
  'A valid college ID card is required for participation.',
  'Participants are expected to adhere to the formal dress code.',
  'Only engineering students are eligible to participate in the symposium.',
  'Spot registration is available for all events except paper presentations.',
  'Lunch and participation certificates will be provided to registered participants.',
];

export default function Event({ params }: { params: Promise<{ event: string }> }) {
  const firebaseContext = useFirebase();
  const fireApp = firebaseContext?.fireApp;
  const fireAuth = firebaseContext?.fireAuth;
  const fireUserData = firebaseContext?.fireUserData;
  const eventsObject = firebaseContext?.eventsObject || {};
  const registeredEventsSet = firebaseContext?.registeredEventsSet || new Set();
  
  const event = React.use(params).event
  const {isOpen, onOpen, onClose} = useDisclosure();

  if ((Object.keys(eventsObject).length != 0) && (eventsObject[event] == null)) {
    return <NotFound />
  }

  const eventData = eventsObject[event]

  async function registerNow() {
    onClose()
    if (fireUserData == null) {
      return LoginGoogle();
    };
    const updateRef = ref(getDatabase(fireApp), `/registeredEvents/${fireUserData.uid}/${eventData.id}`);
    update(updateRef, {
      eventId: eventData.id,
      teamMembers: [],
      registeredTime: new Date().toISOString()
    });
  }

  async function LoginGoogle() {
    if (fireAuth == null) return;
    try {
      const data = await signInWithPopup(fireAuth, new GoogleAuthProvider());
      getUser(data?.user.uid)
        .catch(() => {});
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div
      className="flex flex-col items-center text-white"
    >
      <HeaderSection
        bannerName={eventData?.name || ''}
        bannerImg={TechnicalEventsImg.src}
      />
      {(eventData == null) ?
        <div
          className="h-[60vh]"
        >
          <CircularLoader />
        </div>
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
          <Modal isOpen={isOpen} size={'lg'} onClose={onClose}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                General Instruction
              </ModalHeader>
              <ModalBody>
                <ul
                  className=''
                >
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
                    onPress={registerNow}
                    className='bg-purpleAccent text-white font-medium text-lg mb-4'
                  >
                    Register Now
                  </Button>
                }
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      }
      <CrossVelocity>
        Explore
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </div>
  )
}