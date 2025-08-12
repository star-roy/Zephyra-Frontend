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
    loading
  } = useSelector(state => state.quest);

  // Fetch data on component mount
  useEffect(() => {
    // Fetch all quests from backend
    dispatch(fetchQuests({ 
      page: 1, 
      limit: 12
    }));
  }, [dispatch]);

  // Use real backend data
  const featured = quests.slice(0, 3);
  const popular = quests.slice(3, 7); // Next 4 quests
  const questsForYou = quests.slice(7, 10); // Next 3 quests

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
