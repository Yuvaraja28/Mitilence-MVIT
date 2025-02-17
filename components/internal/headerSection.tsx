type HeaderSectionProps = {
  bannerName: string;
  bannerImg: string;
}

export default function HeaderSection({ bannerName, bannerImg }: HeaderSectionProps) {
  return (
    <div
      className="h-[23vh] lg:h-[33vh] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
      role="img"
      aria-label="Landing Developer"
    >
      <div
        style={{ textShadow: '2px 2px 20px black' }}
        className="absolute text-white text-center self-center mt-[14.5vh] lg:mt-[17vh] font-medium text-4xl lg:text-[3em]"
      >
        {bannerName}
      </div>
      <span
        className="bg-gradientLandingHeader w-full h-[10vh]"
      />
      <div
        className="w-full h-[10vh] bg-gradient-to-t from-[#0F1110] to-transparent"
      />
    </div>
  )
}