"use client";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCR12vln5Kycub8JvsJ-4J54U5fQq7qj9gScGzuc8mrf1cVHuoxi1aQ9k68kv7H84oJzvhlPoQluyeJUJG7xSF2354ZOGkluwoU1PasBYFG4dmR8F-wk0rIV4spX0lAGsnlwpMIDxknR9RE6ovEMLuGXPWkkqmhPYnY_BJlqly5z4zkDhOZURL_Bq_QfCu3bhdOu9Udzp7bz4iS9UZLgKTVfw1UDYZWqQrRS9wAex8z-rMK6A5H-DE9xvxZYzHbo1TGKlHlo85leh4E",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCR12vln5Kycub8JvsJ-4J54U5fQq7qj9gScGzuc8mrf1cVHuoxi1aQ9k68kv7H84oJzvhlPoQluyeJUJG7xSF2354ZOGkluwoU1PasBYFG4dmR8F-wk0rIV4spX0lAGsnlwpMIDxknR9RE6ovEMLuGXPWkkqmhPYnY_BJlqly5z4zkDhOZURL_Bq_QfCu3bhdOu9Udzp7bz4iS9UZLgKTVfw1UDYZWqQrRS9wAex8z-rMK6A5H-DE9xvxZYzHbo1TGKlHlo85leh4E",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCR12vln5Kycub8JvsJ-4J54U5fQq7qj9gScGzuc8mrf1cVHuoxi1aQ9k68kv7H84oJzvhlPoQluyeJUJG7xSF2354ZOGkluwoU1PasBYFG4dmR8F-wk0rIV4spX0lAGsnlwpMIDxknR9RE6ovEMLuGXPWkkqmhPYnY_BJlqly5z4zkDhOZURL_Bq_QfCu3bhdOu9Udzp7bz4iS9UZLgKTVfw1UDYZWqQrRS9wAex8z-rMK6A5H-DE9xvxZYzHbo1TGKlHlo85leh4E",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCR12vln5Kycub8JvsJ-4J54U5fQq7qj9gScGzuc8mrf1cVHuoxi1aQ9k68kv7H84oJzvhlPoQluyeJUJG7xSF2354ZOGkluwoU1PasBYFG4dmR8F-wk0rIV4spX0lAGsnlwpMIDxknR9RE6ovEMLuGXPWkkqmhPYnY_BJlqly5z4zkDhOZURL_Bq_QfCu3bhdOu9Udzp7bz4iS9UZLgKTVfw1UDYZWqQrRS9wAex8z-rMK6A5H-DE9xvxZYzHbo1TGKlHlo85leh4E",
];

export default function About() {
  return (
    <section
      className="py-24 bg-primary text-black relative z-10 rounded-t-[40px] md:rounded-t-[80px]"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <div className="inline-block bg-black text-primary px-3 py-1 font-mono text-xs rounded-sm">
            // MISSION_DIRECTIVE_26
          </div>
          <h2 className="font-orbitron text-5xl italic uppercase leading-none">
            GEAR UP,
            <br />
            OPERATIVE.
          </h2>
          <p className="text-xl font-medium leading-relaxed font-rajdhani">
            The city never sleeps, and neither does the network. Mitilence
            &apos;26 is the ultimate proving ground. Overload the circuits and
            redefine the technical frontier.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div className="border-l-4 border-black pl-4">
              <div className="font-orbitron text-4xl">
                40+
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest">
                CYBER MISSIONS
              </div>
            </div>
            <div className="border-l-4 border-black pl-4">
              <div className="font-orbitron text-4xl">
                1.5L
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest">
                BOUNTY CREDITS
              </div>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-cyber border-2 border-black group h-64 ${index === 1
                ? "mt-8"
                : index === 2
                  ? "-mt-8"
                  : ""
                }`}
            >
              <img
                alt="Tech Gallery"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-500"
                src={src}
              />
              <div className="scanning-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
