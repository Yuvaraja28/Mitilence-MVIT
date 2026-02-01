"use client";

export default function SystemDiag() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 w-48 h-64 hidden xl:flex flex-col z-90 pointer-events-none">
      <div className="bg-black/40 border-l-2 border-primary/40 p-3 rounded-cyber hud-log-scroll">
        <p className="font-mono text-[9px] text-primary/60 mb-2 uppercase">
          System_Diag [Active]
        </p>
        <div className="space-y-1 font-mono text-[8px] text-primary/40">
          <p>&gt; Initializing Neural Link...</p>
          <p>&gt; Sector 26 Loaded</p>
          <p>&gt; Prize Pool Verified</p>
          <p>&gt; Operatives Online: 1,429</p>
          <p>&gt; Trace Level: Zero</p>
          <p>&gt; Data Packets Received</p>
          <p>&gt; Encryption: Stable</p>
        </div>
      </div>
    </div>
  );
}
