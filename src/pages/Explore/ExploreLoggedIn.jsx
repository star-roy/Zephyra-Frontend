import React from "react";
import {
  BrowseCategories,
  FeaturedQuest,
  JustForYou,
  PopularQuests,
  UserExploreHero,
} from "../../components/index.js";

function ExploreLoggedIn() {
  const featured = [
    {
      id: "f2",
      title: "Old City Food Crawl",
      subtitle: "Taste authentic dishes in a guided street food quest.",
      xp: 100,
      difficulty: "Easy",
      image: "/assets/food-trail1.jpeg",
    },
    {
      id: "f3",
      title: "Heritage Trail Quest",
      subtitle: "Discover historic sites and complete mini trivia challenges.",
      xp: 120,
      difficulty: "Hard",
      image: "/assets/food-trail1.jpeg",
    },
    {
      id: "f4",
      title: "Heritage Trail Quest",
      subtitle: "Discover historic sites and complete mini trivia challenges.",
      xp: 120,
      difficulty: "Hard",
      image: "/assets/food-trail1.jpeg",
    },
    {
      id: "f9",
      title: "Old City Food Crawl",
      subtitle: "Taste authentic dishes in a guided street food quest.",
      xp: 100,
      difficulty: "Easy",
      image: "/assets/food-trail1.jpeg",
    },
  ];

  const popular = [
    {
      id: "p1",
      title: "City Secrets Walk",
      subtitle: "Explore unknown stories and narrow lanes of your city.",
      xp: 90,
      difficulty: "Easy",
      image: "/assets/community5.jpeg",
    },
    {
      id: "p2",
      title: "Cultural Fest Quest",
      subtitle: "Attend events, interact, and earn bonus XP.",
      xp: 120,
      difficulty: "Medium",
      image: "/assets/community5.jpeg",
    },
    {
      id: "p3",
      title: "Street Photography Hunt",
      subtitle: "Capture moments, upload them, and earn rewards.",
      xp: 110,
      difficulty: "Medium",
      image: "/assets/community5.jpeg",
    },
    {
      id: "p4",
      title: "Nature Trail Discovery",
      subtitle: "Reconnect with green escapes inside your city.",
      xp: 130,
      difficulty: "Hard",
      image: "/assets/community5.jpeg",
    },
  ];

  const quests = [
    {
      id: "jfy1",
      title: "Try 3 Local Snacks",
      subtitle: "Complete your snack quest by tasting food from 3 new stalls.",
      xp: 60,
      image: "/assets/community5.jpeg",
    },
    {
      id: "jfy2",
      title: "Art Lane Photo Walk",
      subtitle: "Capture murals and share your journey to earn XP.",
      xp: 85,
      image: "/assets/community5.jpeg",
    },
    {
      id: "jfy3",
      title: "Art Lane Photo Walk",
      subtitle: "Capture murals and share your journey to earn XP.",
      xp: 85,
      image: "/assets/community5.jpeg",
    },
  ];

  return (
    <>
      <UserExploreHero />
      <FeaturedQuest quests={featured} />
      <PopularQuests quests={popular} />
      <JustForYou quests={quests} />
      <BrowseCategories />
    </>
  );
}

export default ExploreLoggedIn;
