"use client";

const operatives = [
  {
    id: "#_ADMIN_ACCESS",
    name: "COMMANDER ALPHA",
    role: "ROLE: LEAD_ARCHITECT",
    icon: "fingerprint",
    color: "primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCR12vln5Kycub8JvsJ-4J54U5fQq7qj9gScGzuc8mrf1cVHuoxi1aQ9k68kv7H84oJzvhlPoQluyeJUJG7xSF2354ZOGkluwoU1PasBYFG4dmR8F-wk0rIV4spX0lAGsnlwpMIDxknR9RE6ovEMLuGXPWkkqmhPYnY_BJlqly5z4zkDhOZURL_Bq_QfCu3bhdOu9Udzp7bz4iS9UZLgKTVfw1UDYZWqQrRS9wAex8z-rMK6A5H-DE9xvxZYzHbo1TGKlHlo85leh4E",
  },
  {
    id: "#_CORE_DEV",
    name: "NEURAL RUNNER",
    role: "ROLE: SECURITY_EXPERT",
    icon: "security",
    color: "accent",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCR12vln5Kycub8JvsJ-4J54U5fQq7qj9gScGzuc8mrf1cVHuoxi1aQ9k68kv7H84oJzvhlPoQluyeJUJG7xSF2354ZOGkluwoU1PasBYFG4dmR8F-wk0rIV4spX0lAGsnlwpMIDxknR9RE6ovEMLuGXPWkkqmhPYnY_BJlqly5z4zkDhOZURL_Bq_QfCu3bhdOu9Udzp7bz4iS9UZLgKTVfw1UDYZWqQrRS9wAex8z-rMK6A5H-DE9xvxZYzHbo1TGKlHlo85leh4E",
  },
  {
    id: "#_DESIGN_OP",
    name: "PIXEL GHOST",
    role: "ROLE: UI_CONTRACTOR",
    icon: "visibility",
    color: "secondary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCR12vln5Kycub8JvsJ-4J54U5fQq7qj9gScGzuc8mrf1cVHuoxi1aQ9k68kv7H84oJzvhlPoQluyeJUJG7xSF2354ZOGkluwoU1PasBYFG4dmR8F-wk0rIV4spX0lAGsnlwpMIDxknR9RE6ovEMLuGXPWkkqmhPYnY_BJlqly5z4zkDhOZURL_Bq_QfCu3bhdOu9Udzp7bz4iS9UZLgKTVfw1UDYZWqQrRS9wAex8z-rMK6A5H-DE9xvxZYzHbo1TGKlHlo85leh4E",
  },
];

export default function Dossier() {
  const getColorClass = (color: string, type: "text" | "border" | "hover") => {
    const map: Record<string, Record<string, string>> = {
      primary: {
        text: "text-primary",
        border: "border-primary/40",
        hover: "hover:text-primary",
      },
      accent: {
        text: "text-accent",
        border: "border-accent/40",
        hover: "hover:text-accent",
      },
      secondary: {
        text: "text-secondary",
        border: "border-secondary/40",
        hover: "hover:text-secondary",
      },
    };
    return map[color]?.[type] || "";
  };

  return (
    <section className="py-24" id="dossiers">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-orbitron text-3xl font-black italic uppercase mb-12 text-center text-primary tracking-widest">
          FIELD_OPERATIVES_DOSSIER
        </h2>

        <div className="flex overflow-x-auto space-x-8 pb-12 dossier-scroll snap-x">
          {operatives.map((op, index) => (
            <div
              key={index}
              className="min-w-[320px] snap-center bg-black/60 cyber-card p-8 relative"
            >
              <div className={`absolute top-4 right-4 ${getColorClass(op.color, "text")}/20`}>
                <span className="material-symbols-outlined text-3xl">
                  {op.icon}
                </span>
              </div>

              <div
                className={`w-40 h-40 bg-tech-gray mb-8 ${getColorClass(
                  op.color,
                  "border"
                )} border-2 p-1 rounded-cyber relative overflow-hidden group`}
              >
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  src={op.image}
                  alt={op.name}
                />
                <div className="scanning-line"></div>
              </div>

              <div className="space-y-4">
                <div>
                  <p
                    className={`font-mono text-[10px] ${getColorClass(
                      op.color,
                      "text"
                    )}/60`}
                  >
                    {op.id}
                  </p>
                  <h3
                    className={`font-orbitron text-2xl font-black uppercase ${getColorClass(
                      op.color,
                      "text"
                    )}`}
                  >
                    {op.name}
                  </h3>
                  <p className="font-mono text-xs text-white/40 mt-1">
                    {op.role}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <a
                    className={`text-white/40 ${getColorClass(
                      op.color,
                      "hover"
                    )} transition-colors`}
                    href="#"
                  >
                    <span className="material-symbols-outlined text-lg">
                      terminal
                    </span>
                  </a>
                  <a
                    className={`text-white/40 ${getColorClass(
                      op.color,
                      "hover"
                    )} transition-colors`}
                    href="#"
                  >
                    <span className="material-symbols-outlined text-lg">
                      public
                    </span>
                  </a>
                  <a
                    className={`text-white/40 ${getColorClass(
                      op.color,
                      "hover"
                    )} transition-colors`}
                    href="#"
                  >
                    <span className="material-symbols-outlined text-lg">
                      share
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
