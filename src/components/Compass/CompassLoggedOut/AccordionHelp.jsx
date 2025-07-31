import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const helpCategories = [
  {
    category: "Account Settings",
    topics: [
      { label: "How to update my email?", link: "#" },
      { label: "Resetting your password", link: "#" },
      { label: "Enabling 2FA for extra security", link: "#" },
    ],
  },
  {
    category: "Quests & XP",
    topics: [
      { label: "What are quests?", link: "#" },
      { label: "How to earn XP?", link: "#" },
      { label: "Leveling system explained", link: "#" },
    ],
  },
  {
    category: "Exploration Tools",
    topics: [
      { label: "Using the compass feature", link: "#" },
      { label: "Map and GPS accuracy tips", link: "#" },
      { label: "Offline mode explained", link: "#" },
    ],
  },
  {
    category: "Rewards & Badges",
    topics: [
      { label: "How to claim rewards", link: "#" },
      { label: "Unlocking badge tiers", link: "#" },
      { label: "XP to badge conversion", link: "#" },
    ],
  },
  {
    category: "App Issues",
    topics: [
      { label: "App not loading?", link: "#" },
      { label: "Location permissions guide", link: "#" },
      { label: "Bug reporting process", link: "#" },
    ],
  },
];

function AccordionHelp() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full relative bg-[#EBF2FF] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-14 relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0D1B2A] mb-8">
          Categorized Help Center
        </h2>

        <div className="space-y-4">
          {helpCategories.map((cat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl px-6 py-4 shadow-sm transition-all"
            >
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-[#2C3E50] font-semibold text-base sm:text-lg">
                  {cat.category}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-[#4A90E2] w-5 h-5" />
                ) : (
                  <ChevronDown className="text-[#4A90E2] w-5 h-5" />
                )}
              </button>

              {openIndex === index && (
                <ul className="mt-3 pl-4 sm:pl-5 space-y-3 text-base">
                  {cat.topics.map((topic, i) => (
                    <li key={i}>
                      <a
                        href={topic.link}
                        className="flex items-center gap-2 text-[#869AB8] hover:text-[#4A90E2] transition"
                      >
                        <span className="text-2xl leading-none">•</span>
                        <span>{topic.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-[#ffffff] pointer-events-none z-0" />
    </section>
  );
}

export default AccordionHelp;
