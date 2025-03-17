'use client';
import { Image } from "@heroui/image";
import { MitilenceDate, MVITShowcaseImg } from "@/variables";
import Footer from "@/components/internal/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GoogleMap } from "@/components/internal/googleMap";
import CrossVelocity from "@/components/internal/crossVelocity";
import HeaderSection from "@/components/internal/headerSection";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const GlimpseImages = [
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(21).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(20).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(19).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(18).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(17).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(22).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(16).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(15).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(14).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(13).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(12).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(11).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(9).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(8).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(7).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(6).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(5).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(4).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(10).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(2).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(1).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(55).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(54).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(3).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(51).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(50).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(48).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(49).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(52).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(53).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(47).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(46).jpg",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(44).jpg",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(43).jpg",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(42).jpg",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(41).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(40).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(39).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(38).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(37).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(36).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(35).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(34).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(33).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(32).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(31).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(30).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(29).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(28).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(27).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(26).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(25).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(24).JPG",
  "https://ik.imagekit.io/azpbhf6oa/Mitilence'25/Glimpse-Images/glimpse%20(23).JPG",
];

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
            {GlimpseImages.map((glimpe, idx) =>
              <BlurFade
                inView
                key={idx}
                delay={0.1 + (idx+1) * 0.05}
              >
                <Image
                  src={glimpe}
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