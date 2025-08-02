import React from "react";
import {
  CompassHero,
  KnowledgeSupportSection,
  PersonalizedGuidance,
} from "../../components/index.js";

function CompassLoggedIn() {
  return (
    <>
      <CompassHero />
      <PersonalizedGuidance />
      <KnowledgeSupportSection />
    </>
  );
}

export default CompassLoggedIn;
