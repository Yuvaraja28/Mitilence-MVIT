"use client";
import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { doc, setDoc } from "firebase/firestore";
import { useFirebase } from "@/contexts/firebase";
import { Drawer, DrawerContent, Select, SelectItem } from "@heroui/react";

export default function UserRegistration() {
  const firebaseContext = useFirebase();
  const firestoreDB = firebaseContext?.firestoreDB
  const fireUserData = firebaseContext?.fireUserData

  const registrationFields = [
    { name: "Name", param: "name", type: "text", value: fireUserData?.displayName },
    { name: "Email Id", param: "emailId", type: "email", value: fireUserData?.email },
    { name: "Phone No", param: "phoneNo", type: "tel", value: fireUserData?.phoneNumber },
    { name: "Enroll No", param: "enrollNo", type: "text" },
    { name: "College", param: "college", type: "text" },
    { name: "Department", param: "department", type: "text" },
    { name: "Year", param: "year", type: "number" },
    { name: "Gender", param: "gender", type: "select" },
  ];

  const registerUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    if (fireUserData) {
      const userId = fireUserData.uid;
      if (firestoreDB) {
        setDoc(doc(firestoreDB, "users", userId), {
          name: fireUserData.displayName,
          emailId: fireUserData.email,
          phoneNo: fireUserData?.phoneNumber || data.phoneNo,
          enrollNo: data.enrollNo,
          college: data.college,
          department: data.department,
          imageUrl: fireUserData?.photoURL,
          year: +data.year,
          gender: data.gender,
          createdTime: new Date()
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
      closeButton={<span />}
      classNames={{
        base: "data-[placement=right]:sm:m-4 data-[placement=left]:sm:m-2 rounded-medium p-6",
      }}
    >
      <DrawerContent>
        <span
          className="text-2xl font-medium mb-3"
        >
          User Registration
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
                value={"Male"}
                key={field.param}
                name={field.param}
                required={true}
                className="w-full mt-1 text-black"
                placeholder="Select your Gender"
                errorMessage="You must select your gender"
                validate={(value) =>
                  value != "" || "You must select your gender"
                }
              >
                {["Male", "Female"].map((gender) => (
                  <SelectItem
                    key={gender}
                    className="capitalize"
                    value={gender}
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
                disabled={field?.value != null}
                labelPlacement={"outside"}
                placeholder={field.name}
                required={true}
                className="font-medium"
                style={{
                  color: "black",
                }}
                {...((field?.value || '') && {
                  value: field?.value || ''                          
                })}
                {...(field.type === "tel" && {
                  pattern: "\\d{10}",
                  errorMessage: "Please enter a 10 digit phone number",
                })}
              />
            )
          )}
          <Button
            size="lg"
            type="submit"
            className="bg-purpleAccent text-white font-semibold text-lg w-full"
          >
            Register
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
