"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { 
    "question": "Who can participate in Mitilence?", 
    "answer": "Mitilence is open to all students of MVIT as well as participants from other colleges. Some events may have specific eligibility criteria." 
  },
  { 
    "question": "How can I register for the events?", 
    "answer": "Participants can register online through the official Mitilence website or register on-spot for select events during the fest." 
  },
  { 
    "question": "Is there an entry fee for the fest?", 
    "answer": "Some events require a registration fee, while others are free to participate. Detailed fee structures are available on the event website." 
  },
  { 
    "question": "Will there be prizes for the competitions?", 
    "answer": "Yes! Winners will receive cash prizes, certificates, and exclusive goodies for various competitions." 
  },
  { 
    "question": "Where will Mitilence take place?", 
    "answer": "The fest will be hosted at MVIT campus, with different activities scheduled at designated venues across the college." 
  },
  { 
    "question": "How can I stay updated about the event schedule?", 
    "answer": "Stay connected through the official Mitilence website and follow our social media pages for real-time updates on schedules, registrations, and announcements." 
  },
  { 
    "question": "Whom should I contact for more details?", 
    "answer": "For any queries, you can reach out to the organizing committee through the contact information available on the official website." 
  }
];

export default function FAQAccordian() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="text-white lg:p-10 px-6 py-8 flex flex-col items-center w-full gap-6 lg:gap-10"
    >
      <span
        style={{ textShadow: 'rgba(255, 255, 255, 0.3) 10px 12px 0' }}
        className="text-[42px] lg:text-5xl text-center font-semibold uppercase font-clashDisplay after:bg-purpleAccent"
      >
        FAQ
      </span>
      <div className="flex flex-col space-y-3 justify-center items-center">
        {faqs.map((faq, index) => (
          <div key={index} className="relative w-full lg:w-[60em] border border-gray-500 rounded-xl lg:p-1">
            <button
              className={`w-full flex justify-between items-center px-5 py-4 text-white text-lg lg:text-2xl font-semibold relative`}
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-start">{faq.question}</span>
              <ChevronDown
                className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""} text-white`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 text-white text-lg pt-0 px-5 ${
                openIndex === index ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
