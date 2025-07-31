import React from "react";

export default function AppPreferencesSection() {
  return (
    <section className="bg-white rounded-xl border border-gray-200 mb-8 p-6">
      <h2 className="text-lg font-semibold text-midnightIndigo mb-1">App Preferences</h2>
      <p className="text-sm text-zephyraBlue mb-5">Customize your app experience.</p>
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Language</label>
        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-2">Theme</label>
        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800">
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>
    </section>
  );
}