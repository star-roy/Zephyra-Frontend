import React, { useRef } from "react";

export default function ReportBug() {
  const fileInputRef = useRef();

  return (
    <div className="bg-[#F8FBFA] min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl"> {/* Increased max-width from xl to 3xl */}
        <h1 className="text-3xl font-extrabold text-midnightIndigo text-center mb-3">Report a Bug</h1>
        <p className="text-center text-lg text-gray-500 mb-8">
          We appreciate your help in making <b>Zephyra</b> better. Please be as detailed as possible.
        </p>
        {/* Subject */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            placeholder="e.g., Map doesn't load on mobile"
            className="w-full rounded-lg px-5 py-3 text-teal-700 bg-[#E6F4F1] placeholder-teal-400 border-none shadow-sm focus:ring-2 focus:ring-teal-200"
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows={3}
            placeholder="A clear and concise description of what the bug is."
            className="w-full rounded-lg px-5 py-3 text-teal-700 bg-[#E6F4F1] placeholder-teal-400 border-none shadow-sm focus:ring-2 focus:ring-teal-200 resize-none"
          />
        </div>
        {/* Steps to Reproduce */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Steps to Reproduce</label>
          <textarea
            rows={3}
            placeholder={`1. Go to '...'\n2. Click on '...'\n3. Scroll down to '...'`}
            className="w-full rounded-lg px-5 py-3 text-teal-700 bg-[#E6F4F1] placeholder-teal-400 border-none shadow-sm focus:ring-2 focus:ring-teal-200 resize-none"
          />
        </div>
        {/* Expected vs Actual */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-2">Expected Behavior</label>
            <textarea
              rows={2}
              placeholder="What did you expect to happen?"
              className="w-full rounded-lg px-5 py-3 text-teal-700 bg-[#E6F4F1] placeholder-teal-400 border-none shadow-sm focus:ring-2 focus:ring-teal-200 resize-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-2">Actual Behavior</label>
            <textarea
              rows={2}
              placeholder="What actually happened?"
              className="w-full rounded-lg px-5 py-3 text-teal-700 bg-[#E6F4F1] placeholder-teal-400 border-none shadow-sm focus:ring-2 focus:ring-teal-200 resize-none"
            />
          </div>
        </div>
        {/* Attachment Upload */}
        <div className="mb-8">
          <label className="block font-medium text-gray-700 mb-2">Attachments (Optional)</label>
          <div
            className="w-full bg-[#E6F4F1] border-2 border-dashed border-teal-200 rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer transition hover:border-teal-400"
            onClick={() => fileInputRef.current?.click()}
          >
            {/* SVG for upload */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="4" y="14" width="32" height="18" rx="4" fill="#CFF0E9" />
              <path d="M20 27V11M20 11l-5 5.5M20 11l5 5.5" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="20" r="19" stroke="#14B8A6" strokeWidth="2" opacity="0.13" />
            </svg>
            <div className="mt-3 text-center text-teal-500 font-semibold">
              Click to upload <span className="font-normal text-gray-400">or drag and drop<br />PNG, JPG, GIF up to 10MB</span>
            </div>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-teal-400 text-white font-bold text-lg shadow-md hover:bg-teal-500 transition"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}