import DeveloperImg from '@/assets/images/developer.png';
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function Landing() {
  return (
    <div
      className="lg:h-[92vh] h-[30em] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      style={{
        backgroundImage: `url(${DeveloperImg.src})`,
      }}
      role="img"
      aria-label="Landing Developer"
    >
      <span
        className="bg-gradientLandingHeader w-full h-[10vh]"
      />
      <div className="lg:h-[100vh] h-[34em] absolute inset-0 bg-black/25"></div>
      <div
        className="flex flex-col items-center lg:justify-normal h-full w-full"
      >
        <LineShadowText
          shadowColor="white"
          className="absolute text-[16vw] md:text-[9.5em] text-white font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
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
      </div>
    </div>
    
  )
}