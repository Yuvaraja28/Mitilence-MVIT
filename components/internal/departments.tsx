'use client';
import React from "react";
import Link from "next/link";
import { Image } from "@heroui/image";
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "../magicui/blur-fade";
import { EventsFallbackImg } from "@/variables";

export function Departments({ departments }: { departments: Department[] }) {
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
      <div className="flex flex-row flex-wrap items-center justify-center gap-8 w-full px-6 lg:px-8">
        {departments.map((dep, idx) => (
          <Link
            key={dep.id}
            href={`/events?department=${dep.id}`}
            className="h-full w-full sm:h-64 sm:w-96"
          >
            <BlurFade
              inView
              className="group h-full w-full sm:h-64 sm:w-96"
              delay={0.1 + (idx+1) * 0.05}
            >
              <span
                className="absolute z-30 top-4 left-[-12px] -skew-x-6 bg-white text-black text-xl font-semibold rounded-[8px] px-3 py-0.5 uppercase shadow-xl drop-shadow-xl"
              >
                {dep.name}
              </span>
              <Image
                alt={dep.id}
                classNames={{
                  wrapper: 'h-full w-full sm:!h-64 sm:!w-96'
                }}
                src={dep?.logoUrl || EventsFallbackImg}
                className="h-full w-full sm:!h-64 sm:!w-96 object-cover border-2 border-gray-800 group-hover:border-white rounded-2xl transition-border duration-300"
              />
              <div className="absolute z-30 bottom-3 right-3 bg-white text-black p-1 rounded-[10px] transform transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:scale-115">
                <ArrowUpRight size={22} />
              </div>
            </BlurFade>
          </Link>
        ))}
      </div>
    </div>
  )
}