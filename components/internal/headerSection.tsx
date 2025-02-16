type HeaderSectionProps = {
  bannerName: string;
  bannerImg: string;
}

export default function HeaderSection({ bannerName, bannerImg }: HeaderSectionProps) {
  return (
    <div
      className="h-[23vh] lg:h-[35vh] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
      role="img"
      aria-label="Landing Developer"
    >
      <div
        className="absolute text-white text-center self-center mt-[13.5vh] lg:mt-[17.5vh] font-medium text-4xl lg:text-[3.5em]"
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