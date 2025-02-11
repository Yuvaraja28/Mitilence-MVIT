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
import { AboutSection } from "@/components/internal/aboutSection";
import Footer from "@/components/internal/footer";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

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
          className="flex flex-col items-center lg:justify-normal h-full w-full"
        >
          <LineShadowText
            shadowColor="white"
            className="absolute text-[16vw] md:text-[9.5em] text-white font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
          >
            Mitilence
          </LineShadowText>
          <LineShadowText
            shadowColor="white"
            className="absolute md:text-[6em] text-[12vw] lg:mt-[1.8em] mt-[1.6em] xl:right-[3.5em] right-[10vw] text-white font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
          >
            2025
          </LineShadowText>
          <ShimmerButton
            disabled={true}
            background="#9747ff"
            shimmerColor="white"
            shimmerSize="0.10em"
            className="absolute bottom-[38vh] lg:bottom-[35vh] px-6 py-1.5 font-medium text-[1.2em] lg:text-[1.35em]"
          >
            27 March 2025
          </ShimmerButton>
        </div>
      </div>
      <div
        className="flex flex-col items-center gap-4 w-full lg:px-12 bg-white py-6"
      >
        <span
          className="text-black font-semibold lg:text-[3em] text-[2.1em] leading-none text-center"
        >
          Countdown until the event starts
        </span>
        <div
          className="flex flex-col items-center justify-between w-full gap-4"
        >
          <TimeLeft timeStamp={1743044000} />
          <div
            className="flex flex-col items-center gap-3 w-full mt-1"
          >
            <span
              className="text-2xl lg:text-[26px] font-medium text-center"
            >
              Register for the events now
            </span>
            <InteractiveHoverButton
              disabled={true}
              className="px-6 py-1.5 font-medium text-[1.2em] lg:text-[1.35em] w-fit border-2 border-purpleAccent text-purpleAccent hover:text-white hover:bg-purpleAccent"
            >
              View Events
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
      <LineVelocity />
      <AboutSection />
      <CrossVelocity />
      <GoogleMap />
      <Footer />
    </React.Fragment>
  );
}
