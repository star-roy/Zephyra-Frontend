import React from "react";
import { OngoingQuestCard, EmptyOnGoingQuests} from "../../components/index.js";

export default function OngoingQuestsSection({ ongoingQuests = [] }) {
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
          {ongoingQuests.map((questProgress, index) => {
            // Use the QuestProgress _id as key since it should be unique per user-quest combination
            const progressId = questProgress?._id || `quest-progress-${index}`;
            return (
              <OngoingQuestCard 
                key={progressId} 
                quest={questProgress}
              />
            );
          })}
          
          {ongoingQuests.length < maxOngoingQuests && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                You can start {maxOngoingQuests - ongoingQuests.length} more quest{maxOngoingQuests - ongoingQuests.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      ) : (
        <EmptyOnGoingQuests />
      )}
    </div>
  );
}