'use client';
import React from "react";
import Countdown from "react-countdown";

type ClockProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const renderer = ({ days, hours, minutes, seconds }: ClockProps) => {
  const clockTimer = [
    {
      name: 'DAYS',
      value: days
    },
    {
      name: 'HRS',
      value: hours
    },
    {
      name: 'MINS',
      value: minutes
    },
    {
      name: 'SECS',
      value: seconds
    },
  ]
  return (
    <div
      className="bg-boxBlack rounded-3xl text-white px-1.5 py-3 w-fit flex flex-row flex-wrap"
    >
      {clockTimer.map((clock, index) =>
        <React.Fragment
          key={clock.name}
        >
          {(index != 0) &&
            <span
              className="w-[1.5px] bg-gradient-to-b from-white/0 via-white to-white/0"
            />
          }
          <div
            className="flex flex-col items-center justify-center w-[10em]"
          >
            <span
              className="font-dePixel text-[3em] leading-0 tracking-widest after:mr-[-12px]"
            >
              {clock.value.toString().padStart(2, '0').trim()}
            </span>
            <span
              className="font-light uppercase"
              >
              {clock.name}
            </span>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default function TimeLeft({ timeStamp }: { timeStamp: number }) {
  return <Countdown date={new Date(timeStamp * 1000)} renderer={renderer} />;
}
