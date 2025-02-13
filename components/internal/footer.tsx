import Image from 'next/image';
import MVITLogo from '@/assets/images/mvit_logo.png';

export default function Footer() {
  return (
    <div
      className="grid lg:grid-cols-2 gap-2 flex-wrap border-t-[0.5px] border-t-[#ffffff80] h-[40vh] mt-10 text-white"
    >
      <div
        className="flex flex-col items-center gap-2 p-5 lg:p-8"
      >
        <div
          className='flex flex-row items-center gap-4'
        >
          <Image
            width={55}
            height={55}
            src={MVITLogo}
            alt='MVIT Logo'
          />
          <span
            className='text-xl lg:text-3xl font-semibold uppercase'
          >
            Manakula Vinayagar Institute of Technology
          </span>
        </div>
      </div>
      <div
        className='flex flex-col items-center justify-center gap-2'
      >
        <span
          className='text-3xl lg:text-[3em] font-bold uppercase'
        >
          Mitilence 2025
        </span>
      </div>
    </div>
  )
}