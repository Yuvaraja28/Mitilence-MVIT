"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 flex flex-col items-center justify-center">
      <div className="relative z-10 w-full max-w-7xl px-6 py-20 text-center">
        {/* Prize Tag */}
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="bg-accent text-white px-4 py-2 font-[var(--font-orbitron)] font-black text-sm uppercase skew-x-[-10deg] prize-glow">
            PRIZE POOL: ₹1.5 LAKHS
          </div>
        </div>

        {/* Location Badge */}
        <div className="inline-block border border-primary/30 p-1 mb-6 rounded-cyber bg-black/40">
          <div className="bg-primary/10 text-primary px-4 py-1 font-mono font-bold text-xs uppercase tracking-widest">
            LOCATION: NIGHT CITY // NEURAL_ID: 026-X
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-[var(--font-orbitron)] text-7xl md:text-9xl font-black italic tracking-tighter mb-4 glitch-text leading-none">
          MITILENCE<span className="text-primary">&apos;26</span>
        </h1>

        <p className="font-mono text-primary text-lg md:text-xl mb-12 uppercase tracking-[0.4em]">
          &lt; SYMPOSIUM_PROTOCOL_v4.0 &gt;
        </p>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="w-24 h-24 border border-primary/40 rounded-cyber flex flex-col items-center justify-center bg-black/60 backdrop-blur">
            <span className="text-3xl font-[var(--font-orbitron)] font-black text-primary">
              08
            </span>
            <span className="text-[10px] font-mono text-white/50 uppercase">
              Days
            </span>
          </div>
          <div className="w-24 h-24 border border-primary/40 rounded-cyber flex flex-col items-center justify-center bg-black/60 backdrop-blur">
            <span className="text-3xl font-[var(--font-orbitron)] font-black text-primary">
              12
            </span>
            <span className="text-[10px] font-mono text-white/50 uppercase">
              Hours
            </span>
          </div>
          <div className="w-24 h-24 border border-primary/40 rounded-cyber flex flex-col items-center justify-center bg-black/60 backdrop-blur">
            <span className="text-3xl font-[var(--font-orbitron)] font-black text-primary">
              45
            </span>
            <span className="text-[10px] font-mono text-white/50 uppercase">
              Mins
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="cyber-button bg-accent text-white px-12 py-5 font-[var(--font-orbitron)] font-black text-2xl uppercase italic tracking-widest shadow-[8px_8px_0px_#fcee0a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          ENTER SUB-GRID
        </button>
      </div>

      {/* Hazard Bottom Bar */}
      <div className="absolute bottom-0 w-full h-10 hazard-bg opacity-40"></div>
    </section>
  );
}
