'use client';
import React from "react";
import AllParticipants from "./allParticipants";
import { useFirebase } from "@/contexts/firebase";
import EventParticipants from "./eventParticipants";
import { UserProfile } from "@/components/internal/userProfile";
import { Tabs, Tab, Modal, ModalContent, ModalBody } from "@heroui/react";
import { CircularLoader } from "@/components/internal/Loaders";

export type PopUserProps = {
  user: EventUser;
  payment: EventUserPayments;
}

export default function AdminDashboard() {
  const firebaseContext = useFirebase();
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;
  const fireCustomClaims = firebaseContext?.fireCustomClaims;

  const [currentTab, setCurrentTab] = React.useState('All Participants')
  const [popupUser, setPopupUser] = React.useState<PopUserProps | null>()
    
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
          Admin Dashboard
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
            tabList: "empty:hidden  md:grid flex flex-col md:grid-cols-2 gap-1 p-1 border-1.5 border-purpleAccent rounded-2xl",
            cursor: "w-full bg-purpleAccent text-white font-medium text-xl outline-none border-none",
            tab: "px-5 py-1 outline-none border-none text-lg font-medium",
            tabContent: "group-data-[selected=true]:text-white text-white border-none",
          }}
        >
          {['All Participants', 'Event Participants'].map((mode) => (
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
      {(currentTab == 'All Participants') ?
        <AllParticipants
          setPopupUser={setPopupUser}
        />
      :
        <EventParticipants
          setPopupUser={setPopupUser}
        />
      }
      {(popupUser != null) &&
        <Modal
          size={'2xl'}
          isOpen={true}
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
    </div>
  );
}
