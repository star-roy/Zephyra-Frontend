import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function InlineQuestScroller({ title, cards }) {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const amount = 280;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Title (Optional) */}
      {title && (
        <h3 className="text-xl font-bold text-midnightIndigo mb-4">{title}</h3>
      )}

      {/* Fade Shadows */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Scroll Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hidden sm:flex"
      >
        <FaChevronLeft className="text-gray-600" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hidden sm:flex"
      >
        <FaChevronRight className="text-gray-600" />
      </button>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar -mx-1 px-1"
      >
        {cards.map((card) => (
          <Link
            to={`/quest/${card.id}`}
            key={card.id}
            className="w-[calc(25%-12px)] min-w-[260px] flex items-center bg-white border border-gray-200 rounded-xl hover:shadow-sm hover:scale-[1.02] hover:border-2 transition p-3 flex-shrink-0"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 mr-3">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-midnightIndigo font-semibold text-sm line-clamp-1">
                {card.title}
              </h4>
              <p className="text-sm text-stormyGrey mt-0.5 line-clamp-2">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default InlineQuestScroller;
