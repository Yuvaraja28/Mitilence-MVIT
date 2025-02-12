'use client';
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Departments() {
  return (
    <div
      className="text-white lg:p-10 px-6 py-8 flex flex-col items-center w-full gap-8 lg:gap-14"
    >
      <span
        style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 12px 0' }}
        className="text-[42px] lg:text-5xl text-center font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
      >
        Departments
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-6 lg:px-16">
        {[...Array(6)].map((_, i) => (
          <Link
            key={i}
            href={`/departments/${i}`}
            className="relative rounded-xl border-3 border-purple-500 overflow-hidden shadow-lg group cursor-pointer"
          >
            <span className="absolute top-3 left-4 bg-purple-600 text-white text-lg font-medium px-3 py-1 rounded-xl uppercase">
              CSE Dept
            </span>
            <img
              src="/image.png"
              alt="Event"
              className="w-full h-72 object-cover"
              loading="lazy"
              onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/events_fallback.png";
              }}
            />
            <div className="absolute bottom-3 right-3 bg-purple-600 text-white p-2 rounded-full transform transition-transform duration-300 group-hover:-translate-x-2 group-hover:translate-y-[-10px] group-hover:scale-110">
              <ArrowUpRight size={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}