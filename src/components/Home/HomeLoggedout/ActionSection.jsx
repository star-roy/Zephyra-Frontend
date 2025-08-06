import React from "react";

function ActionSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-20 py-16 text-center bg-white">
      <h2 className="text-2xl sm:text-4xl font-bold text-[#2C3E50] mb-2">
         Where Zephyra Comes Alive
      </h2>
      <p className="text-blue-600 max-w-2xl mx-auto mb-14 text-base sm:text-lg md:text-xl font-medium tracking-wide">
        Watch how easy it is to start your next adventure. This quick demo shows you how to find quests, track your progress, and connect with the community.
      </p>

      <div className="w-full max-w-4xl mx-auto aspect-video bg-white rounded-3xl border-2 border-blue-100 shadow-lg flex items-center justify-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow hover:bg-blue-200 transition cursor-pointer border-2 border-blue-200">
          <svg
            className="w-7 h-7 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6 4l10 6-10 6V4z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default ActionSection;
