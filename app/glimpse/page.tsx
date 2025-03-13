'use client';
import { Image } from "@heroui/image";
import { MVITShowcaseImg } from "@/variables";
import Footer from "@/components/internal/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GoogleMap } from "@/components/internal/googleMap";
import CrossVelocity from "@/components/internal/crossVelocity";
import HeaderSection from "@/components/internal/headerSection";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const GlimpseImages = [
  "https://ucarecdn.com/0195e9a9-b535-4cc2-b86d-8745a693e1bf/-/preview/1000x666/",
  "https://ucarecdn.com/37521bb7-7574-486c-9552-915c73f32dd9/-/preview/1000x666/",
  "https://ucarecdn.com/5865dde6-4faf-41bf-a299-0c5730201f4f/-/preview/1000x666/",
  "https://ucarecdn.com/b4e023b8-e3c6-4259-9f12-50242b349f43/-/preview/1000x666/",
  "https://ucarecdn.com/abf644d6-8a3f-43a1-9501-958b1ab50e7d/-/preview/1000x666/",
  "https://ucarecdn.com/98f2a894-3cf8-456e-9f8a-4d0395e4f0df/-/preview/1000x666/",
  "https://ucarecdn.com/405bf069-bcb4-4394-94f9-e1a26d476c51/-/preview/1000x666/",
  "https://ucarecdn.com/72e01d30-2828-4525-a30a-10d8324582c8/-/preview/1000x666/",
  "https://ucarecdn.com/1b8d2fa7-fc4d-4dc3-a448-60f4f119fe0f/-/preview/1000x666/",
  "https://ucarecdn.com/0aa5abc6-395a-4ee0-97dc-528d5e7ca376/-/preview/1000x666/",
  "https://ucarecdn.com/054c9d44-4fef-494b-bbff-f9eddf370708/-/preview/1000x666/",
  "https://ucarecdn.com/7eb92d6c-c469-455b-92b9-54b1b7669714/-/preview/1000x666/",
  "https://ucarecdn.com/afe32609-4088-4154-a351-ed399899cb58/-/preview/666x1000/",
  "https://ucarecdn.com/15d5f36f-0f4f-4b22-bf07-a87df5af9780/-/preview/1000x666/",
  "https://ucarecdn.com/efdb5753-d0fb-4868-af97-9d6593d84081/-/preview/1000x666/",
  "https://ucarecdn.com/eccc6574-18f2-4584-893c-dd65dd12b19c/-/preview/1000x666/",
  "https://ucarecdn.com/f5d204c1-a553-4254-999d-3d8bccb50769/-/preview/1000x666/",
  "https://ucarecdn.com/ef9181ae-82bc-4804-a2d1-6fd493ab4bd7/-/preview/1000x666/",
  "https://ucarecdn.com/679dae1d-1851-43ac-9418-d6c65538e42a/-/preview/1000x666/",
  "https://ucarecdn.com/28e61f4f-34f4-4604-858c-05a4b37cd8b1/-/preview/666x1000/",
  "https://ucarecdn.com/e8a9b76c-87f3-4d11-aec0-ebd21d4af38c/-/preview/1000x666/",
  "https://ucarecdn.com/1fe99bf3-b778-44bc-8cfd-004f26c30de8/-/preview/1000x666/",
  "https://ucarecdn.com/557020e2-bb06-4620-932e-d32fffaddb0f/-/preview/1000x666/",
  "https://ucarecdn.com/b2c4e21f-404f-4b75-8131-56e9cc724821/-/preview/1000x666/",
  "https://ucarecdn.com/de82b7bf-df10-4207-bfb1-b7d61d19efae/-/preview/1000x666/",
  "https://ucarecdn.com/0ad7d319-cd7a-4d7e-8056-e0bd353f35d9/-/preview/1000x666/",
  "https://ucarecdn.com/ae180b11-9dd7-4963-bfce-56a7c827c0e4/-/preview/1000x664/",
  "https://ucarecdn.com/032062d1-54f9-40b6-a0a0-7ec28e9963a3/-/preview/1000x666/",
  "https://ucarecdn.com/b42f5a65-11de-406a-aaa1-22237a6f54f1/-/preview/1000x666/",
  "https://ucarecdn.com/2cf1ee3e-9791-4f7e-b4ef-1f7c4ddd078d/-/preview/1000x666/",
  "https://ucarecdn.com/005a6a73-078b-42f8-a6f1-abfe1e8b8612/-/preview/1000x664/",
  "https://ucarecdn.com/fd7e423f-2c7c-4eb5-afd3-16150cdd2560/-/preview/999x664/",
  "https://ucarecdn.com/3093966c-0a5e-4c00-b8a1-120a839a021b/-/preview/1000x666/",
  "https://ucarecdn.com/0a9867ad-dc1c-4069-b0ce-8e5e0105ca57/-/preview/999x664/",
  "https://ucarecdn.com/b67ce831-cceb-4720-a3c7-4e8e4c954d2e/-/preview/999x664/",
  "https://ucarecdn.com/c031a126-5d7d-4fd4-aad9-fa93fab2bb1a/-/preview/999x664/",
  "https://ucarecdn.com/3a924c4a-cfae-4769-98fa-e7923032702e/-/preview/1000x664/",
  "https://ucarecdn.com/ff15558e-ff31-42e5-80fc-84277b50e7a2/-/preview/1000x664/",
  "https://ucarecdn.com/495900a6-94cd-4863-adb7-3ddc457dad26/-/preview/1000x664/",
  "https://ucarecdn.com/0a8a9646-caf9-4343-a0cb-cc45240e25a5/-/preview/999x664/",
  "https://ucarecdn.com/b3311ee8-ab0a-4021-aa57-5cbb4be286a9/-/preview/999x664/",
  "https://ucarecdn.com/760fea69-7b2b-4cde-bf71-9f44fcf11c8c/-/preview/999x664/",
  "https://ucarecdn.com/631cb2de-ec46-418e-9cda-e6545b080698/-/preview/999x664/",
  "https://ucarecdn.com/7949eaad-9cd9-4716-adcc-c43dc040efd8/-/preview/999x664/",
  "https://ucarecdn.com/9acdf87d-ac32-4610-a28b-a94b1df44afc/-/preview/999x664/",
  "https://ucarecdn.com/7e0cd770-5982-4a4a-96a1-37726cada908/-/preview/999x664/",
  "https://ucarecdn.com/11f9a619-9f62-4966-bb99-5ff636beec9d/-/preview/999x664/",
  "https://ucarecdn.com/43fb06f0-c33d-4f95-94bf-4ee6cc28fc2a/-/preview/999x664/",
  "https://ucarecdn.com/d00239e9-b6fd-4f16-99fa-e47caa187875/-/preview/999x664/",
  "https://ucarecdn.com/fa519c04-fdac-4816-b757-956cb2d4d74a/-/preview/999x664/",
  "https://ucarecdn.com/d0f04c05-daf8-4015-8854-d0a70341a806/-/preview/999x664/",
  "https://ucarecdn.com/5798f156-aa63-4dba-b041-03af7f5ea63e/-/preview/999x664/",
  "https://ucarecdn.com/0a7ddf23-0ddb-4487-a4ac-4d18a99f4541/-/preview/999x664/",
  "https://ucarecdn.com/5b39c72e-f5fd-410f-b392-4fd81313ac7c/-/preview/999x664/",
  "https://ucarecdn.com/058b40e8-688f-466d-ba34-b977e2760007/-/preview/999x664/",
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
        REGISTER NOW
      </CrossVelocity>
      <GoogleMap />
      <Footer />
    </div>
  )
}