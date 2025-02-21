'use client';
import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useFirebase } from "@/contexts/firebase";
import { Search, VerifiedIcon } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";
import { CircularLoader } from "@/components/internal/Loaders";
import { UserProfile } from "@/components/internal/userProfile";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";

interface SearchedEventUser {
  user: EventUser;
  payments: EventUserPayments
}

const Fields = [
  { name: "Phone No", param: "phoneNo", type: "tel" },
  { name: "Enroll No", param: "enrollNo", type: "text" },
  { name: "College", param: "college", type: "text" },
  { name: "Department", param: "department", type: "text" },
  { name: "Graduation Year", param: "gradYear", type: "number" },
  { name: "Gender", param: "gender", type: "select" },
];

export default function Organizers() {
  const firebaseContext = useFirebase();
  const LogoutGoogle = firebaseContext?.LogoutGoogle;
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;
  const fireCustomClaims = firebaseContext?.fireCustomClaims;

  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  const [currentSearch, setCurrentSearch] = React.useState('');
  const [isMakingPayment, setIsMakingPayment] = React.useState(false);
  const [isEventSubmitting, setIsEventSubmitting] = React.useState(false);
  const [userData, setUserData] = React.useState<SearchedEventUser | null>(null);

  const paidDepartments = React.useMemo(() => Object.entries(userData?.payments?.mitilence || {}), [userData])

  async function searchUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUserData(() => null);
    setIsEventSubmitting(() => true);
    try {
      const userResp = await fetch("/api/getUserEmail", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${fireUserData?.accessToken}`
        },
        body: JSON.stringify({
          emailId: currentSearch
        })
      })
      const userData = await userResp.json();
      if ((userResp.status == 401) && (LogoutGoogle != null)) {
        return LogoutGoogle();
      } else if (userResp.status != 200) {
        return addToast({
          title: "Warn!",
          description: userData?.error || ':<',
          color: "warning"
        })
      }
      setUserData(userData as SearchedEventUser)
    } catch (e) {
      addToast({
        title: "Error Occured!",
        description: "An unknown error occured",
        color: "danger"
      })
    } finally {
      setIsEventSubmitting(() => false)
    }
  }

  async function processPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setIsMakingPayment(() => true);
    try {
      const userResp = await fetch("/api/confirmPayment", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${fireUserData?.accessToken}`
        },
        body: JSON.stringify({
          userId: userData?.user.id,
          participantType: data.participantType
        })
      })
      const userResponseData = await userResp.json();
      if ((userResp.status == 401) && (LogoutGoogle != null)) {
        return LogoutGoogle();
      } else if (userResp.status != 200) {
        return addToast({
          title: "Warn!",
          description: userResponseData?.error || ':<',
          color: "warning"
        })
      }
      setUserData(userResponseData as SearchedEventUser)
    } catch (e) {
      addToast({
        title: "Error Occured!",
        description: "An unknown error occured",
        color: "danger"
      })
      console.log(e)
    } finally {
      onClose()
      setIsMakingPayment(() => false)
    }
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
      className="flex flex-col gap-6 w-full px-6 lg:px-16 pt-28 lg:pt-22 py-8 min-h-[100vh] text-white"
    >
      <div
        className="flex flex-col items-center md:flex-row justify-between gap-3 w-full"
      >
        <span
          className="flex flex-row gap-2 items-center text-2xl capitalize font-semibold"
        >
          Payment Desk 
          <span
            className="bg-purpleAccent px-2 py-1 rounded-xl text-xl"
          >
            {fireCustomClaims?.departmentId?.toUpperCase()}
          </span>
        </span>
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
      <div
        className="flex flex-col gap-3"
      >
        <div
          className="flex flex-col lg:flex-row items-start gap-3"
        >
          <form
            onSubmit={searchUser}
            className="bg-white rounded-3xl overflow-auto w-full md:w-[35em] flex flex-row items-center gap-2 px-1 lg:px-2"
          >
            <input
              required
              type="email"
              placeholder="Enter Email Id"
              onChange={(e) => setCurrentSearch(e.target.value)}
              className="w-full outline-none border-none px-4 font-medium text-lg text-black py-3"
            />
            <Button
              type="submit"
              isLoading={isEventSubmitting}
              className="bg-purpleAccent text-white w-2 rounded-3xl"
            >
              <Search />
            </Button>
          </form>
          {(userData != null) &&
            <Button
              size="lg"
              onPress={onOpen}
              startContent={<VerifiedIcon />}
              isDisabled={(userData?.payments?.mitilence[fireCustomClaims?.departmentId || ''] != null)}
              className="bg-blue-500 text-white text-lg font-medium rounded-3xl uppercase"
            >
              Make Payment
            </Button>
          }
        </div>
        {(userData != null) &&
          <UserProfile
            fireUserDoc={userData?.user}
            paidDepartments={paidDepartments}
            onlyShowData={true}
            classNames="w-full md:w-[45em] shadow-md shadow-gray-500"
          />
        }
      </div>
      <Modal
        size={'md'}
        isOpen={isOpen}
        onOpenChange={isMakingPayment ? () => {} : onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-2xl">
            Confirm Payment
          </ModalHeader>
          <form
            onSubmit={processPayment}
          >
            <ModalBody>
              <div
                className='flex flex-col gap-2 text-lg'
              >
                <span
                  className=''
                >
                  Do you want to confirm payment for this Participant under <b className="text-purpleAccent">{fireCustomClaims?.departmentId?.toUpperCase()}</b> Department?
                </span>
                <Input
                  type="email"
                  size="lg"
                  isRequired={true}
                  variant={"bordered"}
                  name={`Participant Name`}
                  label={`Participant Name`}
                  disabled={true}
                  value={userData?.user.name || ''}
                />
                <Input
                  type="text"
                  size="lg"
                  isRequired={true}
                  variant={"bordered"}
                  name={`Enroll No`}
                  label={`Enroll No`}
                  disabled={true}
                  value={userData?.user.enrollNo || ''}
                />
                <Select
                  size="md"
                  radius="lg"
                  isRequired={true}
                  variant={"bordered"}
                  label="Participant Type"
                  placeholder="Select the Participant Type"
                  name="participantType"
                  className="w-full mt-1 text-black"
                  errorMessage="You must select Participant Type"
                  validate={(value) =>
                    value != "" || "You must select the Participant Type"
                  }
                >
                  {["External", "Internal"].map((type) => (
                    <SelectItem
                      key={type}
                      className="capitalize"
                      value={type}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </Select>
                <ul
                  className='flex flex-col gap-1'
                >
                  <li className="text-blue-500 text-sm px-1">
                    I hereby "CONFIRM" that I have collected the registration amount on my own behalf ({fireUserDoc?.name}).
                  </li>
                </ul>
                <Input
                  type="text"
                  size="md"
                  isRequired={true}
                  variant={"bordered"}
                  name={`Confirmation`}
                  label={`Confirmation`}
                  pattern={"CONFIRM"}
                  errorMessage={`type CONFIRM and click the confirm payment button`}
                  placeholder={`type CONFIRM and click the confirm payment button`}
                />
              </div>
            </ModalBody>
            <ModalFooter
              className="flex flex-col gap-2"
            >
              <Button
                onPress={isMakingPayment ? () => {} : onClose}
                isLoading={isEventSubmitting}
                className='border-2 bg-white border-purpleAccent text-purpleAccent font-medium text-lg'
              >
                Go Back
              </Button>
              <Button
                type="submit"
                isLoading={isMakingPayment}
                className='bg-purpleAccent text-white font-medium text-lg mb-4'
              >
                Confirm Payment
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}