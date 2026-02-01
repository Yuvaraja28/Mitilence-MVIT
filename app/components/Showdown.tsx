"use client";

export default function Showdown() {
  return (
    <section className="py-24" id="showdown">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center space-x-4 mb-12">
          <span className="w-3 h-3 bg-accent animate-pulse rounded-full"></span>
          <h2 className="font-orbitron text-4xl font-black italic uppercase">
            SHOWDOWN_FEED_V2.0
          </h2>
        </div>

        <div className="relative group bg-tech-gray p-1 border border-primary/40 rounded-cyber overflow-hidden">
          <div className="aspect-video bg-zinc-900 rounded-[8px] overflow-hidden flex items-center justify-center relative">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR12vln5Kycub8JvsJ-4J54U5fQq7qj9gScGzuc8mrf1cVHuoxi1aQ9k68kv7H84oJzvhlPoQluyeJUJG7xSF2354ZOGkluwoU1PasBYFG4dmR8F-wk0rIV4spX0lAGsnlwpMIDxknR9RE6ovEMLuGXPWkkqmhPYnY_BJlqly5z4zkDhOZURL_Bq_QfCu3bhdOu9Udzp7bz4iS9UZLgKTVfw1UDYZWqQrRS9wAex8z-rMK6A5H-DE9xvxZYzHbo1TGKlHlo85leh4E"
              alt="Video Background"
            />
            <div className="z-20 flex flex-col items-center">
              <button className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center bg-black/60 hover:bg-primary group/play transition-all duration-300">
                <span className="material-symbols-outlined text-primary group-hover/play:text-black text-5xl ml-1">
                  play_arrow
                </span>
              </button>
              <p className="mt-4 font-mono text-sm tracking-[0.2em] text-primary bg-black/80 px-4 py-1">
                STREAMING_ENCRYPTED_SIGNAL
              </p>
            </div>
            <div className="scanning-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
