import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ExplorerHubSection,
  HeroLoggedIn,
  OngoingQuestsSection,
  UpcomingEventsSection,
  YourNextAdventureSection,
} from "../../components/index.js";
import { fetchQuests, fetchOngoingQuests } from "../../features/questSlice.js";

function HomeLoggedIn() {
  const dispatch = useDispatch();
  const { 
    quests = [], 
    ongoingQuests = []
  } = useSelector(state => state.quest);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchQuests({ page: 1, limit: 4 }));
    dispatch(fetchOngoingQuests());
  }, [dispatch]);


  const formattedOngoingQuests = ongoingQuests.map(progressData => {
    const completedTasks = progressData.completed_tasks?.length || 0;
    const totalTasks = progressData.total_tasks || 1;
    const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
    
    return {
      ...progressData, 
      progress: progressPercentage
    };
  });

  const events = [
    {
      id: 1,
      day: "28",
      month: "JUL",
      tag: "Community Challenge",
      title: "Capture the Local Flavor",
      description:
        "Submit a photo of your favorite local food or drink to win XP and get featured.",
    },
    {
      id: 2,
      day: "30",
      month: "JUL",
      tag: "Join Now",
      title: "Community Clean-Up Drive",
      description:
        "Join your local explorers in a community clean-up quest and earn bonus rewards.",
    },
  ];

  return (
    <>
      <HeroLoggedIn />
      <OngoingQuestsSection quests={formattedOngoingQuests} />
      <YourNextAdventureSection quests={quests} />
      <UpcomingEventsSection events={events} />
      <ExplorerHubSection />
    </>
  );
}

export default HomeLoggedIn;