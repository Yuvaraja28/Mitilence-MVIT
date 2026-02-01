"use client";

const timelineItems = [
  {
    time: "09:00 AM // CYCLE_01",
    title: "NEURAL UPLOAD (Registration)",
    description:
      "Operatives check-in at the main hub for biometric verification.",
    color: "primary",
  },
  {
    time: "11:00 AM // CYCLE_01",
    title: "SYSTEM BREACH (Keynote)",
    description:
      "Opening ceremony and grand directive announcement from the collective.",
    color: "primary",
  },
  {
    time: "02:00 PM // CYCLE_01",
    title: "CODE OVERRIDE (Workshops)",
    description:
      "Simultaneous technical sessions across all department nodes.",
    color: "primary",
  },
  {
    time: "08:00 PM // CYCLE_01",
    title: "DARK NET (Networking)",
    description:
      "Unstructured communication and collaborative planning sessions.",
    color: "primary",
  },
  {
    time: "09:00 AM // CYCLE_02",
    title: "MAIN SHOWDOWN (Competition)",
    description: "The final arena battle for the ₹1.5L prize pool.",
    color: "accent",
  },
];

export default function Timeline() {
  return (
    <section className="py-24 bg-black/40" id="timeline">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-orbitron text-3xl font-black italic uppercase mb-12 text-primary">
          SYSTEM_TIMELINE
        </h2>

        <div className="flex overflow-x-auto pb-8 dossier-scroll gap-6 snap-x">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`min-w-[300px] snap-center bg-tech-gray p-6 rounded-cyber border ${item.color === "accent"
                ? "border-accent/20"
                : "border-primary/20"
                } relative`}
            >
              <span
                className={`font-mono text-xs block mb-2 ${item.color === "accent" ? "text-accent" : "text-primary"
                  }`}
              >
                {item.time}
              </span>
              <h4 className="font-orbitron text-xl text-white mb-4">
                {item.title}
              </h4>
              <p className="text-white/50 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
