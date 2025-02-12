'use client';
import React from "react";
// import { firestoreDB } from "@/lib/firebase";
// import { collection, getDocs } from "firebase/firestore";
import DeveloperImg from '@/assets/images/developer.png';
import StickyHeader from "@/components/internal/stickyHeader";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Alert, Select, SelectItem } from "@heroui/react";

const registrationFields = [
  { name: 'Name', param: 'name', type: 'text' },
  { name: 'Enroll No', param: 'enrollNo', type: 'text' },
  { name: 'Email Id', param: 'emailId', type: 'email' },
  { name: 'Phone No', param: 'phoneNo', type: 'tel' },
  { name: 'College', param: 'college', type: 'text' },
  { name: 'Department', param: 'department', type: 'text' },
  { name: 'Year', param: 'year', type: 'number' },
  { name: 'Gender', param: 'gender', type: 'select' }
];

export default function Login() {
  const [currentPage, setCurrentPage] = React.useState('login');
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const querySnapshot = await getDocs(collection(firestoreDB, 'users'));
  //     const users = querySnapshot.docs.map(doc => doc.data());
  //     console.log(users);
  //   };
  //   fetchData();
  // }, []);

  return (
    <React.Fragment>
      <StickyHeader />
      <div
        className="h-[91.5vh] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
        style={{
          backgroundImage: `url(${DeveloperImg.src})`,
        }}
        role="img"
        aria-label="Landing Developer"
      >
        <span
          className="bg-gradientLandingHeader w-full h-[10vh]"
        />
        <div className="min-h-[100vh] text-white flex flex-col items-center pt-[14vh] absolute inset-0 bg-black/25">
          {(currentPage === 'login') ?
            <div
              className="flex flex-col items-center rounded-3xl backdrop-blur-[10px] border border-[#52525B80] px-7 lg:px-12 py-10 w-[90%] lg:w-[35em] gap-4"
            >
              <span
                className="font-semibold text-3xl"
              >
                Log In
              </span>
              <Input
                size="lg"
                label="Email"
                type="email"
                labelPlacement={"outside"}
                placeholder="Enter your email"
                className="font-medium"
              />
              <Input
                size="lg"
                label="Password"
                type="password"
                labelPlacement={"outside"}
                placeholder="Enter your password"
                className="font-medium"
              />
              <Button
                size="lg"
                className="bg-purpleAccent text-white font-semibold text-lg w-full mt-3"
              >
                Log In
              </Button>
              <span
                className="font-medium text-md flex flex-row gap-2 mt-1"
              >
                New User? <button onClick={() => setCurrentPage('register')} className="text-purple-400 underline">
                  Register Here
                </button>
              </span>
            </div>
            :
            <div
              className="flex flex-col rounded-3xl backdrop-blur-[10px] border border-[#52525B80] px-7 lg:px-12 py-5 lg:py-10 w-[90%] lg:w-[60%] gap-4 overflow-auto"
            >
              <span
                className="flex flex-row items-center gap-3 font-semibold text-3xl"
              >
                <ArrowLeft onClick={() => setCurrentPage('login')} className="text-white border-2 border-white rounded-xl text-xl cursor-pointer" /> Registration
              </span>
              <Alert
                color="success"
                description={"Check you Mail for one time password"}
                isVisible={true}
                title={"Registration Success"}
                variant="solid"
                radius="lg"
                className="text-2xl sticky top-0 z-50"
              />
              <form
                className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 w-full"
              >
                {registrationFields.map(field =>
                  (field?.type == 'select') ?
                  <Select
                    value={''}
                    size="md"
                    label="Gender"
                    key={field.param}
                    required={true}
                    radius="lg"
                    className="w-full mt-4"
                    placeholder="Select your Gender"
                    errorMessage="You must select your gender"
                    validate={(value) => value != '' || 'You must select your gender'}
                  >
                    {['Male', 'Female', 'Others'].map((gender) => (
                      <SelectItem key={gender} className="capitalize" value={gender}>{gender}</SelectItem>
                    ))}
                  </Select>
                  :
                  <Input
                    size="lg"
                    key={field.param}
                    label={field.name}
                    type={field.type}
                    labelPlacement={"outside"}
                    placeholder={field.name}
                    required={true}
                    className="font-medium"
                    {...(field.type === 'tel' && { pattern: "\\d{10}", errorMessage: "Please enter a 10 digit phone number" })}
                  />
                )}
                <Button
                  size="lg"
                  type="submit"
                  className="bg-purpleAccent lg:col-span-2 text-white font-semibold text-lg w-full mt-2"
                >
                  Register
                </Button>
              </form>
            </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
}