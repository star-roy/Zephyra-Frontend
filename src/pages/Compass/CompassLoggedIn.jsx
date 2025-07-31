import React from "react";
import CompassHero from "../../components/Compass/CompassLoggedIn/CompassHero.jsx";
import PersonalizedGuidance from "../../components/Compass/CompassLoggedIn/PersonalizedGuidance.jsx";
import KnowledgeSupportSection from "../../components/Compass/CompassLoggedIn/KnowledgeSupportSection.jsx";

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
