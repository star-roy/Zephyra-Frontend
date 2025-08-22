import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function JustForYou({ quests = [] }) {
  if (!quests.length) return null;

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 mb-12">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-semibold text-midnightIndigo mb-6">
          Just for You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <div
              key={quest._id}
              className="flex bg-white border border-zephyralite rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.01] transition"
            >
              <div className="p-3">
                <div className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] rounded-xl overflow-hidden">
                  <img
                    src={quest.files?.[0]?.file_url || quest.image || "/assets/community5.jpeg"}
                    alt={quest.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 py-4 pr-4 pl-2 flex flex-col justify-between relative">
                <span className="absolute top-4 right-4 text-xs font-semibold text-[#00C48C] bg-[#E6FAF5] px-3 py-1 rounded-full">
                  +{quest.xp || quest.xp_reward || 100} XP
                </span>

                <h3 className="text-sm sm:text-base font-semibold text-midnightIndigo line-clamp-1 pr-16">
                  {quest.title}
                </h3>
                <p className="text-sm text-stormyGrey mt-1 line-clamp-2 leading-snug">
                  {quest.description || quest.subtitle}
                </p>

                <div className="flex justify-end mt-4">
                  <Link
                    to={`/quest-overview/${quest._id}`}
                    className="text-sm font-medium text-zephyraBlue inline-flex items-center hover:underline"
                  >
                    Explore now <FaArrowRight className="ml-2 text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JustForYou;
