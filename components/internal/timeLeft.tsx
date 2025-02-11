'use client';
import React from "react";
import Countdown from "react-countdown";

type ClockProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

const renderer = ({ days, hours, minutes, seconds }: ClockProps) => {
  const clockTimer = [
    { name: "DAYS", value: days },
    { name: "HRS", value: hours },
    { name: "MINS", value: minutes },
    { name: "SECS", value: seconds },
  ];

  return (
    <div className="bg-boxBlack rounded-3xl text-white px-6 py-4 pt-5 w-fit flex flex-row">
      {clockTimer.map((clock, index) => (
        <React.Fragment key={clock.name}>
          <div className="flex flex-col items-center justify-center gap-1.5 lg:w-[6em]">
            <span className="font-dePixel lg:text-[2.5em] text-[2.4em] leading-none tracking-widest after:mr-[-12px]">
              {clock.value.toString().padStart(2, "0")}
            </span>
            <span className="font-light uppercase">{clock.name}</span>
          </div>
          {index < clockTimer.length - 1 && (
            <span className="w-[1.5px] bg-gradient-to-b from-white/0 via-white to-white/0 mx-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function TimeLeft({ timeStamp }: { timeStamp: number }) {
  return <Countdown date={new Date(timeStamp * 1000)} renderer={renderer} />;
}
