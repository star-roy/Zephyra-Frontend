import React from "react";
import {
  HeroSection,
  PopularTopics,
  AccordionHelp,
  CTASection,
  ContactSupportBox,
} from "../../components/index.js";
import ChatBot from "../../components/Support/ChatBot.jsx";

function CompassLoggedOut() {
  return (
    <main>
      <HeroSection />
      <PopularTopics />
      <AccordionHelp />
      <CTASection />
      <ContactSupportBox />
      <ChatBot />
    </main>
  );
}

export default CompassLoggedOut;
