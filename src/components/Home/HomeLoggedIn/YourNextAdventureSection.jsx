import React from "react";
import ForYouCard from "../../Cards/QuestCard.jsx";
import useGridColumnCount from "../../../Hook/useGridColumnCount.js"; // Adjust the path as needed

// This version matches grid columns to displayed card count responsively.
function YourNextAdventureSection({ adventures }) {
  const columns = useGridColumnCount();
  const displayAdventures = adventures ? adventures.slice(0, columns) : [];

  return (
    <section
      id="your-next-adventure"
      className="w-full px-4 sm:px-6 md:px-10 xl:px-14 py-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-midnightIndigo mb-6">
          Your Next Adventure
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayAdventures.length > 0 ? (
            displayAdventures.map((adv) => (
              <ForYouCard key={adv.id} {...adv} />
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center">
              <div className="text-3xl font-bold text-duskHaze mb-3">
                No Adventures Available
              </div>
              <div className="text-lg text-stormyGrey mb-4 text-center max-w-md">
                Please check back later or refresh to see new quests.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default YourNextAdventureSection;