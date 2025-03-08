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
          MITILENCE - The National Level Technical Symposium is a premier event at Manakula Vinayagar Institute of Technology, featuring a dynamic mix of technical and non-technical competitions. This event serves as a platform for students to showcase their skills in coding, design, innovation, and problem-solving while also engaging in fun and creative activities. Mitilence fosters learning, teamwork, and excitement for all participants
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