import React from "react";
import {
  ExplorerHubSection,
  HeroLoggedIn,
  OngoingQuestsSection,
  UpcomingEventsSection,
  YourNextAdventureSection,
} from "../../components/index.js";

function HomeLoggedIn() {
  // Replace with real user data
  const user = {
    name: "Kelly",
    level: 3,
    xp: 1260,
    currentTitle: "Pathfinder",
    questCount: 3,
  };

  const quests = [
    // {
    //   id: 1,
    //   title: "Uncover Old Delhi",
    //   description:
    //     "Explore the hidden corners of Old Delhi. Explore the hidden corners of Old Delhi. Explore the hidden corners of Old Delhi. Explore the hidden corners of Old Delhi.",
    //   currentStep: 3,
    //   totalSteps: 5,
    //   progressText: "3 of 5 Steps", // optional
    //   stepLabel: "steps", // optional
    // },
    // {
    //   id: 2,
    //   title: "Uncover Old Delhi",
    //   description: "Explore the hidden corners of Old Delhi",
    //   currentStep: 4,
    //   totalSteps: 5,
    //   progressText: "4 of 5 Steps", // optional
    //   stepLabel: "steps", // optional
    // },
    // {
    //   id: 3,
    //   title: "Uncover Old Delhi",
    //   description: "Explore the hidden corners of Old Delhi",
    //   currentStep: 1,
    //   totalSteps: 5, // optional
    //   progressText: "1 of 5 Steps", // optional
    //   stepLabel: "steps", // optional
    // },
  ];

  const adventures = [
    {
      id: "abc123",
      title: "Explore Humayun's Tomb",
      subtitle:
        "Wander through this hidden Mughal marvel and uncover lost stories.",
      xp: 120,
      image: "/assets/community4.jpeg",
      tag: "New",
      difficulty: "Medium", // optional: "Easy", "Medium", "Hard"
    },
    {
      id: "abc124",
      title: "Explore Humayun's Tomb",
      subtitle:
        "Wander through this hidden Mughal marvel and uncover lost stories.Wander through this hidden Mughal marvel and uncover lost stories",
      xp: 120,
      image: "/assets/community6.jpeg",
      tag: "New",
      difficulty: "Easy", // optional: "Easy", "Medium", "Hard"
    },
    {
      id: "abc125",
      title: "Explore Humayun's Tomb",
      subtitle:
        "Wander through this hidden Mughal marvel and uncover lost stories.",
      xp: 120,
      image: "/assets/community3.jpeg",
      tag: "New",
      difficulty: "Hard", // optional: "Easy", "Medium", "Hard"
    },
    {
      id: "abc126",
      title: "Explore Humayun's Tomb",
      subtitle:
        "Wander through this hidden Mughal marvel and uncover lost stories.",
      xp: 120,
      image: "/assets/community3.jpeg",
      tag: "New",
      difficulty: "Hard", // optional: "Easy", "Medium", "Hard"
    },
  ];

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
      <HeroLoggedIn {...user} />
      <OngoingQuestsSection quests={quests} />
      <YourNextAdventureSection adventures={adventures} />
      <UpcomingEventsSection events={events} />;
      <ExplorerHubSection />
    </>
  );
}

export default HomeLoggedIn;
