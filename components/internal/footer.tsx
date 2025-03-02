import { MVITLogoImg } from '@/variables';
import { Image } from '@heroui/image';
import { Gem, Phone } from 'lucide-react';
import Link from 'next/link';

const technicalPhoneNumbers = ["8778171244"];
const phoneNumbers = ["9443474846", "0413-2643007"];
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
        className='flex flex-col justify-center items-center gap-3 py-5 pb-3'
      >
        <Image
          src={MVITLogoImg}
          alt='MVIT Logo'
          className='h-[80px] w-[80px] object-contain'
        />
        <div
          className='flex flex-col items-center'
        >
          <span
            className='text-[1.7em] text-center leading-none font-medium uppercase'
          >
            Manakula Vinayagar <br /> Institute of Technology
          </span>
          <span
            className='text-[2.5em] font-semibold leading-none uppercase pt-2 text-center'
            >
            Mitilence 2025
          </span>
        </div>
      </div>
      <span className="h-[0.5px] w-full bg-gradient-to-l from-white/0 via-white to-white/0" />
      <div
        className='flex flex-row flex-wrap items-center justify-around gap-3 w-full h-full py-2'
      >
        {developers.map(dev => 
          <div
            key={dev.name}
            className='flex flex-row items-center gap-2 font-normal text-lg text-center'
          >
            <Gem color='#A855F7' />
            <span>
              {dev.role} by <Link href={dev.link} target='_blank' className='font-semibold uppercase'>{dev.name}</Link>
            </span>
          </div>
        )}
      </div>
      <span className="h-[1px] bg-gradient-to-l from-white/0 via-white to-white/0" />
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
            className='font-semibold text-xl uppercase text-purple-500'
          >
            Queries:
          </span>
          {phoneNumbers.map(phone =>
            <Link
              key={phone}
              href={`tel:${phone}`}
              target='_blank'
              className='flex flex-row items-center justify-center font-medium text-xl gap-2'
            >
              <Phone />
              <span>
                {phone}
              </span>
            </Link>
          )}
        </div>
        <div
          className='flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-6'
        >
          <span
            className='font-semibold text-xl uppercase text-purple-500'
          >
            Technical Queries:
          </span>
          {technicalPhoneNumbers.map(phone =>
            <Link
              key={phone}
              target='_blank'
              href={`https://wa.me/91${phone}?text=${encodeURIComponent(`*Technical Query for Mitilence event's site*\nHello, I'm `)}`}
              className='flex flex-row items-center justify-center font-medium text-xl gap-2'
            >
              <Phone />
              <span>
                {phone}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}