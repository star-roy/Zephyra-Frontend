import React from "react";
import {
  HeroSection,
  PopularTopics,
  AccordionHelp,
  CTASection,
  ContactSupportBox,
} from "../../components/index.js";

function CompassLoggedOut() {
  return (
    <main>
      <HeroSection />
      <PopularTopics />
      <AccordionHelp />
      <CTASection />
      <ContactSupportBox />
    </main>
  );
}

export default CompassLoggedOut;
