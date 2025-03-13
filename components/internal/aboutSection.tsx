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
          className="text-[42px] leading-[3.42rem] lg:text-5xl font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
        >
          About Event
        </span>
        <span
          className="text-xl font-normal text-justify lg:pl-4"
        >
          MITILENCE, is a prestigious annual event hosted by our Manakula Vinayagar Institute of Technology. Its primary objective is to ignite students' talents and offer them opportunities to explore the latest technological advancements. MITILENCE provides a platform for students to exhibit their expertise in coding, design, innovation, and problem-solving while also participating in engaging and creative activities. The event showcases a vibrant blend of technical and non-technical competitions, fostering learning, teamwork, and enthusiasm among all participants.
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