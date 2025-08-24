import React from "react";
import {
  CompassHero,
  KnowledgeSupportSection,
  PersonalizedGuidance,
} from "../../components/index.js";
import ChatBot from "../../components/Support/ChatBot.jsx";

function CompassLoggedIn() {
  return (
    <>
      <CompassHero />
      <PersonalizedGuidance />
      <KnowledgeSupportSection />
      <ChatBot />
    </>
  );
}

export default CompassLoggedIn;
