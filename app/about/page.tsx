'use client';
import { MVITShowcaseImg } from "@/variables";
import { useFirebase } from "@/contexts/firebase";
import HeaderSection from "@/components/internal/headerSection";
import { MembersDisplay } from "@/components/internal/membersDisplay";

export default function About() {
  const firebaseContext = useFirebase();
  const faqs = firebaseContext?.faqs || [];
  const departments = firebaseContext?.departments || [];
  const administrationMembers = firebaseContext?.administrationMembers || [];

  return (
    <div
      className="flex flex-col items-center text-white"
    >
      <HeaderSection
        bannerName={"About"}
        bannerImg={MVITShowcaseImg}
      />
      <MembersDisplay
        title="administration"
        members={administrationMembers}
      />
      <div>

      </div>
    </div>
  )
}