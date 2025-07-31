import React from "react";
import HeroSection from "../../components/Compass/CompassLoggedOut/HeroSection";
import PopularTopics from "../../components/Compass/CompassLoggedOut/PopularTopics";
import AccordionHelp from "../../components/Compass/CompassLoggedOut/AccordionHelp";
import CTASection from "../../components/Compass/CompassLoggedOut/CTASection";
import ContactSupportBox from "../../components/Compass/CompassLoggedOut/ContactSupportBox";



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

