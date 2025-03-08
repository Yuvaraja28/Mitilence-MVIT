'use client';
import React from "react";
import { Image } from "@heroui/image";
import { BlurFade } from "../magicui/blur-fade";

export function OrganizersDisplay({ title, image }: { title: string, image: string }) {
  return (
    <div
      className="text-white lg:p-10 px-6 py-8 flex flex-col items-center justify-center w-full gap-8 lg:gap-14"
    >
      <span
        style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 12px 0' }}
        className="text-[42px] leading-[3.4rem] lg:text-5xl text-center font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
      >
        {title} Organizers
      </span>
      <BlurFade
        inView
        delay={1 * 0.05}
        className="flex items-center justify-center "
      >
        <Image
          src={image}
          alt={"Organizers Display"}
          classNames={{
            wrapper: 'bg-contain bg-no-repeat w-full md:w-[70%]'
          }}
          className="h-full w-full object-cover border-3 border-white/30 group-hover:border-white rounded-3xl transition-border duration-300"
        />
      </BlurFade>
    </div>
  )
}