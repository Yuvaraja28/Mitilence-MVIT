'use client';
import React from "react";
import { Image } from "@heroui/image";
import { DefaultMemberImg } from "@/variables";
import { BlurFade } from "../magicui/blur-fade";

export function MembersDisplay({ title, members }: { title: string, members: AdministrationMember[] | TechnicalMember[] }) {
  return (
    <div
      className="text-white lg:p-10 px-6 py-8 flex flex-col items-center w-full gap-8 lg:gap-14"
    >
      <span
        style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 12px 0' }}
        className="text-[42px] lg:text-5xl text-center font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
      >
        {title} Team
      </span>
      <div className="flex flex-row flex-wrap items-center justify-center gap-10 w-full px-6 lg:px-16">
        {members.map((memb, idx) => (
          <BlurFade
            inView
            key={idx}
            delay={0.1 + (idx+1) * 0.05}
          >
            <div
              className="flex flex-col w-full absolute z-30 bottom-3 left-[-20px] -skew-x-6 bg-white text-black text-md font-semibold rounded-[10px] px-3 py-1.5 border-2 border-gray-300 shadow-xl drop-shadow-xl leading-[17px] gap-0.5"
            >
              <span>
                {memb.name}
              </span>
              <span
                className="text-purpleAccent"
              >
                {memb.role}
              </span>
            </div>
            <Image
              alt={memb.id}
              src={memb?.imageUrl || DefaultMemberImg}
              fallbackSrc={DefaultMemberImg}
              classNames={{
                wrapper: 'bg-contain bg-no-repeat'
              }}
              className="h-56 w-56 object-cover border-3 border-white/30 group-hover:border-white rounded-2xl transition-border duration-300"
            />
          </BlurFade>
        ))}
      </div>
    </div>
  )
}