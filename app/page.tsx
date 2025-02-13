'use client';
import React from "react";
import CrossVelocity from "@/components/internal/crossVelocity";
import LineVelocity from "@/components/internal/lineVelocity";
import { GoogleMap } from "@/components/internal/googleMap";
import { AboutSection } from "@/components/internal/aboutSection";
import Footer from "@/components/internal/footer";
import Landing from "@/components/internal/landing";
import { Departments } from "@/components/internal/departments";
import FAQAccordian from "@/components/internal/faq";
import Partners from "@/components/internal/Partners";
import CountDown from "@/components/internal/countDown";

export default function Home() {
  return (
    <React.Fragment>
      <Landing />
      <CountDown
        timeleft={1741924800}
      />
      <LineVelocity>
        Register
      </LineVelocity>
      <AboutSection />
      <Departments />
      <FAQAccordian />
      <Partners
        type="Knowledge"
        data={["/partners/ict_academy.png"]}
      />
      <Partners
        type="Industry"
        data={["/partners/tcs.png"]}
      />
      <CrossVelocity>
        Explore
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </React.Fragment>
  );
}
