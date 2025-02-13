import React from "react";
import { notFound } from "next/navigation";
import EventClientRender from "./eventClient";
import { getEvent } from "@/Firestore/events";
import Footer from "@/components/internal/footer";
import { GoogleMap } from "@/components/internal/googleMap";
import HeaderSection from "@/components/internal/headerSection";
import CrossVelocity from "@/components/internal/crossVelocity";
import TechnicalEventsImg from '@/assets/images/technical_events.png';

export default async function Event({ params }: { params: Promise<{ event: string }> }) {
  const event = (await params).event

  try {
    var eventData = await getEvent(event)
    console.log(eventData)
  } catch {
    return notFound()
  }

  return (
    <div
      className="flex flex-col items-center text-white"
    >
      <HeaderSection
        bannerName={eventData.name}
        bannerImg={TechnicalEventsImg.src}
      />
      <EventClientRender
        eventData={eventData}
      />
      <CrossVelocity>
        Explore
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </div>
  )
}