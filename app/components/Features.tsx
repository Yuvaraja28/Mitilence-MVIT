"use client";

const features = [
  {
    icon: "hub",
    title: "ELITE NETWORKING",
    description:
      "Connect with industry hackers and corporate titans in the heart of the tech underground.",
    color: "primary",
  },
  {
    icon: "psychology",
    title: "AUGMENTED SKILLS",
    description:
      "Hardcode your future with workshops that bypass the standard curriculum protocols.",
    color: "accent",
  },
  {
    icon: "military_tech",
    title: "LEGENDARY REWARDS",
    description:
      "Secure the bag with ₹1.5L prize pool and exclusive corpo-grade certifications.",
    color: "secondary",
  },
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`cyber-card p-8 bg-black/40 ${feature.color === "accent"
                  ? "border-accent/30"
                  : feature.color === "secondary"
                    ? "border-secondary/30"
                    : ""
                }`}
            >
              <span
                className={`material-symbols-outlined text-4xl mb-4 ${feature.color === "accent"
                    ? "text-accent"
                    : feature.color === "secondary"
                      ? "text-secondary"
                      : "text-primary"
                  }`}
              >
                {feature.icon}
              </span>
              <h3
                className={`font-[var(--font-orbitron)] text-xl font-bold mb-3 ${feature.color === "accent"
                    ? "text-accent"
                    : feature.color === "secondary"
                      ? "text-secondary"
                      : "text-primary"
                  }`}
              >
                {feature.title}
              </h3>
              <p className="font-[var(--font-rajdhani)] text-white/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
