import React from "react";
import ForYouCard from "../../Cards/QuestCard.jsx";

// Simple: show 4 quest cards
function YourNextAdventureSection({ quests }) {
  console.log('Quests received:', quests); // Debug log
  
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
          {quests && quests.length > 0 ? (
            quests.slice(0, 4).map((quest) => (
              <ForYouCard key={quest._id} quest={quest} />
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center">
              <div className="text-3xl font-bold text-duskHaze mb-3">
                {quests ? `Found ${quests.length} quests` : 'Loading quests...'}
              </div>
              <div className="text-lg text-stormyGrey mb-4 text-center max-w-md">
                Check console for debug info
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default YourNextAdventureSection;