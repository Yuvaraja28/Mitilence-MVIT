"use client";

const departments = [
  {
    id: "DEPT_001",
    icon: "terminal",
    name: "CSE",
    description: "Neural networks and deep-dive programming protocols.",
    cta: "INITIATE_HACK",
    hoverBg: "hover:bg-primary",
    hoverText: "group-hover:text-black",
  },
  {
    id: "DEPT_002",
    icon: "memory",
    name: "ECE",
    description: "Hardware modifications and signal interception.",
    cta: "ACCESS_CIRCUIT",
    hoverBg: "hover:bg-accent",
    hoverText: "group-hover:text-white",
  },
  {
    id: "DEPT_003",
    icon: "lan",
    name: "IT",
    description: "Global network infrastructure and cloud-ops.",
    cta: "LINK_ESTABLISHED",
    hoverBg: "hover:bg-secondary",
    hoverText: "group-hover:text-black",
  },
  {
    id: "DEPT_004",
    icon: "precision_manufacturing",
    name: "MECH",
    description: "Robotic exo-skeletons and industrial automation.",
    cta: "IGNITION_SEQ",
    hoverBg: "hover:bg-white",
    hoverText: "group-hover:text-black",
  },
];

export default function Departments() {
  return (
    <section className="py-24 relative" id="departments">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="font-orbitron text-4xl font-black italic uppercase">
              <span className="text-primary">CORE</span> DEPARTMENTS
            </h2>
            <div className="h-1 w-32 bg-primary mt-2"></div>
          </div>
          <span className="font-mono text-xs text-primary bg-primary/10 px-4 py-2 border border-primary/20 rounded-cyber tracking-tighter">
            DIRECTORY: 04_ACTIVE_UNITS
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className={`cyber-card group p-8 bg-tech-gray/50 ${dept.hoverBg} transition-all duration-300`}
            >
              <div
                className={`absolute top-2 right-4 font-mono text-[10px] text-primary/30 ${dept.hoverText}/30`}
              >
                {dept.id}
              </div>
              <span
                className={`material-symbols-outlined text-5xl text-primary ${dept.hoverText} mb-6`}
              >
                {dept.icon}
              </span>
              <h3
                className={`font-orbitron text-2xl font-black mb-2 uppercase ${dept.hoverText}`}
              >
                {dept.name}
              </h3>
              <p
                className={`font-rajdhani text-sm text-white/60 ${dept.hoverText}/80 mb-6`}
              >
                {dept.description}
              </p>
              <div
                className={`font-mono text-[10px] font-bold tracking-widest text-primary ${dept.hoverText} border border-primary group-hover:border-black/30 px-2 py-1 inline-block`}
              >
                {dept.cta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
