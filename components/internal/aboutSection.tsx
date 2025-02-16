import { Image } from '@heroui/image';
import { MVITShowcaseImg } from '@/variables';

export function AboutSection() {
  return (
    <div
      className="text-white lg:p-10 px-6 py-8 flex flex-col items-center lg:flex-row gap-10"
    >
      <div
        className="flex flex-col gap-5"
      >
        <span
          style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 12px 0' }}
          className="text-[42px] lg:text-5xl font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
        >
          About Event
        </span>
        <span
          className="text-xl font-normal text-justify lg:pl-4"
        >
          MITILENCE is the annual national-level technical symposium hosted by Manakula Vinayagar Institute of Technology (MVIT) in Puducherry. This prestigious event serves as a dynamic platform for students across India to showcase their technical acumen, engage in innovative problem-solving, and collaborate with peers from diverse engineering disciplines. By participating in MITILENCE, students not only enhance their technical competencies but also develop essential soft skills such as leadership, communication, and teamwork. The symposium embodies MVIT's commitment to nurturing well-rounded professionals equipped to meet the challenges of the ever-evolving technological landscape. Experience the spirit of innovation and excellence at MITILENCE, where the technologists of tomorrow converge today.
        </span>
      </div>
      <Image
        alt="MVIT"
        isBlurred
        width={2800}
        height={260}
        src={MVITShowcaseImg}
        className='object-cover rounded-2xl'
      />
    </div>
  )
}