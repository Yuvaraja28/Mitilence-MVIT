'use client';
import React from "react";
import Footer from "@/components/internal/footer";
import { useFirebase } from "@/contexts/firebase";
import Landing from "@/components/internal/landing";
import FAQAccordian from "@/components/internal/faq";
import Partners from "@/components/internal/Partners";
import CountDown from "@/components/internal/countDown";
import { GoogleMap } from "@/components/internal/googleMap";
import LineVelocity from "@/components/internal/lineVelocity";
import { Departments } from "@/components/internal/departments";
import CrossVelocity from "@/components/internal/crossVelocity";
import { AboutSection } from "@/components/internal/aboutSection";
import { MembersDisplay } from "@/components/internal/membersDisplay";
import { ICTAcademyImg, TCSImg } from "@/variables";

export default function Home() {
  const firebaseContext = useFirebase();
  const faqs = firebaseContext?.faqs || [];
  const departments = firebaseContext?.departments || [];
  const administrationMembers = firebaseContext?.administrationMembers || [];

  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Landing />
      <CountDown
        timeleft={1741924800}
      />
      <LineVelocity>
        REGISTER NOW
      </LineVelocity>
      <AboutSection />
      <Departments
        departments={departments}
      />
      <FAQAccordian
        faqs={faqs}
      />
      <MembersDisplay
        title="administration"
        members={administrationMembers}
      />
      <Partners
        type="Knowledge"
        data={[ICTAcademyImg]}
      />
      <Partners
        type="Industry"
        data={[TCSImg]}
      />
      <CrossVelocity>
        REGISTER NOW
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </React.Fragment>
  );
}
