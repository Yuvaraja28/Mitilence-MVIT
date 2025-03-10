import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AnimatedGradientText } from '../magicui/animated-gradient-text';
import { DeveloperImg, MitilenceVideo, MitilenceWebsiteQR, StarImg } from '@/variables';

export default function Landing() {
  return (
    <div
      style={{
        backgroundImage: `url(${DeveloperImg})`,
      }}
      aria-label="Landing Developer"
      className="lg:h-[100vh] h-[37em] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
    >
      <video
        loop
        muted
        autoPlay
        src={MitilenceVideo}
        className="object-cover lg:h-[100vh] h-[37em] absolute w-full"
      />
      <div className="lg:h-[100vh] h-[37em] absolute inset-0 bg-black/25"></div>
      <div
        className="flex flex-col items-center lg:justify-normal h-full w-full mt-[20vh] xl:mt-[30vh]"
      >
        <AnimatedGradientText
          className='z-10 bg-white text-[3.5vw] sm:text-sm md:text-lg rounded-full -translate-y-8 md:-translate-y-4'
        >
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            A National Level Technical Symposium
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
        <LineShadowText
          shadowColor="white"
          className="absolute text-[16vw] lg:text-[9.5em] mt-1 text-white font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
        >
          Mitilence
        </LineShadowText>
        <LineShadowText
          shadowColor="white"
          className="absolute lg:text-[6em] text-[12vw] lg:mt-[1.8em] mt-[1.5em] 2xl:right-[3.5em] right-[10vw] text-white font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
        >
          2025
        </LineShadowText>
        <ShimmerButton
          disabled={true}
          background="#9747ff"
          shimmerColor="white"
          shimmerSize="0.10em"
          className="absolute top-[45vh] sm:top-[50vh] md:top-[60vh] px-6 py-1.5 font-medium text-[1.2em] lg:text-[1.35em]"
        >
          14 March 2025
        </ShimmerButton>
      </div>      
      <img
        loading='lazy'
        src={StarImg}
        className='absolute lg:top-[70vh] top-[28em] ml-[-10px] lg:ml-0 lg:bottom-0 left-0 z-10 h-[8.5em] lg:h-[15em]'
      />
      <img
        loading='lazy'
        src={MitilenceWebsiteQR}
        className='absolute top-[31em] lg:top-[77vh] right-5 z-10 h-[5em] lg:h-[10em] rounded-[12px]'
      />
    </div>
  )
}