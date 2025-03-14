import Image from "next/image";
import Link from "next/link";

type SponsorsProps = {
  data: string[];
}

export default function Sponsors({ data }: SponsorsProps) {
  return (
    <div
      className="text-white lg:p-10 px-6 py-8 flex flex-col items-center w-full gap-8 lg:gap-12"
    >
      <span
        style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 8px 0' }}
        className="text-[42px] leading-[3.42rem] lg:text-5xl text-center font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
      >
        Sponsors
      </span>
      <div
        className="flex flex-col items-center justify-center gap-4 w-full lg:gap-8 lg:flex-row lg:flex-wrap"
      >
        {data.map((partner, i) => (
          <Image
            key={i}
            src={partner}
            width={320}
            height={200}
            alt="Partner"
            className="sobject-contain bg-white rounded-3xl p-10"
          />
        ))}
      </div>
      <div
        className="flex flex-col items-center justify-center gap-1 mt-[-40px]"
      >
        <span
          className="text-2xl font-semibold text-center"
        >
          Grow your brand at the upcoming year's Mitilence Event
        </span>
        <Link
          href={`https://wa.me/918778171244?text=${encodeURIComponent(`*Sponsorship for Mitilence event*\nHello, I'm `)}`}
          className="text-2xl text-center text-purple-500 underline"
        >
          Contact us to be a sponsor!
        </Link>
      </div>
    </div>
  )
}