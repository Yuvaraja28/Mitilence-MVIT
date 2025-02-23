'use client';
import { Image } from "@heroui/image";
import { MVITShowcaseImg } from "@/variables";
import Footer from "@/components/internal/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GoogleMap } from "@/components/internal/googleMap";
import CrossVelocity from "@/components/internal/crossVelocity";
import HeaderSection from "@/components/internal/headerSection";

const GlimpseImages = [
  "https://ucarecdn.com/6f075f18-0680-4e5a-9888-2fd28fc418b6/-/preview/1000x666/",
  "https://ucarecdn.com/f3695066-47a4-4d63-b536-58bf2dc394ea/-/preview/999x730/",
  "https://ucarecdn.com/642445d7-aee8-4ee9-b75c-468b9e798149/-/preview/1000x666/",
  "https://ucarecdn.com/b62bdf61-6a22-4587-a73d-b906ca152d70/-/preview/1000x666/",
  "https://ucarecdn.com/efeb3092-3f89-418f-a3ab-f64ea7b58bbe/-/preview/1000x666/",
  "https://ucarecdn.com/aad77b18-049a-44bd-8ffb-d9e2dbcedf0a/-/preview/1000x666/",
  "https://ucarecdn.com/798b1db3-894c-4301-832e-79c94e847b87/-/preview/1000x666/",
  "https://ucarecdn.com/eaf18992-feef-4058-97f7-2b3763e8bab1/-/preview/1000x666/",
  "https://ucarecdn.com/ed61a60a-2940-452b-83b8-1ffdc0c11f0f/-/preview/666x1000/",
  "https://ucarecdn.com/934b2894-fc51-417f-8033-0cc1ab7d4d64/-/preview/666x1000/",
  "https://ucarecdn.com/41c071ed-b591-4c50-adfc-a5976f43a3db/-/preview/1000x666/",
  "https://ucarecdn.com/421965db-7cbc-4a0f-901f-042461aeb257/-/preview/1000x666/",
  "https://ucarecdn.com/60b1427e-b610-4d74-a06b-4401008b903b/-/preview/1000x666/",
  "https://ucarecdn.com/2904a322-b68e-4482-8adb-8eb959fbc35a/-/preview/1000x666/",
  "https://ucarecdn.com/a0fc8baf-6209-4ea1-98e9-e718eb24531e/-/preview/1000x666/",
  "https://ucarecdn.com/12529acb-3162-48b6-8b20-2efd002e62ab/-/preview/1000x666/",
  "https://ucarecdn.com/a57ee90c-ff3c-415d-a30f-36ce62f8a435/-/preview/999x664/"
]

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
          className="text-[42px] lg:text-5xl text-center font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
        >
          Glimpse of Mitilence
        </span>
        <div
          className="flex items-center justify-center flex-col"
        >
          <span
            className="text-center text-xl"
          >
            Mitilance is a premier event at Manakula Vinayagar Institute of Technology, featuring a dynamic mix of technical and non-technical competitions. This event serves as a platform for students to showcase their skills in coding, design, innovation, and problem-solving while also engaging in fun and creative activities. Mitilance fosters learning, teamwork, and excitement for all participants.
          </span>
        </div>
        <div
          className="columns-1 md:columns-2 lg:columns-3 h-full gap-[10px] sm:gap-[16px]"
        >
          {GlimpseImages.map((glimpe, idx) =>
            <BlurFade
              inView
              key={idx}
              delay={0.1 + (idx+1) * 0.05}
            >
              <Image
                src={glimpe}
                alt={"Glimpse"}
                className="object-cover rounded-2xl mb-5"
              />
            </BlurFade>
          )}
        </div>
      </div>
      <CrossVelocity>
        REGISTER NOW
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </div>
  )
}