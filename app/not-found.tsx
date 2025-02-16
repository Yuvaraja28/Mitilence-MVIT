'use client';
import React from "react";
import CrossVelocity from "@/components/internal/crossVelocity";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <React.Fragment>
      <div
        className="pt-20 h-[75vh] flex flex-col justify-center items-center w-full"
      >
        <div      
          style={{ boxShadow: '#9747ff 8px 10px 0' }}
          className="bg-white flex flex-col items-center justify-center pt-6 pb-8 gap-4 rounded-[6px] w-[90%] lg:w-[40%]"
        >
          <LineShadowText
            shadowColor="white"
            className="text-[20vw] md:text-[8em] text-boxBlack font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
          >
            404
          </LineShadowText>
          <span
            className="text-3xl text-center text-boxBlack font-semibold uppercase mt-[-1em] md:mt-[-1.5em]"
          >
            PAGE NOT FOUND
          </span>
          <Link
            href={'/'}
          >
            <InteractiveHoverButton
              className="px-6 py-1.5 font-medium text-[1em] lg:text-[1.35em] w-fit border-2 rounded-xl border-purpleAccent text-purpleAccent hover:text-white hover:bg-purpleAccent duration-200"
            >
              Back to Home
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
      <CrossVelocity>
        Not Found
      </CrossVelocity>
    </React.Fragment>
  )
}