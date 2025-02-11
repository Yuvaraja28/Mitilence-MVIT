import { ArrowUpRight } from 'lucide-react';
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function LineVelocity() {
  return (
    <VelocityScroll
      numRows={1}
      defaultVelocity={4}
      direction={'forward'}
      className="pt-1 pb-0.5 bg-purpleAccent text-white font-medium !text-lg w-full select-none uppercase"
    >
      Register
    </VelocityScroll>
  )
}