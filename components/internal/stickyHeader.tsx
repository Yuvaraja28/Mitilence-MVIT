'use client';
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import MVITImg from '@/assets/images/mvit.png';
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from '@heroui/button';

export default function ResponsiveSidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const headerList = [
    { name: 'home', url: '/' },
    { name: 'events', url: 'events' },
    { name: 'about', url: 'about' },
    { name: 'faq', url: 'faq' },
    { name: 'teams', url: 'teams' }
  ];

  return (
    <div
      className='sticky top-5 flex flex-row gap-2 w-full lg:px-10 px-4 z-20 select-none'
    >
      {/* Header for PC View */}
      <div className="w-full flex justify-between items-center bg-white border border-gray-300/50 px-3.5 py-2.5 rounded-full shadow-2xl">
        <Image
          alt="MVIT"
          src={MVITImg}
          loading="lazy"
          className="lg:pl-2.5 pl-1.5 h-[2.8em] w-[14em]"
        />
        <div className="hidden lg:flex flex-row h-full">
          {headerList.map((head) => (
            <Link
              key={head.name}
              href={`/${head.url}`}
              className={`flex items-center justify-center uppercase text-md font-semibold rounded-full px-7 pt-0.5 transition-background h-full ${(pathname == head.url || pathname.split('/').slice(1)[0] === (head.url)) ? 'text-white bg-purpleAccent border-purpleAccent' : 'text-boxBlack border-white'}`}
            >
              {head.name}
            </Link>
          ))}
        </div>
        <Link
          href={'/login'}
          className='h-full'
        >
          <Button
            className="hidden lg:flex items-center justify-center uppercase border-3 text-md font-semibold text-purpleAccent hover:text-white hover:bg-purpleAccent border-purpleAccent rounded-full px-8 pt-0.5 transition-background h-full bg-white"
          >
            Login
          </Button>
        </Link>
        <button
          onClick={toggleSidebar}
          className="lg:hidden h-full flex items-center justify-center border-3 text-md font-semibold text-white bg-purpleAccent border-purpleAccent hover:text-purpleAccent hover:bg-white rounded-full px-2 transition-all"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <button
            onClick={toggleSidebar}
            className="self-end text-gray-600 focus:outline-none"
          >
            <X />
          </button>
          {headerList.map((head) => (
            <Link
              key={head.name}
              href={head.url}
              className="block text-lg ml-2 font-semibold text-gray-700 hover:text-purpleAccent capitalize"
              onClick={toggleSidebar}
            >
              {head.name}
            </Link>
          ))}
          <Link
            href={'/login'}
            className="block mt-4 text-lg font-semibold text-white bg-purpleAccent hover:bg-purple-700 py-2 px-4 rounded-full text-center"
            onClick={toggleSidebar}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}