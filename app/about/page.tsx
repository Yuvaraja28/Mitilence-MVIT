export default function About() {
  return (
    <div
      className="mt-[-8.5vh] h-[100vh] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      role="img"
      aria-label="Landing Developer"
    >
      <video
        loop
        muted
        autoPlay
        src="/videos/mitilence.mp4"
        className="object-cover h-[100vh]"
      />
    </div>
  )
}