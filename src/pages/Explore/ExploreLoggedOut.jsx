import React from "react";
import ExploreHero from "../../components/Explore/ExploreLoggedOut/ExploreHero";
import ExploreAction from "../../components/Explore/ExploreLoggedOut/ExploreAction";
import CommunityHighlights from "../../components/Explore/ExploreLoggedOut/CommunityHighlights";
import JoinCommunity from "../../components/Explore/ExploreLoggedOut/JoinCommunity";




function ExploreLoggedOut() {
  return (
    <main>
      <ExploreHero />
      <ExploreAction />
      <CommunityHighlights /> 
      <JoinCommunity />
    </main>
  );
}

export default ExploreLoggedOut;
