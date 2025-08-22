import React from "react";

function EventCard({ event }) {
  return (
    <div className="flex w-full h-[150px] bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] overflow-hidden group">
      <div className="flex items-center justify-center w-[88px] sm:w-[100px] md:w-[106px] px-2 sm:px-3 py-3 sm:py-4 bg-gradient-to-b from-zephyraLite to-[#76abe9]">
        <div className="flex flex-col items-center justify-center w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] bg-white rounded-2xl shadow-lg border border-duskHaze group-hover:shadow-xl transition-shadow">
          <p className="text-2xl font-extrabold text-zephyraBlue leading-none mb-[2px] tracking-tight">
            {event.day}
          </p>
          <p className="text-[11px] uppercase tracking-widest font-semibold text-stormyGrey">
            {event.month}
          </p>
        </div>
      </div>


      <div className="flex-1 py-3 md:py-4 pr-4 pl-3 flex flex-col justify-between h-full pb-3">
        <div>
          {event.tag && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2 w-fit shadow-sm border ${
                event.tag === "Community Challenge"
                  ? "text-orange-600 bg-orange-100 border-orange-200"
                  : "text-blue-600 bg-blue-100 border-blue-200"
              }`}
            >
              {event.tag === "Community Challenge" && (
                <svg width="14" height="14" className="mr-1" fill="none"><circle cx="7" cy="7" r="7" fill="#F59E42"/><path d="M7 3.5v7M3.5 7h7" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/></svg>
              )}
              {event.tag}
            </span>
          )}

          <h3 className="text-base font-bold text-midnightIndigo leading-tight mb-1 line-clamp-2 group-hover:text-zephyraBlue transition-colors">
            {event.title}
          </h3>

          <p className="text-sm text-stormyGrey line-clamp-2 leading-relaxed overflow-hidden max-h-[2.8em]">
            {event.description}
          </p>
        </div>

        <div className="flex justify-end items-end pt-2">
          <button
            className={`text-xs font-bold px-5 py-2 rounded-full shadow-md transition-all duration-200 flex items-center gap-1 
              ${
                event.tag === "Community Challenge"
                  ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white hover:scale-105"
                  : "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white hover:scale-105"
              }`}
          >
            {event.tag === "Community Challenge" ? (
              <>
                <span role="img" aria-label="sparkle">→</span> Join Now
              </>
            ) : (
              <>
                <span role="img" aria-label="arrow">→</span> Learn More
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;