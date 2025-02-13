import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function CrossVelocity({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center flex-col h-[25vh] select-none"
    >
      <VelocityScroll
        numRows={1}
        defaultVelocity={3}
        className="absolute sm:-rotate-[4deg] -rotate-[6deg] sm:py-1 sm:pb-[5px] py-0 bg-purpleAccent text-white font-medium lg:!text-[22px] !text-xl w-full overflow-clip"
      >
        {children}
      </VelocityScroll>
      <VelocityScroll
        numRows={1}
        defaultVelocity={-3}
        className="absolute !z-999 sm:sm:rotate-[4deg] rotate-[6deg] sm:py-1 sm:pb-[5px] py-0 bg-purpleAccent text-white font-medium lg:!text-[22px] !text-xl w-full overflow-clip"
      >
        {children}
      </VelocityScroll>
    </div>
  )
}