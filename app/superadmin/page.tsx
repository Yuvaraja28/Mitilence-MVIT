'use client';
import React from "react";
import { useFirebase } from "@/contexts/firebase";
import AllParticipants from "../../components/internal/allParticipants";
import EventParticipants from "../../components/internal/eventParticipants";
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
  const departments = firebaseContext?.departments || [];
  const fireCustomClaims = firebaseContext?.fireCustomClaims;

  const [currentTab, setCurrentTab] = React.useState('All Participants')
  const [popupUser, setPopupUser] = React.useState<PopUserProps | null>()
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);
  const [currentDepartment, setCurrentDepartment] = React.useState<Department>();
    
  if ((fireUserDoc == null) || (fireUserData == null)) {
    return (
      <div
        className="flex flex-col items-center gap-6 w-full px-6 lg:px-16 pt-28 lg:pt-22 py-8 min-h-[100vh] text-white"
      >
        <CircularLoader />
      </div>
    )
  }

  if (!fireCustomClaims?.roles?.includes("admin")) {
    return window.location.replace('/profile')
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
          Superadmin Dashboard
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
      <Tabs
        size="lg"
        aria-label="Options"
        color="primary"
        variant="bordered"
        selectedKey={currentDepartment?.id}
        defaultSelectedKey={currentDepartment?.id}
        shouldSelectOnPressUp={false}
        onSelectionChange={(index) => {
          const selectedDepartment = departments.find(dep => dep.id === index);
          setCurrentDepartment(() => selectedDepartment);
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
      {(currentTab == 'All Participants') ?
        <AllParticipants
          setPopupUser={setPopupUser}
          currentDepartment={currentDepartment?.id || null}
        />
      :
        <EventParticipants
          setPopupUser={setPopupUser}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      }
      {(popupUser != null) &&
        <Modal
          size={'2xl'}
          isOpen={true}
          scrollBehavior="outside"
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
