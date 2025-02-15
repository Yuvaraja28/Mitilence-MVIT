'use client';

export default function About() {
  return (
    <div
      className="mt-[-8.5vh] h-[100vh] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
      role="img"
      aria-label="Landing Developer"
    >
      <video
        loop
        muted
        autoPlay
        src="https://ucarecdn.com/65640dde-41f4-4657-89d1-8c27e03c8abc/"
        className="object-cover h-[100vh] w-full"
      />
      <span
        className="absolute text-white text-[4em] px-8 py-5 rounded-full leading-[1em] backdrop-blur-xl text-center font-medium"
      >
        Manakula Vinayagar Institute of Technology
      </span>
    </div>
  )
}