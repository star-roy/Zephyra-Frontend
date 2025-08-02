import React from "react";
import { OngoingQuestCard, EmptyOngoingQuests} from "../../components/index.js";

export default function OngoingQuestsSection({ ongoingQuests = [] }) {
  console.log('OngoingQuestsSection received:', ongoingQuests);
  
  const maxOngoingQuests = 3;
  const hasOngoingQuests = ongoingQuests && Array.isArray(ongoingQuests) && ongoingQuests.length > 0;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-2xl text-gray-900">
          Ongoing Quests
        </h2>
        {hasOngoingQuests && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {ongoingQuests.length} / {maxOngoingQuests}
          </span>
        )}
      </div>
      
      {hasOngoingQuests ? (
        <div className="space-y-8">
          {ongoingQuests.map((quest, index) => {
            console.log(`Quest ${index}:`, quest);
            return (
              <OngoingQuestCard 
                key={quest?.id || `quest-${index}`} 
                quest={quest}
              />
            );
          })}
          
          {/* Show available slots hint if less than max */}
          {ongoingQuests.length < maxOngoingQuests && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                You can start {maxOngoingQuests - ongoingQuests.length} more quest{maxOngoingQuests - ongoingQuests.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      ) : (
        <EmptyOngoingQuests />
      )}
    </div>
  );
}