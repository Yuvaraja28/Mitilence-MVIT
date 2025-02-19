'use client';
import React from "react";
import { Search, VerifiedIcon } from "lucide-react";
import { Button } from "@heroui/button";
import { useFirebase } from "@/contexts/firebase";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Input } from "@heroui/input";
import { DefaultMemberImg } from "@/variables";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { parseDateTime } from "@/utils/parseDate";
import { CircularLoader } from "@/components/internal/Loaders";

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

  const [respError, setRespError] = React.useState('');
  const [currentSearch, setCurrentSearch] = React.useState('');
  const [isMakingPayment, setIsMakingPayment] = React.useState(false);
  const [isEventSubmitting, setIsEventSubmitting] = React.useState(false);
  const [userData, setUserData] = React.useState<SearchedEventUser | null>(null);

  const paidDepartments = React.useMemo(() => Object.entries(userData?.payments?.mitilence || {}), [userData])

  async function searchUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRespError(() => '')
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
        return setRespError(() => userData?.error)
      }
      setUserData(userData as SearchedEventUser)
    } catch (e) {
      setRespError(() => "An unknown error occured")
      console.log(e)
    } finally {
      setIsEventSubmitting(() => false)
    }
  }

  async function processPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRespError(() => '')
    setIsMakingPayment(() => true);
    try {
      const userResp = await fetch("/api/confirmPayment", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${fireUserData?.accessToken}`
        },
        body: JSON.stringify({
          userId: userData?.user.id
        })
      })
      const userResponseData = await userResp.json();
      if ((userResp.status == 401) && (LogoutGoogle != null)) {
        return LogoutGoogle();
      } else if (userResp.status != 200) {
        return setRespError(() => userResponseData?.error)
      }
      setUserData(userResponseData as SearchedEventUser)
    } catch (e) {
      setRespError(() => "An unknown error occured")
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
          className="flex flex-row gap-2 items-center text-3xl capitalize font-semibold"
        >
          Payment Desk 
          <span
            className="bg-purpleAccent px-2 py-1 rounded-xl text-2xl"
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
          {((userData != null) && (respError == "")) &&
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
        {(respError != '') &&
          <span
            className="text-red-500 text-xl font-medium px-2"
          >
            {respError}
          </span>
        }
        {((userData != null) && (respError == '')) &&
          <div
            className="flex flex-col gap-3 bg-white text-black rounded-2xl p-6 w-full md:w-[45em] shadow-md shadow-gray-500"
          >
            <div
              className="flex md:flex-row gap-2.5 items-center justify-between flex-col-reverse"
            >
              <div
                className="flex flex-col items-center md:items-start h-full"
              >
                <span
                  className="text-4xl font-medium text-center md:text-start"
                >
                  {userData?.user?.name}
                </span>
                <span
                  className="text-[18px] text-center md:text-start"
                >
                  {userData?.user?.emailId}
                </span>
              </div>
              <Image
                width={100}
                height={100}
                src={userData?.user?.imageUrl || DefaultMemberImg}
                classNames={{
                  wrapper: 'bg-contain bg-no-repeat'
                }}
                fallbackSrc={DefaultMemberImg}
                className="object-cover bg-contain"
              />
            </div>
            {(paidDepartments.length > 0) &&
              <div
                className="flex flex-col gap-1 px-1 mt-[-5px] lg:mt-[-15px]"
              >
                <span
                  className="text-xl font-semibold uppercase"
                >
                  Paid Departments
                </span>
                <div
                  className="flex flex-row flex-wrap gap-2"
                >
                  {paidDepartments.map(mitilence =>
                    <Popover
                      showArrow
                      placement="top"
                      key={mitilence[0]}
                    >
                      <PopoverTrigger>
                        <Button
                          size="sm"
                          className="text-lg bg-purpleAccent text-white font-medium w-fit !px-1 !py-2 uppercase"
                        >
                          {mitilence[0]}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="text-md font-medium px-4 py-2">
                        <div
                          className="flex flex-col items-center"
                        >
                          <span>
                            Paid for {mitilence[0].toUpperCase()} department event
                          </span>
                          <span>
                            {parseDateTime(mitilence[1].paymentTime)}
                          </span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </div>
            }
            <div
              className="grid md:grid-cols-2 gap-4"
            >
              {Fields.map(field =>
                <Input
                size="lg"
                  key={field.param}
                  label={field.name}
                  disabled={true}
                  labelPlacement={"outside"}
                  placeholder={field.name}
                  className="font-medium border-2 border-gray-300 rounded-2xl"
                  value={(typeof fireUserDoc == 'object') ? String(userData?.user?.[field.param as keyof EventUser] || '') : ''}
                />
              )}
            </div>
          </div>
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
                  required
                  variant={"bordered"}
                  name={`Participant Name`}
                  label={`Participant Name`}
                  disabled={true}
                  value={userData?.user.name || ''}
                />
                <Input
                  type="text"
                  size="lg"
                  required
                  variant={"bordered"}
                  name={`Enroll No`}
                  label={`Enroll No`}
                  disabled={true}
                  value={userData?.user.enrollNo || ''}
                />
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
                  required
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