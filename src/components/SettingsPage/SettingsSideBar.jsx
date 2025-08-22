import React from "react";

const sections = [
  { label: "Account" },
  // { label: "Notifications" }, // Skipped as per instructions
  { label: "Privacy" },
  { label: "App Preferences" },
  { label: "Security" },
];

export default function SettingsSidebar({ selected, onSelect, isMobile = false }) {
  return (
    <aside className={`${isMobile ? 'py-0' : 'bg-transparent py-10'}`}>
      <nav>
        <ul className={`${isMobile ? 'space-y-0' : 'space-y-2'}`}>
          {sections.map((section) => (
            <li key={section.label}>
              <button
                className={`w-full text-left font-medium text-base transition ${
                  isMobile 
                    ? `px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                        selected === section.label
                          ? "bg-blue-50 text-blue-600 border-l-4 border-l-blue-600"
                          : "text-gray-700"
                      }`
                    : `px-5 py-3 rounded-lg ${
                        selected === section.label
                          ? "bg-white shadow text-zephyraBlue"
                          : "text-midnightIndigo hover:bg-white"
                      }`
                }`}
                onClick={() => onSelect(section.label)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}