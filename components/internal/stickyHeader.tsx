import Link from "next/link";
import Image from "next/image";
import MVITImg from '@/assets/images/mvit.png'
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function StickyHeader() {
  const pathname = usePathname();

  const headerList = [
    {
      name: 'home',
      url: '/'
    },
    {
      name: 'event',
      url: '/event'
    },
    {
      name: 'about',
      url: '/about'
    },
    {
      name: 'faq',
      url: '/faq'
    },
    {
      name: 'teams',
      url: '/teams'
    }
  ]

  return (
    <div
      className="sticky top-5 flex flex-row gap-2 w-full lg:px-10 px-4 z-20"
    >
      <div
        className="flex flex-row justify-between items-center bg-white border border-gray-300/50 px-3.5 py-2.5 rounded-full w-full drop-shadow-2xl shadow-2xl"
      >
        <Image
          alt="MVIT"
          src={MVITImg}
          loading="lazy"
          className="lg:pl-2.5 pl-1.5 h-[2.8em] w-[14em]"
        />
        <div
          className="lg:flex hidden flex-row h-full"
        >
          {headerList.map(head =>
            <Link
              key={head.name}
              href={head.url}
              className={"flex items-center justify-center uppercase border-3 text-md font-semibold rounded-full px-7 pt-0.5 transition-background h-full " + ((pathname == head.url) ? 'text-white bg-purpleAccent border-purpleAccent' : 'text-boxBlack border-white')}
            >
              {head.name}
            </Link>
          )}
        </div>
        <Link
          href={'/login'}
          className="lg:flex hidden items-center justify-center uppercase border-3 text-md font-semibold text-purpleAccent hover:text-white hover:bg-purpleAccent border-purpleAccent rounded-full px-8 pt-0.5 transition-background h-full"
        >
          Login
        </Link>
        <Link
          href={'/login'}
          className="lg:hidden flex items-center justify-center uppercase border-3 text-md font-semibold text-white hover:text-purpleAccent bg-purpleAccent border-purpleAccent hover:bg-white rounded-full px-2 transition-background h-full"
        >
          <Menu />
        </Link>
      </div>
    </div>
  )
}