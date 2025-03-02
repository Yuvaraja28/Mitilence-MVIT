"use client";
import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { doc, setDoc } from "firebase/firestore";
import { useFirebase } from "@/contexts/firebase";
import "@/components/styles/overideHerouiSelect.css";
import { Drawer, DrawerContent, Select, SelectItem } from "@heroui/react";

export default function UserRegistration({ update = false }) {
  const firebaseContext = useFirebase();
  const firestoreDB = firebaseContext?.firestoreDB
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireUserData = firebaseContext?.fireUserData;
  const LogoutGoogle = firebaseContext?.LogoutGoogle;

  const registrationFields = [
    { name: "Name", param: "name", type: "text", value: fireUserData?.displayName },
    { name: "Email Id", param: "emailId", type: "email", value: fireUserData?.email, default: true },
    { name: "Phone No", param: "phoneNo", type: "tel", value: fireUserData?.phoneNumber || fireUserDoc?.phoneNo },
    { name: "Enroll No", param: "enrollNo", type: "text", value: fireUserDoc?.enrollNo },
    { name: "College", param: "college", type: "text", value: fireUserDoc?.college },
    { name: "Department", param: "department", type: "text", value: fireUserDoc?.department },
    { name: "Graduation Year", param: "gradYear", type: "text", value: fireUserDoc?.gradYear },
    { name: "Gender", param: "gender", type: "select", value: fireUserDoc?.gender },
  ];

  const minYear = new Date().getFullYear();
  const maxYear = new Date().getFullYear() + 4;

  const registerUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    if (fireUserData) {
      const userId = fireUserData.uid;
      if (firestoreDB) {
        setDoc(doc(firestoreDB, "users", userId), {
          name: data.name,
          emailId: fireUserData.email,
          phoneNo: fireUserData?.phoneNumber || data.phoneNo,
          enrollNo: data.enrollNo,
          college: data.college,
          department: data.department,
          imageUrl: fireUserData?.photoURL,
          gradYear: +data.gradYear,
          gender: data.gender,
          createdTime: new Date(fireUserDoc?.createdTime || new Date()),
          ...(update && {
            updatedTime: new Date()
          })
        })
          .then(() => {
            console.log("User registered successfully");
            return window.location.href = '/profile'
          })
          .catch((error) => {
            console.error("Error registering user: ", error);
          });
      } else {
        console.error("Firestore database is not initialized");
      }
    } else {
      console.error("No authenticated user found");
    }
  }
 
  return (
    <Drawer
      isOpen={true}
      backdrop="blur"
      scrollBehavior="outside"
      closeButton={<span />}
      classNames={{
        base: "data-[placement=right]:sm:m-4 data-[placement=left]:sm:m-2 rounded-medium p-6",
      }}
    >
      <DrawerContent>
        <span
          className="text-2xl font-medium mb-3"
        >
          User {update ? 'Updation' : 'Registration'}
        </span>
        <form
          onSubmit={registerUser}
          className="flex flex-col gap-3"
        >
          {registrationFields.map((field) =>
            field?.type == "select" ? (
              <Select
                size="md"
                radius="lg"
                label="Gender"
                key={field.param}
                name={field.param}
                required={true}
                placeholder="Select your Gender"
                className="w-full mt-1 text-black"
                errorMessage="You must select your gender"
                defaultSelectedKeys={[field.value || "Male"]}
                validate={(value) =>
                  value != "" || "You must select your gender"
                }
              >
                {["Male", "Female"].map((gender) => (
                  <SelectItem
                    key={gender}
                    className="capitalize"
                    textValue={gender}
                  >
                    {gender}
                  </SelectItem>
                ))}
              </Select>
            ) : (
              <Input
                key={field.param}
                name={field.param}
                label={field.name}
                type={field.type}
                disabled={field?.default}
                labelPlacement={"outside"}
                placeholder={field.name}
                isRequired={true}
                className="font-medium"
                style={{
                  color: "black",
                }}
                defaultValue={field?.value ? String(field?.value) : ''}
                {...(field.type === "tel" && {
                  pattern: "\\d{10}",
                  errorMessage: "Please enter a 10 digit phone number",
                })}
                {...(field.param === "gradYear" && {
                  pattern: `^(${minYear}|${minYear + 1}|${minYear + 2}|${minYear + 3}|${minYear + 4}|${maxYear})$`,
                  errorMessage: `Please enter a year between ${minYear} and ${maxYear}`,
                })}
                />
            )
          )}
          <Button
            size="lg"
            type="submit"
            className="bg-purpleAccent text-white font-semibold text-lg w-full"
          >
            {update ? 
              'Update'
            :
              'Register'
            }
          </Button>
          {(!update) &&
            <Button
              size="lg"
              onPress={LogoutGoogle}
              className="border-2 border-purpleAccent bg-white text-purpleAccent font-semibold text-lg w-full"
            >
              Logout
            </Button>
          }
        </form>
      </DrawerContent>
    </Drawer>
  );
}
