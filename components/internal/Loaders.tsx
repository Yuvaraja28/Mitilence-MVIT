import { CircularProgress } from "@heroui/progress";

export function CircularLoader() {
  return (
    <CircularProgress
      aria-label="Loading..."
      className="mt-8"
      size="lg"
      strokeWidth={3}
      classNames={{
        track: "stroke-white/10",
        svg: "w-16 h-16 drop-shadow-md",
        indicator: 'stroke-purpleAccent'
      }}
    />
  )
}