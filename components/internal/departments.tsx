'use client';
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDepartments } from "@/Firestore/departments";
import { BlurFade } from "../magicui/blur-fade";
import { Image } from "@heroui/image";

export function Departments() {
  const [departments, setDepartments] = React.useState<Department[]>([]);

  React.useLayoutEffect(() => {
    getDepartments()
      .then(data => setDepartments(() => data))
  }, []);

  return (
    <div
      className="text-white lg:p-10 px-6 py-8 flex flex-col items-center w-full gap-8 lg:gap-14"
    >
      <span
        style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 12px 0' }}
        className="text-[42px] lg:text-5xl text-center font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
      >
        Departments
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-6 lg:px-16">
        {departments.map((dep, idx) => (
          <Link
            key={dep.id}
            href={`/departments/${dep.id}`}
          >
            <BlurFade
              inView
              className="group"
              delay={0.1 + (idx+1) * 0.05}
            >
              <span
                className="absolute z-30 top-5 left-[-20px] -skew-x-6 bg-white text-black text-xl font-semibold rounded-[5px] px-4 py-0.5 uppercase"
              >
                {dep.name}
              </span>
              <Image
                isBlurred
                alt={dep.id}
                src="/images/events_fallback.png"
                className="w-full h-72 object-cover border-3 border-gray-800 group-hover:border-white rounded-2xl transition-border duration-300"
              />
              <div className="absolute z-30 bottom-3 right-3 bg-white text-black p-2 rounded-xl transform transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:scale-125">
                <ArrowUpRight size={24} />
              </div>
            </BlurFade>
          </Link>
        ))}
      </div>
    </div>
  )
}