'use client';
import React from "react";
import { useFirebase } from "@/contexts/firebase";
import EventParticipants from "../admin/eventParticipants";
import { CircularLoader } from "@/components/internal/Loaders";
import { UserProfile } from "@/components/internal/userProfile";
import { Tabs, Tab, Modal, ModalContent, ModalBody, Button, addToast } from "@heroui/react";
import { boundingBox, IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { QrCodeIcon } from "lucide-react";
import { getPayment } from "@/Firestore/payments";

export type PopUserProps = {
  user: EventUser;
  payment: EventUserPayments;
}

export default function OrganizerDashboard() {
  const firebaseContext = useFirebase();
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;
  const LogoutGoogle = firebaseContext?.LogoutGoogle;
  const eventsObject = firebaseContext?.eventsObject;
  const fireCustomClaims = firebaseContext?.fireCustomClaims;

  const [popupUser, setPopupUser] = React.useState<PopUserProps | null>()
  const [currentTab, setCurrentTab] = React.useState('Event Participants')
  const [currentEvent, setCurrentEvent] = React.useState<string | null>()
  const [scanPaused, setScanPaused] = React.useState(false)

  const onScanCallback = async (result: IDetectedBarcode[]) => {
    if (currentEvent == null) return;
    setScanPaused(() => true)
    console.log("Scanning...")
    const paymentData = await getPayment(result[0].rawValue);
    console.log(paymentData.mitilence?.[fireCustomClaims?.departmentId || ''])
    if (!(paymentData.mitilence?.[fireCustomClaims?.departmentId || '']?.paymentStatus || false)) {
      addToast({
        title: "Not Paid Amount",
        description: `Participant has not paid the ${fireCustomClaims?.departmentId?.toUpperCase()} Department Amount`,
        color: "warning"
      })
    } else if (paymentData.events?.[currentEvent]?.checkedInStatus) {
      addToast({
        title: "Duplicate Checkin",
        description: "Participant already Checked in for this Event",
        color: "danger"
      })
    } else {
      const checkinResp = await fetch("/api/checkedIn", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${fireUserData?.accessToken}`
        },
        body: JSON.stringify({
          eventId: currentEvent,
          userId: result[0].rawValue
        })
      })
      const checkinData = await checkinResp.json();
      if (checkinResp.status == 200) {
        addToast({
          title: "Successfully Checkedin",
          description: checkinData?.message || ':>',
          color: "success"
        })
      } else if ((checkinResp.status == 401) && (LogoutGoogle != null)) {
        LogoutGoogle();
      } else if (checkinResp.status != 200) {
        addToast({
          title: "Warn!",
          description: checkinData?.error || ':<',
          color: "warning"
        })
      }
    }
    setScanPaused(() => false)
  }

  if ((fireUserDoc == null) || (fireUserData == null)) {
    return (
      <div
        className="flex flex-col items-center gap-6 w-full px-6 lg:px-16 pt-28 lg:pt-22 py-8 min-h-[100vh] text-white"
      >
        <CircularLoader />
      </div>
    )
  }

  return (
    <div
      className="flex flex-col items-center gap-6 w-full px-6 lg:px-16 pt-28 lg:pt-22 py-8 min-h-[100vh]"
    >
      <div
        className="flex flex-col items-center md:flex-row justify-between gap-3 w-full text-white"
      >
        <span
          className="flex flex-row gap-2 items-center text-2xl capitalize font-semibold"
        >
          Organizer Dashboard
          <span
            className="bg-purpleAccent px-2 py-1 rounded-xl text-xl"
          >
            {fireCustomClaims?.departmentId?.toUpperCase()}
          </span>
        </span>
        <Tabs
          size="lg"
          aria-label="Options"
          color="primary"
          variant="bordered"
          selectedKey={currentTab}
          shouldSelectOnPressUp={false}
          onSelectionChange={(key) => setCurrentTab(String(key))}
          classNames={{
            tabList: "empty:hidden md:grid flex flex-col md:grid-cols-1 gap-1 p-1 border-1.5 border-purpleAccent rounded-2xl",
            cursor: "w-full bg-purpleAccent text-white font-medium text-xl outline-none border-none",
            tab: "px-5 py-1 outline-none border-none text-lg font-medium",
            tabContent: "group-data-[selected=true]:text-white text-white border-none",
          }}
        >
          {['Event Participants'].map((mode) => (
            <Tab
              key={mode}
              title={mode}
            />
          ))}
        </Tabs>
        <div
          className="flex flex-row gap-1 text-lg bg-white px-1 py-1 text-black rounded-2xl items-center font-medium"
        >
          <span
            className="px-4"
          >
            Logged in as
          </span>
          <span
            className="bg-green-500 text-lg px-4 py-1 rounded-2xl text-center"
          >
            {fireUserDoc?.name}
          </span>
        </div>
      </div>
      {(currentTab == 'Event Participants') &&
        <>
          <EventParticipants
            setPopupUser={setPopupUser}
            setCurrentEvent={setCurrentEvent}
          >
            <Button
              size="lg"
              type="submit"
              startContent={<QrCodeIcon size={20} color="#FFFFFF" />}
              className="z-30 bg-boxBlack text-white border border-white/20 w-full"
            >
              Scan Checkedin
            </Button>
          </EventParticipants>
          {(popupUser != null) &&
            <Modal
              size={'2xl'}
              isOpen={true}
              scrollBehavior="inside"
              onClose={() => setPopupUser(null)}
            >
              <ModalContent>
                <ModalBody>
                  <UserProfile
                    fireUserDoc={popupUser.user}
                    paidDepartments={Object.entries(popupUser?.payment?.mitilence || {})}
                    classNames="!px-2 !py-8"
                    onlyShowData={true}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          }
        </>
      }
      {(currentEvent != null) &&
        <Modal
          size={'md'}
          isOpen={true}
          placement="center"
          scrollBehavior="inside"
          onClose={() => setCurrentEvent(null)}
        >
          <ModalContent>
            <ModalBody
              className="flex flex-col justify-center items-center gap-2 py-12"
            >
              <Scanner
                components={{
                  audio: true,
                  onOff: true,
                  torch: true,
                  zoom: true,
                  finder: true,
                  tracker: boundingBox,
                }}
                allowMultiple={true}
                scanDelay={5000}
                onScan={scanPaused ? () => {} : onScanCallback}
                styles={{ container: { height: "400px", width: "350px" } }}
              />
              <div
                className="flex flex-col items-center gap-1"
              >
                <span
                  className="text-3xl font-semibold text-center text-purpleAccent"
                >
                  {eventsObject?.[currentEvent].name}
                </span>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      }
    </div>
  );
}
