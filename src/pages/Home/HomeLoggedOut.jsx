import React from "react";
import {
  ActionSection,
  FeatureSection,
  HomeHeroSection,
  JoinCTA,
  TestimonialSection,
} from "../../components/index.js";

function HomeLoggedOut() {
  
  return (
    <main>
        <HomeHeroSection />
        <ActionSection />
        <FeatureSection />
        <TestimonialSection />
        <JoinCTA />
    </main>
  );
}

export default HomeLoggedOut;
