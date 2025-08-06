import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, MessageSquare, Camera } from "lucide-react";

function AboutPage() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 bg-gradient-to-br from-[#CADCFC] via-white to-[#CADCFC]">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#0D1B2A] mb-4">
            Unlock the magic of your City – Adventures begin just outside your
            door
          </h1>
          <p className="text-blue-500 text-base sm:text-lg max-w-2xl mx-auto">
            Zephyra isn’t just an app - it’s your local adventure buddy. From
            hidden hangouts to cultural gems, we help you explore your city like
            never before. Because the best stories start right where you are.
          </p>
        </div>

        {/* Mission + Team + Offer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side: Our Mission and Team */}
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#0D1B2A] mb-2">
                Our Mission
              </h2>
              <p className="text-[#2C3E50] text-sm">
                Our mission is to empower individuals to explore and engage with
                their local areas, fostering a sense of community and discovery.
                We aim to provide a comprehensive resource for finding local
                events, hidden gems, and unique activities that cater to a wide
                range of interests.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0D1B2A] mb-2">
                Our Team
              </h2>
              <p className="text-[#2C3E50] text-sm mb-4">
                We are a passionate team of local enthusiasts dedicated to
                making exploration accessible and enjoyable for everyone. Our
                diverse backgrounds and shared love for community drive us to
                continuously improve and expand the Zephyra platform.
              </p>
              <div className="flex -space-x-2">
                {["/team1.jpg"].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Team member ${i + 1}`}
                    className="w-16 h-16 rounded-full border-4 border-[#CADCFC] object-cover"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: What We Offer */}
          <div>
            <h2 className="text-xl font-semibold text-[#0D1B2A] mb-4">
              What Zephyra Offers
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#4A90E2] w-5 h-5 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-sm">
                    Local Events
                  </h3>
                  <p className="text-[#2C3E50] text-sm">
                    Discover nearby events that match your interests - from
                    festivals to local meetups, all in one place.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="text-[#4A90E2] w-5 h-5 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-sm">
                    Community Activities
                  </h3>
                  <p className="text-[#2C3E50] text-sm">
                    Join local groups, workshops, and adventures to connect with
                    like-minded explorers near you.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="text-[#4A90E2] w-5 h-5 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-sm">
                    User-Generated Contents
                  </h3>
                  <p className="text-[#2C3E50] text-sm">
                    Share stories, tips, and hidden gems from your city — your
                    voice fuels the Zephyra community.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Camera className="text-[#4A90E2] w-5 h-5 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-sm">
                    Photo Galleries
                  </h3>
                  <p className="text-[#2C3E50] text-sm">
                    Explore beautiful snapshots of local spots captured by
                    fellow adventurers and storytellers.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-14 bg-gradient-to-r from-[#CADCFC] to-[#EBF2FF] border-2 border-[#CADCFC] rounded-xl py-10 px-6 sm:px-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D1B2A] mb-2">
            We'd love to hear from you!
          </h2>
          <p className="text-blue-500 font-medium text-sm sm:text-base mb-4">
            Have questions, suggestions, or feedback? Get in touch.
          </p>
          <Link
            to="/contact-us"
            className="shine-sweep inline-block bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md ring-1 ring-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
}

export default AboutPage;
