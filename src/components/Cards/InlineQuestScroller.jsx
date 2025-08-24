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

  const fallbackImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
  
  return (
    <div className="relative">
      {title && (
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 pl-1">{title}</h3>
      )}

      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10" />

      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 border border-gray-200 flex items-center justify-center"
      >
        <FaChevronLeft className="text-gray-500" />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 border border-gray-200 flex items-center justify-center"
      >
        <FaChevronRight className="text-gray-500" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar -mx-1 px-1 py-1"
      >
        {cards.map((card) => {
          const questId = card._id || card.id;

          let questImage = fallbackImg;
          
          // console.log('Quest card data:', card);
          // console.log('Quest files:', card.files);
          if (card.files && Array.isArray(card.files) && card.files.length > 0) {
            questImage = card.files[0].file_url;

          } 
          else if (card.image) {
            questImage = card.image;
          }
          else {
            // console.log('Using fallback image:', questImage);
          }
          
          return (
            <Link
              to={`/quest-overview/${questId}`}
              key={questId}
              className="w-[calc(25%-12px)] min-w-[260px] flex items-center bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition p-3 flex-shrink-0"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 mr-3">
                <img
                  src={questImage}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-md border border-gray-100"
                  onError={e => { 
                    e.target.onerror = null; 
                    e.target.src = fallbackImg; 
                  }}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-gray-900 font-semibold text-sm line-clamp-1">
                  {card.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {card.description}
                </p>

                {card.xp && card.xp > 0 && (
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-blue-600 font-medium">
                      +{card.xp} XP
                    </span>
                  </div>
                )}
                {card.difficulty && (
                  <div className="flex items-center mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      card.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      card.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      card.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {card.difficulty}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default InlineQuestScroller;
