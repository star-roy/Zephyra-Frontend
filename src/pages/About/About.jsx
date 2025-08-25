import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, MessageSquare, Camera } from "lucide-react";

function AboutPage() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#CADCFC] via-white to-[#CADCFC]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0D1B2A] mb-4 sm:mb-6 leading-tight">
            Unlock the magic of your City - Adventures begin just outside your
            door
          </h1>
          <p className="text-blue-500 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Zephyra isn't just an app - it's a storyteller by your side. From hidden hangouts to cultural gems, it helps you discover experiences like never before. Because the best stories start right where <b>You</b> are.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="order-2 lg:order-1">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0D1B2A] mb-3 sm:mb-2">
                Our Mission
              </h2>
              <p className="text-[#2C3E50] text-sm sm:text-base leading-relaxed">
                Our mission is to empower individuals to explore and engage with their surroundings, fostering a sense of community and discovery. We strive to be a trusted guide for uncovering hidden gems, events, and unique activities that spark curiosity and connection.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0D1B2A] mb-3 sm:mb-2">
                Our Team
              </h2>
              <p className="text-[#2C3E50] text-sm sm:text-base mb-4 leading-relaxed">
                We're a passionate team dedicated to making exploration accessible and enjoyable for everyone. Guided by diverse perspectives and a shared love for discovery, we continuously enhance and expand the Zephyra platform.
              </p>
              <div className="flex -space-x-2 relative">
                {["/team1.webp"].map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={src}
                      alt={`Team member ${i + 1}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#CADCFC] object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110 group-focus:scale-110"
                      tabIndex={0}
                    />
                    
                    {/* Hover/Focus Card - responsive positioning */}
                    <div className="absolute left-0 sm:left-20 top-20 sm:top-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible transition-all duration-300 z-20 pointer-events-none">
                      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-blue-200 backdrop-blur-lg w-72 sm:w-80 transform sm:-translate-y-1/4">
                        {/* Arrow for desktop - hidden on mobile */}
                        <div className="hidden sm:block absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
                          <div className="w-4 h-4 bg-white border-l-2 border-b-2 border-blue-200 rotate-45"></div>
                        </div>
                        
                        {/* Arrow for mobile - pointing up */}
                        <div className="block sm:hidden absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-2">
                          <div className="w-4 h-4 bg-white border-l-2 border-t-2 border-blue-200 rotate-45"></div>
                        </div>
                        
                        <div className="text-center">
                          <img 
                            src={src}
                            alt="Team member enlarged" 
                            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover mx-auto border-4 border-blue-200 shadow-sm"
                          />
                          <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] mt-3 sm:mt-4">Dibyaranjan Nayak</h3>
                          <p className="text-blue-500 font-medium text-sm leading-relaxed">
                            Founder & Developer
                          </p>
                          <p className="text-[#2C3E50] mt-2 text-sm leading-relaxed">
                            - Building Zephyra at the intersection of design and technology.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="order-1 lg:order-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0D1B2A] mb-4 sm:mb-6">
              What Zephyra Offers
            </h2>
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex items-start gap-3 sm:gap-4">
                <MapPin className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6 mt-1 sm:mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-base sm:text-lg mb-1">
                    Local Events
                  </h3>
                  <p className="text-[#2C3E50] text-sm sm:text-base leading-relaxed">
                    Discover nearby events that match your interests - from
                    festivals to local meetups, all in one place.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <Users className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6 mt-1 sm:mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-base sm:text-lg mb-1">
                    Community Activities
                  </h3>
                  <p className="text-[#2C3E50] text-sm sm:text-base leading-relaxed">
                    Join groups, workshops, and adventures to connect with
                    like-minded explorers near you.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <MessageSquare className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6 mt-1 sm:mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-base sm:text-lg mb-1">
                    User-Generated Contents
                  </h3>
                  <p className="text-[#2C3E50] text-sm sm:text-base leading-relaxed">
                    Share stories, tips, and hidden gems from your city — your
                    voice fuels the Zephyra community.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <Camera className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6 mt-1 sm:mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-base sm:text-lg mb-1">
                    Photo Galleries
                  </h3>
                  <p className="text-[#2C3E50] text-sm sm:text-base leading-relaxed">
                    Explore beautiful snapshots of local spots captured by
                    fellow adventurers and storytellers.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-r from-[#CADCFC] to-[#EBF2FF] border-2 border-[#CADCFC] rounded-xl py-6 sm:py-8 px-4 sm:px-6 lg:px-10 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0D1B2A] mb-3 sm:mb-4">
            We'd love to hear from you!
          </h2>
          <p className="text-blue-500 font-medium text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
            Have questions, suggestions, or feedback? Get in touch.
          </p>
          <Link
            to="/contact-us"
            className="shine-sweep inline-block bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg ring-1 ring-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-xl transform"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
}

export default AboutPage;
