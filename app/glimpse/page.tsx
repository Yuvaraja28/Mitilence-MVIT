'use client';
import { MVITShowcaseImg } from "@/variables";
import { useFirebase } from "@/contexts/firebase";
import HeaderSection from "@/components/internal/headerSection";

export default function Glimpse() {
  const firebaseContext = useFirebase();
  
  return (
    <div
      className="flex flex-col items-center text-white"
    >
      <HeaderSection
        bannerName={"Glimpse"}
        bannerImg={MVITShowcaseImg}
      />
      <div>

      </div>
    </div>
  )
}