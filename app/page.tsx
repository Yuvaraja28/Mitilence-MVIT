'use client';
import React from "react";
// import { firestoreDB } from "@/lib/firebase";
// import { collection, getDocs } from "firebase/firestore";
import DeveloperImg from '@/assets/images/developer.png';
import CrossVelocity from "@/components/internal/crossVelocity";
import LineVelocity from "@/components/internal/lineVelocity";
import TimeLeft from "@/components/internal/timeLeft";
import StickyHeader from "@/components/internal/stickyHeader";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { GoogleMap } from "@/components/internal/googleMap";

export default function Home() {

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
        className="lg:h-[92vh] h-[30em] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
        style={{
          backgroundImage: `url(${DeveloperImg.src})`,
        }}
        role="img"
        aria-label="Landing Developer"
      >
        <span
          className="bg-gradientLandingHeader w-full h-[10vh]"
        />
        <div className="lg:h-[100vh] h-[34em] absolute inset-0 bg-black/25"></div>
        <div
          className="flex flex-col items-center lg:justify-normal justify-center h-full w-full"
        >
          <LineShadowText
            shadowColor="white"
            className="absolute text-white lg:text-[10em] text-[17vw] lg:mt-[0em] mt-[-3.5em] font-semibold uppercase  font-clashDisplay after:bg-purpleAccent"
          >
            Mitilence
          </LineShadowText>
          <LineShadowText
            shadowColor="white"
            className="text-white lg:text-[6em] text-[13vw] mt-[-2em] lg:mt-[1.8em] font-semibold uppercase font-clashDisplay after:bg-purpleAccent ml-[4.5em]"
          >
            2025
          </LineShadowText>
          <ShimmerButton
            disabled={true}
            background="#9747ff"
            shimmerColor="white"
            shimmerSize="0.10em"
            className="px-6 py-1.5 font-medium sm:text-[1.4em] text-[1.1em] absolute mt-[2.5em] lg:bottom-[30vh]"
          >
            27 March 2025
          </ShimmerButton>
        </div>
      </div>
      <div
        className="flex flex-row justify-between gap-2.5 bg-white px-4 pt-4 pb-10 flex-wrap"
      >
        <div
          className="flex flex-col items-center gap-2.5 w-full"
        >
          <span
            className="text-black font-semibold text-[8vw] md:text-[3.2em] leading-none text-center"
          >
            Countdown Until the Event Starts
          </span>
          <TimeLeft timeStamp={1743046200} />
        </div>
      </div>
      <LineVelocity />
      <CrossVelocity />
      <GoogleMap />
    </React.Fragment>
  );
}
