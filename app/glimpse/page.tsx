'use client';
import { Image } from "@heroui/image";
import Footer from "@/components/internal/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GoogleMap } from "@/components/internal/googleMap";
import CrossVelocity from "@/components/internal/crossVelocity";
import HeaderSection from "@/components/internal/headerSection";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { GlimpseImages, MitilenceDate, MVITShowcaseImg } from "@/variables";

export default function Glimpse() {
  return (
    <div
      className="flex flex-col items-center text-white"
    >
      <HeaderSection
        bannerName={"Glimpse"}
        bannerImg={MVITShowcaseImg}
      />
      <div
        className="flex flex-col gap-8 w-[90%] mt-6 mb-10"
      >
        <span
          style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 15px 2px' }}
          className="text-[42px] leading-[3.42rem] lg:text-5xl text-center font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
        >
          Glimpse of Mitilence
        </span>
        <div
          className="flex items-center justify-center flex-col"
        >
          <span
            className="text-center text-xl"
          >
            MITILENCE, is a prestigious annual event hosted by our Manakula Vinayagar Institute of Technology. Its primary objective is to ignite students' talents and offer them opportunities to explore the latest technological advancements. MITILENCE provides a platform for students to exhibit their expertise in coding, design, innovation, and problem-solving while also participating in engaging and creative activities. The event showcases a vibrant blend of technical and non-technical competitions, fostering learning, teamwork, and enthusiasm among all participants.
          </span>
        </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1, 520: 2, 900: 3 }}>
          <Masonry gutter="16px">
            {GlimpseImages.map((glimpse, idx) =>
              <BlurFade
                inView
                key={idx}
                delay={0.1 + (idx+1) * 0.05}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}${glimpse}`}
                  alt={"Glimpse"}
                  loading="lazy"
                  className="object-cover rounded-2xl"
                />
              </BlurFade>
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <CrossVelocity>
        {(MitilenceDate > new Date()) ?
          "REGISTER NOW"
          :
          "WRAPPING UP"
        }
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </div>
  )
}