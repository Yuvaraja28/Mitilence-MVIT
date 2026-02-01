"use client";

const faqItems = [
  {
    question: "How to access the sub-grid?",
    answer:
      "Initiate the registration protocol through our secure portal. Once verified, your neural ID will be activated for all sectors.",
  },
  {
    question: "Eligibility for bounty credits?",
    answer:
      "All currently enrolled technical operatives (students) are eligible for the ₹1.5L prize pool. External mercenaries can participate in non-bounty tracks.",
  },
  {
    question: "System requirements?",
    answer:
      "Bring your own portable deck (Laptop). High-speed neural link (Wi-Fi) and power cells will be provided at the hub.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-black/40" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-[var(--font-orbitron)] text-3xl font-black italic uppercase mb-12 text-center text-primary">
          DATA_DECRYPTION [FAQ]
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group cyber-card bg-tech-gray/30 overflow-hidden"
            >
              <summary className="flex justify-between items-center p-6 cursor-pointer font-[var(--font-orbitron)] text-lg uppercase text-primary/80 group-open:text-primary">
                <span>{item.question}</span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="p-6 pt-0 font-[var(--font-rajdhani)] text-white/60 border-t border-primary/10">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
