import React from "react";
import { FaSearch } from "react-icons/fa";

function CompassHero() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-10 bg-zephyraLite text-midnightIndigo">
      <div className="max-w-[1400px] mx-auto">

        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1">Your Explorer AI Assistant</h1>
          <p className="text-sm sm:text-base text-stormyGrey">
            <span className="font-semibold text-blue-500">Hi Explorer!</span>{" "}
            How can I guide your exploration today?
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Ask your question or describe your issue..."
                className="w-full border border-gray-200 rounded-full py-3 pl-10 pr-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-zephyraBlue"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            <button className="shine-sweep bg-blue-500 hover:bg-zephyraDark text-white font-semibold text-sm sm:text-base px-5 py-3 rounded-full transition">
              Send
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {[
              "Check My Quest Status",
              "Report a Bug",
              "How do I earn Badges?",
            ].map((item, index) => (
              <button
                key={index}
                className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default CompassHero;
