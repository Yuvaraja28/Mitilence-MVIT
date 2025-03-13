import { DevelopmentTeam, MVITLogoImg } from '@/variables';
import { Image } from '@heroui/image';
import { Gem, Phone } from 'lucide-react';
import Link from 'next/link';

const technicalPhoneNumbers = ["8778171244"];
const phoneNumbers = ["9443474846", "0413-2643007"];
const convenor = {
  name: 'Dr. P. Sivakumar',
  dept: 'IT',
  role: 'Professor & HOD'
}

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
      <div
        className='flex flex-col flex-wrap items-center text-xl text-center mt-[-10px] mb-[10px]'
      >
        <b className='text-[24px] underline uppercase mb-1'>
          Convenor
        </b>
        <div
          className='text-center items-center'
        >
          <span
            className='font-semibold text-purple-500 uppercase'
          >
            {convenor.name}
          </span> - <span>
            {convenor.role}
          </span>
        </div>
        <span
          className='mt-[-2px]'
        >
          Department of <b>{convenor.dept}</b>
        </span>
      </div>
      <span className="h-[1px] w-full bg-gradient-to-l from-white/0 via-white to-white/0" />
      <div
        className='flex flex-row flex-wrap items-center justify-around gap-3 w-full h-full py-2'
      >
        {DevelopmentTeam.map(dev => 
          <div
            key={dev.name}
            className='flex flex-col items-center font-normal text-lg text-center'
          >
            <span
              className='flex flex-row flex-wrap justify-center items-center text-center gap-1.5'
            >
              <Gem color='#A855F7' size={20} /> {dev.task} by <Link href={dev.link} target='_blank' className='font-semibold uppercase text-purple-500'>{dev.name}</Link>
            </span>
            <span
              className='mt-[-5px]'
            >
              Department of <b>{dev.dept}</b>
            </span>
            <span
              className='mt-[-5px]'
            >
              <b className='font-medium'>{dev.batch}</b> Batch
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