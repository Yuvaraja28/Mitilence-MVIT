"use client";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-primary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0">
          {/* Logo & Terminal Log */}
          <div className="max-w-sm">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
                <span className="material-symbols-outlined text-black text-sm font-bold">
                  bolt
                </span>
              </div>
              <span className="font-orbitron font-black text-xl tracking-tighter text-primary">
                MITILENCE &apos;26
              </span>
            </div>
            <p className="font-mono text-[11px] text-white/40 uppercase leading-loose border-l-2 border-primary/20 pl-4">
              // TERMINAL_LOG: SHUTDOWN_SEQUENCE_HALTED
              <br />
              // ENCRYPTION: MIL_SPEC_AES_256
              <br />
              // SECTOR: 26_CENTRAL_CORE_V4
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-16 md:gap-32">
            <div>
              <h4 className="font-orbitron text-xs font-bold text-primary mb-6 uppercase tracking-widest border-b border-primary/20 pb-2">
                Protocols
              </h4>
              <ul className="font-mono text-[10px] space-y-3 text-white/50">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    SECURITY_COMPLIANCE
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    NEURAL_AGREEMENT
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    CONDUCT_OVERRIDE
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron text-xs font-bold text-primary mb-6 uppercase tracking-widest border-b border-primary/20 pb-2">
                Network
              </h4>
              <ul className="font-mono text-[10px] space-y-3 text-white/50">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    INSTAGRAM_NODE
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    LINKEDIN_UPLINK
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    SECURE_DISCORD
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] text-white/20 italic uppercase">
            © 2026 CYBER_TECH_COLLECTIVE. ALL RIGHTS DECRYPTED. WAKE UP,
            SAMURAI.
          </div>
          <div className="flex space-x-3">
            <div className="w-6 h-6 bg-primary rounded-sm opacity-50"></div>
            <div className="w-6 h-6 bg-accent rounded-sm opacity-50"></div>
            <div className="w-6 h-6 bg-secondary rounded-sm opacity-50"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
