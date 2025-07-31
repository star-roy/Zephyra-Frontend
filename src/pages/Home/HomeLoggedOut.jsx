import React from "react";
import HeroSection from "../../components/Home/HomeLoggedout/HeroSection";
import ActionSection from "../../components/Home/HomeLoggedout/ActionSection";
import FeatureSection from "../../components/Home/HomeLoggedout/FeatureSection";
import TestimonialSection from "../../components/Home/HomeLoggedout/TestimonialSection";
import JoinCTA from "../../components/Home/HomeLoggedout/JoinCTA";


function HomeLoggedOut() {
  return (
    <main>
      <HeroSection />
      <ActionSection />
      <FeatureSection />
      <TestimonialSection />
      <JoinCTA />

    </main>
  );
}

export default HomeLoggedOut;
