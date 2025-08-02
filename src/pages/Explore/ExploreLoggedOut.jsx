import React from "react";
import {
  CommunityHighlights,
  ExploreAction,
  ExploreHero,
  JoinCommunity,
} from "../../components/index.js";

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
