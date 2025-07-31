import React from "react";

const sections = [
  { label: "Account" },
  // { label: "Notifications" }, // Skipped as per instructions
  { label: "Privacy" },
  { label: "App Preferences" },
  { label: "Security" },
];

export default function SettingsSidebar({ selected, onSelect }) {
  return (
    <aside className="bg-transparent py-10">
      <nav>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.label}>
              <button
                className={`w-full text-left px-5 py-3 rounded-lg font-medium text-base transition ${
                  selected === section.label
                    ? "bg-white shadow text-zephyraBlue"
                    : "text-midnightIndigo hover:bg-white"
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