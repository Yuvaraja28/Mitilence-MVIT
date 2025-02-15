import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import StarImg from '@/assets/images/star.png'
import DeveloperImg from '@/assets/images/developer.png'
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AnimatedGradientText } from '../magicui/animated-gradient-text';
import { Image } from '@heroui/image';

export default function Landing() {
  return (
    <div
      style={{
        backgroundImage: `url(${DeveloperImg.src})`,
      }}
      aria-label="Landing Developer"
      className="mt-[-8.5vh] h-[100vh] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
    >
      <video
        loop
        muted
        autoPlay
        src="/videos/mitilence.mp4"
        className="object-cover h-[100vh] absolute w-full"
      />
      <div className="h-[99vh] lg:h-[100vh] absolute inset-0 bg-black/25"></div>
      <div
        className="flex flex-col items-center lg:justify-normal h-full w-full mt-[32vh] lg:mt-[25vh]"
      >
        <AnimatedGradientText
          className='z-10 bg-white text-sm md:text-lg rounded-full -translate-y-8 md:-translate-y-4'
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
          className="absolute text-[16vw] md:text-[9.5em] mt-1 text-white font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
        >
          Mitilence
        </LineShadowText>
        <LineShadowText
          shadowColor="white"
          className="absolute md:text-[6em] text-[12vw] lg:mt-[1.8em] mt-[1.6em] xl:right-[3.5em] right-[10vw] text-white font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
        >
          2025
        </LineShadowText>
        <ShimmerButton
          disabled={true}
          background="#9747ff"
          shimmerColor="white"
          shimmerSize="0.10em"
          className="absolute bottom-[38vh] lg:bottom-[35vh] px-6 py-1.5 font-medium text-[1.2em] lg:text-[1.35em]"
        >
          14 March 2025
        </ShimmerButton>
        <Image
          width={100}
          height={100}
          src={StarImg.src}
          className='absolute bottom-0 left-0 z-10'
        />
      </div>
    </div>
  )
}