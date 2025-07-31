import React, { useState } from "react";
import SettingsSidebar from "../../components/SettingsPage/SettingsSideBar";
import AccountSection from "../../components/SettingsPage/AccountSection";
import PrivacySection from "../../components/SettingsPage/PrivacySection";
import AppPreferencesSection from "../../components/SettingsPage/AppPreferencesSection";
import SecuritySection from "../../components/SettingsPage/SecuritySection";

const sectionComponents = {
  Account: AccountSection,
  Privacy: PrivacySection,
  "App Preferences": AppPreferencesSection,
  Security: SecuritySection,
};

export default function Settings() {
  const [selected, setSelected] = useState("Account");
  const SelectedSection = sectionComponents[selected];

  return (
    <div className="bg-[#F7FAF9] min-h-screen">
      <div className="max-w-6xl mx-auto flex gap-10 pt-10 pb-32 px-4 sm:px-6 md:px-10 xl:px-14">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <SettingsSidebar selected={selected} onSelect={setSelected} />
        </div>
        {/* Main Content */}
        <div className="flex-1">
          {SelectedSection ? <SelectedSection /> : null}
          {/* Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-full bg-teal-400 text-white font-semibold hover:bg-teal-500 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}