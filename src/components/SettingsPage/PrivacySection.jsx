import React from "react";

export default function PrivacySection() {
  return (
    <section className="bg-white rounded-xl border border-gray-200 mb-8 p-6">
      <h2 className="text-lg font-semibold text-midnightIndigo mb-1">Privacy</h2>
      <p className="text-sm text-zephyraBlue mb-5">Control your privacy settings.</p>
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2">Profile Visibility</label>
        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800">
          <option>Public</option>
          <option>Private</option>
        </select>
        <p className="text-xs text-zephyraBlue mt-1">Control who can see your profile.</p>
      </div>
      <div>
        <label className="flex items-center gap-3 mb-2 text-sm text-gray-700">
          <input type="checkbox" className="accent-zephyraBlue" />
          Data Sharing
        </label>
        <p className="text-xs text-zephyraBlue">
          Allow us to share your data with partners.
        </p>
      </div>
    </section>
  );
}