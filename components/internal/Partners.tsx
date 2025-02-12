import Image from "next/image";

type PartnersProps = {
  type: string;
  data: string[];
}

export default function Partners({ type, data }: PartnersProps) {
  return (
    <div
      className="text-white lg:p-10 px-6 py-8 flex flex-col items-center w-full gap-8 lg:gap-12"
    >
      <span
        style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 8px 0' }}
        className="text-[28px] lg:text-5xl text-center font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
      >
        {type} Partner
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
    </div>
  )
}