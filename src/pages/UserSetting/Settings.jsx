import React, { useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  AccountSection,
  AppPreferencesSection,
  PrivacySection,
  SecuritySection,
  SettingsSidebar,
} from "../../components/index.js";

const sectionComponents = {
  Account: AccountSection,
  Privacy: PrivacySection,
  "App Preferences": AppPreferencesSection,
  Security: SecuritySection,
};

export default function Settings() {
  const [selected, setSelected] = useState("Account");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const SelectedSection = sectionComponents[selected];

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleMobileSelect = (section) => {
    setSelected(section);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="bg-[#F7FAF9] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 xl:px-14">
        
        <div className="lg:hidden pt-6 pb-4">
          <button
            onClick={toggleMobileSidebar}
            className="w-full flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200"
          >
            <span className="font-medium text-gray-900">{selected}</span>
            <ChevronDownIcon 
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                mobileSidebarOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {mobileSidebarOpen && (
            <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <SettingsSidebar 
                selected={selected} 
                onSelect={handleMobileSelect}
                isMobile={true}
              />
            </div>
          )}
        </div>

        <div className="flex gap-10 pt-6 lg:pt-10 pb-32">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block w-64 shrink-0">
            <SettingsSidebar selected={selected} onSelect={setSelected} />
          </div>
          
          <div className="flex-1 w-full lg:w-auto">
            {SelectedSection ? <SelectedSection /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
