import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowseCategories,
  FeaturedQuest,
  JustForYou,
  PopularQuests,
  UserExploreHero,
} from "../../components/index.js";
import { fetchQuests } from "../../features/questSlice.js";

function ExploreLoggedIn() {
  const dispatch = useDispatch();
  const { 
    quests = [], 
    loading, 
    error 
  } = useSelector(state => state.quest);

  // Fetch data on component mount
  useEffect(() => {
    // Fetch popular quests
    dispatch(fetchQuests({ 
      page: 1, 
      limit: 12, 
      filters: { status: 'approved' },
      sortBy: 'popular'
    }));
  }, [dispatch]);

  // Use backend data or fallback to mock data
  const featured = quests.length > 0 ? quests.slice(0, 3) : [
    {
      id: "f1",
      title: "Art Lane Photo Walk",
      subtitle: "Capture murals and share your journey to earn XP.",
      xp: 85,
      difficulty: "Easy",
      image: "/assets/food-trail1.jpeg",
    },
  ];

  // Use backend data or fallback to mock data
  const popular = quests.length > 0 ? quests.slice(0, 4) : [
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

  const questsForYou = quests.length > 0 ? quests.slice(4, 8) : [
    {
      id: "jfy1",
      title: "Try 3 Local Snacks",
      subtitle: "Complete your snack quest by tasting food from 3 new stalls.",
      xp: 60,
      image: "/assets/community5.jpeg",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F56D9]"></div>
      </div>
    );
  }

  return (
    <>
      <UserExploreHero />
      <FeaturedQuest quests={featured} />
      <PopularQuests quests={popular} />
      <JustForYou quests={questsForYou} />
      <BrowseCategories />
    </>
  );
}

export default ExploreLoggedIn;
