'use client';
import React from "react";
import Footer from "@/components/internal/footer";
import { useFirebase } from "@/contexts/firebase";
import Landing from "@/components/internal/landing";
import FAQAccordian from "@/components/internal/faq";
import Sponsors from "@/components/internal/Sponsors";
import CountDown from "@/components/internal/countDown";
import { GoogleMap } from "@/components/internal/googleMap";
import LineVelocity from "@/components/internal/lineVelocity";
import { Departments } from "@/components/internal/departments";
import CrossVelocity from "@/components/internal/crossVelocity";
import { AboutSection } from "@/components/internal/aboutSection";
import { MembersDisplay } from "@/components/internal/membersDisplay";
import { DevelopmentTeam, FacultyCoordinatorsImg, MitilenceDate } from "@/variables";
import { OrganizersDisplay } from "@/components/internal/organizersDisplay";

export default function Home() {
  const firebaseContext = useFirebase();
  const faqs = firebaseContext?.faqs || [];
  const departments = firebaseContext?.departments || [];
  const administrationMembers = firebaseContext?.administrationMembers || [];

  return (
    <React.Fragment>
      <Landing />
      {(MitilenceDate > new Date()) &&
        <CountDown
          timeleft={Math.ceil((+MitilenceDate)/1000)}
        />
      }
      <LineVelocity>
        {(MitilenceDate > new Date()) ?
          "REGISTER NOW"
          :
          "WRAPPING UP"
        }
      </LineVelocity>
      <AboutSection />
      <Departments
        departments={departments}
      />
      <MembersDisplay
        title="Management"
        members={administrationMembers}
      />
      <OrganizersDisplay
        title="Faculty"
        image={FacultyCoordinatorsImg}
      />
      <MembersDisplay
        title="Development"
        members={DevelopmentTeam}
      />
      <Sponsors
        data={[]}
      />
      <FAQAccordian
        faqs={faqs}
      />
      <CrossVelocity>
        {(MitilenceDate > new Date()) ?
          "REGISTER NOW"
          :
          "WRAPPING UP"
        }
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </React.Fragment>
  );
}
