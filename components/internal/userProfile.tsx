import Link from "next/link";
import QRCode from "react-qr-code";
import { Input } from "@heroui/input";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { DefaultMemberImg } from "@/variables";
import { parseDateTime } from "@/utils/parseDate";
import { CustomClaims } from "@/contexts/firebase";
import { QrCodeIcon, UserRoundPen } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/modal";

interface ProfileProps {
  fireUserDoc: EventUser | null | undefined;
  paidDepartments: [string, MitilencePaymentDepartment][];
  fireCustomClaims?: CustomClaims | null | undefined;
  setUserUpdate?: (param: boolean) => void;
  onlyShowData?: boolean;
  classNames?: string;
}

export function UserProfile({ fireUserDoc, paidDepartments, setUserUpdate = (_: boolean) => {}, fireCustomClaims = null, onlyShowData = false, classNames = "" }: ProfileProps) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const Fields = [
    { name: "Phone No", param: "phoneNo", type: "tel", value: fireUserDoc?.phoneNo },
    { name: "Enroll No", param: "enrollNo", type: "text" },
    { name: "College", param: "college", type: "text" },
    { name: "Department", param: "department", type: "text" },
    { name: "Graduation Year", param: "gradYear", type: "number" },
    { name: "Gender", param: "gender", type: "select" },
    { name: "Account Creation", param: "createdTime", type: "date" },
    { name: "Last Updated", param: "updatedTime", type: "date" },
  ];

  return (
    <div
      className={`flex flex-col gap-4 bg-white text-black rounded-2xl p-6 ${classNames}`}
    >
      {((!onlyShowData) && (fireCustomClaims != null)) &&
        <div
          className="flex flex-row gap-1.5 flex-wrap self-end"
        >
          {fireCustomClaims?.roles?.map(role =>
            <Link
              key={role}
              href={`/${role}`}
              className="flex flex-row gap-2 text-base font-medium bg-orange-500 text-white px-5 py-2 rounded-[10px] capitalize"
            >
              {role}
            </Link>
          )}
          <Button
            color="primary"
            onPress={() => setUserUpdate(true)}
            startContent={<UserRoundPen size={20} />}
            isDisabled={(paidDepartments?.length || 0) > 0}
            className="flex flex-row gap-2 text-base font-medium bg-blue-500 text-white px-4 py-1.5 rounded-[10px]"
          >
            Update
          </Button>
        </div>
      }
      <div
        className="flex md:flex-row gap-2.5 items-center justify-between flex-col-reverse"
      >
        <div
          className="flex flex-col items-center md:items-start h-full"
        >
          <span
            className="text-4xl font-medium text-center md:text-start"
          >
            {fireUserDoc?.name}
          </span>
          <span
            className="text-[18px] text-center md:text-start"
          >
            {fireUserDoc?.emailId}
          </span>
        </div>
        <div
          className="flex flex-col items-center gap-2.5"
        >
          <Image
            width={100}
            height={100}
            src={fireUserDoc?.imageUrl || DefaultMemberImg}
            classNames={{
              wrapper: 'bg-contain bg-no-repeat'
            }}
            fallbackSrc={DefaultMemberImg}
            className="object-cover bg-contain"
          />
          <Button
            onPress={onOpen}
            startContent={<QrCodeIcon size={20} color="#FFFFFF" />}
            className="z-30 bg-boxBlack text-white border border-white/20 px-3 w-fit"
          >
            QR Code      
          </Button>
        </div>
      </div>
      {(paidDepartments.filter(mitilence => (mitilence[1]?.paymentStatus == true)).length > 0) &&
        <div
          className="flex flex-col gap-2 px-1 mt-[-5px] lg:mt-[-15px]"
        >
          <span
            className="text-xl font-semibold uppercase"
          >
            Paid Departments
          </span>
          <div
            className="flex flex-row flex-wrap gap-2"
          >
            {paidDepartments.filter(mitilence => (mitilence[1]?.paymentStatus == true)).map(mitilence =>
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
                <PopoverContent className="text-base font-medium px-4 py-2">
                  <div
                    className="flex flex-col items-center"
                  >
                    <span>
                      Paid for <b className="text-purpleAccent">{mitilence[0].toUpperCase()}</b> department event
                    </span>
                    <span>
                      {parseDateTime(mitilence[1].paymentTime)}
                    </span>
                    <span>
                      <b className="text-purpleAccent font-medium">
                        {mitilence[1].participantType}
                      </b> Participant
                    </span>
                    <span>
                      Verified by <b className="text-purpleAccent font-medium">
                        {mitilence[1].paymentVerifiedByName}
                      </b>
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
            key={field.param}
            label={field.name}
            disabled={true}
            labelPlacement={"outside"}
            placeholder={field.name}
            size="lg"
            className="font-medium border-2 border-gray-300 rounded-2xl"
            value={(typeof fireUserDoc == 'object') ? String(fireUserDoc?.[field.param as keyof EventUser] || '') : ''}
            {...(field.type == 'date') && {
              value: (fireUserDoc?.[field.param as keyof EventUser] == null) ? "Not Updated" : parseDateTime(String(fireUserDoc?.[field.param as keyof EventUser]))
            }}
          />
        )}
      </div>
      {(fireUserDoc?.id != null) &&
        <Modal
          size={'sm'}
          isOpen={isOpen}
          onClose={onClose}
          placement="center"
          scrollBehavior="outside"
        >
          <ModalContent>
            <ModalBody
              className="flex flex-col justify-center items-center gap-6 py-12"
            >
              <QRCode value={fireUserDoc.id} />
              <div
                className="flex flex-col items-center"
              >
                <span
                  className="text-2xl font-semibold text-center text-purpleAccent"
                >
                  {fireUserDoc.name}
                </span>
                <span
                  className="text-lg font-medium text-center text-blue-500"
                >
                  {fireUserDoc.emailId}
                </span>
                <span
                  className="text-lg font-medium text-center text-lime-600"
                >
                  {fireUserDoc.phoneNo}
                </span>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      }
    </div>
  )
}