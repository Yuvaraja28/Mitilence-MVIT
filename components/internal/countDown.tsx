import TimeLeft from "@/components/internal/timeLeft";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from "next/link";

export default function CountDown({ timeleft }: { timeleft: number }) {
  return (
    <div
      className="flex flex-col items-center gap-4 w-full lg:px-12 bg-white py-6 select-none"
    >
      <span
        className="text-black font-semibold lg:text-[3em] text-[2.1em] leading-none text-center"
      >
        Countdown until the event starts
      </span>
      <div
        className="flex flex-col items-center justify-between w-full gap-4"
      >
        <TimeLeft timeStamp={timeleft} />
        <div
          className="flex flex-col items-center gap-3 w-full mt-1"
        >
          <span
            className="text-2xl lg:text-[26px] font-medium text-center"
          >
            Register for the events now
          </span>
          <Link
            href={'/events'}
          >
            <InteractiveHoverButton
              className="px-6 py-1.5 font-medium text-[1.2em] lg:text-[1.35em] w-fit border-2 border-purpleAccent text-purpleAccent hover:text-white hover:bg-purpleAccent"
            >
              View Events
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </div>
  )
}