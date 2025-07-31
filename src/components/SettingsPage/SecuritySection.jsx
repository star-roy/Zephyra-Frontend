import React from "react";

export default function SecuritySection() {
  return (
    <section className="bg-white rounded-xl border border-gray-200 mb-8 p-6">
      <h2 className="text-lg font-semibold text-midnightIndigo mb-1">Security</h2>
      <p className="text-sm text-zephyraBlue mb-5">
        Manage your account's security.
      </p>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="font-medium text-midnightIndigo">Change Password</div>
          <div className="text-xs text-zephyraBlue">
            It's a good idea to use a strong password that you're not using elsewhere.
          </div>
        </div>
        <button className="text-zephyraBlue font-semibold px-4 py-2 rounded-lg hover:bg-zephyraLite transition">
          &gt;
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-midnightIndigo">Two-Factor Authentication (2FA)</div>
          <div className="text-xs text-zephyraBlue">
            Add an extra layer of security to your account.
          </div>
        </div>
        <button className="bg-zephyraBlue text-white font-semibold px-4 py-2 rounded-lg hover:bg-zephyraDark transition">
          Enable
        </button>
      </div>
    </section>
  );
}