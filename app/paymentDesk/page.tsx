'use client';
import { useFirebase } from "@/contexts/firebase";

export default function Organizers() {
  const firebaseContext = useFirebase();
  const fireUserDoc = firebaseContext?.fireUserDoc;
  const fireCustomClaims = firebaseContext?.fireCustomClaims;

  return (
    <div
      className="flex flex-col gap-2 w-full px-5 lg:px-16 pt-32 lg:pt-22 py-8 min-h-[100vh]"
    >
      <span
        className="text-white"
      >
        {fireCustomClaims?.role}
      </span>
    </div>
  )
}