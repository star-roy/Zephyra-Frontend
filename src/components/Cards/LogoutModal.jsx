import React from "react";

export default function LogoutModal({ onCancel, onLogout }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-200">
      <div className="bg-white rounded-2xl shadow-2xl px-12 py-10 flex flex-col items-center min-w-[360px] relative animate-[fadeIn_0.3s_ease]">
        {/* Decorative Alert Icon */}
        <div className="mb-5">
          <svg width={56} height={56} viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="26" fill="#FFF6F6" stroke="#F8D7DA" strokeWidth="2"/>
            <path
              d="M28 18v12M28 36h.02"
              stroke="#F04438"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon points="28,12 44,44 12,44" fill="none" stroke="#F04438" strokeWidth="2"/>
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Log out?</h2>
        <p className="text-gray-500 text-center mb-7 text-lg">
          Are you sure you want to log out of your account?
        </p>
        <div className="flex gap-5 w-full justify-center">
          <button
            className="px-7 py-3 rounded-full bg-[#F3F6FB] text-gray-600 font-semibold shadow-sm border border-gray-200 hover:bg-gray-200 focus:ring-2 focus:ring-[#4A90E2] transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-7 py-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold shadow-md border border-teal-400 hover:from-teal-500 hover:to-teal-600 focus:ring-2 focus:ring-teal-400 transition"
            onClick={onLogout}
          >
            Log Out
          </button>
        </div>
        {/* Elegant close button in top right */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onCancel}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      {/* Simple fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.97);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </div>
  );
}