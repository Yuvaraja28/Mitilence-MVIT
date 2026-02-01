"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-100 bg-black/90 backdrop-blur-md border-b-2 border-primary">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
            <span className="material-symbols-outlined text-black font-bold">
              bolt
            </span>
          </div>
          <span className="font-orbitron font-black text-2xl tracking-tighter text-primary">
            MITILENCE &apos;26
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 font-mono text-xs uppercase tracking-widest text-primary/80">
          <a className="hover:text-primary transition-colors" href="#about">
            // INTEL
          </a>
          <a
            className="hover:text-primary transition-colors"
            href="#departments"
          >
            // DEPARTMENTS
          </a>
          <a className="hover:text-primary transition-colors" href="#timeline">
            // TIMELINE
          </a>
          <a className="hover:text-primary transition-colors" href="#faq">
            // DECRYPT
          </a>
        </div>

        {/* CTA */}
        <button className="cyber-button bg-primary text-black px-6 py-2 font-orbitron font-bold text-sm">
          INITIALIZE_OS
        </button>
      </div>
    </nav>
  );
}
