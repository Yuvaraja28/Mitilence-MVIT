import { MVITLogoImg } from '@/variables';
import { Image } from '@heroui/image';
import { Gem, Phone } from 'lucide-react';
import Link from 'next/link';

const phoneNumbers = ["94434 74846", "0413-2643007"];
const developers = [
  {
    name: 'Yuvaraja Murali',
    role: 'Developed',
    link: 'https://1he.dev'
  },
  {
    name: 'Nivetha Kumar',
    role: 'Designed',
    link: 'https://www.instagram.com/_.nive_designs'
  },
  {
    name: 'Harish Mohan',
    role: 'Maintained',
    link: 'https://hari.1he.dev'
  },
]

export default function Footer() {
  return (
    <div
      className="flex flex-col gap-3 flex-wrap pb-6 border-t-[0.5px] border-t-[#ffffff80] mt-10 text-white px-4 w-full"
    >
      <div
        className='flex flex-col lg:flex-row items-center justify-between gap-3 lg:py-0 lg:pt-2 pt-6 py-4'
      >
        <div
          className='flex flex-col items-center gap-2 lg:w-full'
        >
          <div
            className='flex flex-col lg:flex-row items-center gap-4'
          >
            <Image
              src={MVITLogoImg}
              alt='MVIT Logo'
              className='h-[90px] lg:h-[70px] w-[90px] lg:w-[70px] object-contain'
            />
            <span
              className='text-[2em] text-center lg:text-start leading-none font-semibold uppercase'
            >
              Manakula Vinayagar <br /> Institute of Technology
            </span>
          </div>
          <span
            className='text-[2.6em] font-bold leading-none uppercase pt-2 text-center'
          >
            Mitilence 2025
          </span>
        </div>
        <span className="w-[5px] h-0 lg:h-[20vh] bg-gradient-to-b from-white/0 via-white to-white/0 mx-4" />
        <div
          className='flex flex-col items-center justify-center gap-2.5 w-full h-full'
        >
          <div
            className='flex flex-col gap-3 h-full'
          >
            {developers.map(dev => 
              <div
                key={dev.name}
                className='flex flex-row items-center gap-2 font-normal text-lg uppercase'
              >
                <Gem color='#A855F7' />
                <span>
                  {dev.role} by <Link href={dev.link} target='_blank' className='font-semibold'>{dev.name}</Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="h-[1px] bg-gradient-to-l from-white/0 via-white to-white/0 mx-4" />
      <div
        className='flex flex-col items-center justify-center gap-3 pt-4'
      >
        <span
          className='font-medium text-xl uppercase text-center'
        >
          For more details of our institution please visit <Link href={"https://www.mvit.edu.in"} target='_blank' className='lowercase'>
              www.mvit.edu.in
            </Link>
        </span>
        <div
          className='flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-12'
        >
          <span
            className='font-semibold text-2xl uppercase text-purple-500'
          >
            Queries:
          </span>
          {phoneNumbers.map(phone =>
            <div
              key={phone}
              className='flex flex-row items-center justify-center font-medium text-xl gap-2'
            >
              <Phone />
              <span>
                {phone}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}