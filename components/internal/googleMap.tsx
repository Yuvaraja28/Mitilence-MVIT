import { MapPin } from "lucide-react";
import Link from "next/link";

export function GoogleMap() {
  return (
    <div className="flex flex-col items-center gap-8 p-4 text-white">
      <span
        style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 12px 0' }}
        className="text-3xl text-center lg:text-5xl font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
      >
        Get Directions to Mitilence
      </span>
      <Link
        href={"https://maps.app.goo.gl/bozA5YT7Mj6DQYyq5"}
        className="flex flex-row items-center justify-center gap-2 lg:text-[22px] font-medium uppercase mb-2 underline"
      >
        <MapPin className="text-purpleAccent" /> Manakula Vinayagar Institute of Technology
      </Link>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.747195378548!2d79.62434117514009!3d11.922673688304519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5358e064c07657%3A0x2e53db2890f095ea!2sManakula%20Vinayagar%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1739144911693!5m2!1sen!2sin"
        width="100%"
        height="400"
        loading="lazy"
        allowFullScreen={false}
        className="rounded-2xl"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
