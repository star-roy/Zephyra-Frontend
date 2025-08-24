import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, MessageSquare, Camera } from "lucide-react";

function AboutPage() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-14 bg-gradient-to-br from-[#CADCFC] via-white to-[#CADCFC]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#0D1B2A] mb-4">
            Unlock the magic of your City - Adventures begin just outside your
            door
          </h1>
          <p className="text-blue-500 text-base sm:text-lg max-w-2xl mx-auto">
            Zephyra isn't just an app - it's a storyteller by your side. From hidden hangouts to cultural gems, it helps you discover experiences like never before. Because the best stories start right where <b>You</b> are.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#0D1B2A] mb-2">
                Our Mission
              </h2>
              <p className="text-[#2C3E50] text-base">
                Our mission is to empower individuals to explore and engage with their surroundings, fostering a sense of community and discovery. We strive to be a trusted guide for uncovering hidden gems, events, and unique activities that spark curiosity and connection.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0D1B2A] mb-2">
                Our Team
              </h2>
              <p className="text-[#2C3E50] text-base mb-4">
                We're a passionate team dedicated to making exploration accessible and enjoyable for everyone. Guided by diverse perspectives and a shared love for discovery, we continuously enhance and expand the Zephyra platform.
              </p>
              <div className="flex -space-x-2 relative">
                {["/team1.webp"].map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={src}
                      alt={`Team member ${i + 1}`}
                      className="w-16 h-16 rounded-full border-4 border-[#CADCFC] object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Hover Card - appears on hover */}
                    <div className="absolute left-20 top-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20 pointer-events-none">
                      <div className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-blue-200 backdrop-blur-lg w-80 transform -translate-y-1/4">
                        <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
                          <div className="w-4 h-4 bg-white border-l-2 border-b-2 border-blue-200 rotate-45"></div>
                        </div>
                        
                        <div className="text-center">
                          <img 
                            src={src}
                            alt="Team member enlarged" 
                            className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-blue-200 shadow-sm"
                          />
                          <h3 className="text-xl font-bold text-[#0D1B2A] mt-4">Dibyaranjan Nayak</h3>
                          <p className="text-blue-500 font-medium text-sm leading-relaxed">
                            Founder & Developer
                          </p>
                          <p className="text-[#2C3E50] mt-2 text-sm leading-relaxed">
                            - Building Zephyra at the intersection of design and technology.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div>
            <h2 className="text-xl font-semibold text-[#0D1B2A] mb-4">
              What Zephyra Offers
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 w-5 h-5 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-base">
                    Local Events
                  </h3>
                  <p className="text-[#2C3E50] text-sm">
                    Discover nearby events that match your interests - from
                    festivals to local meetups, all in one place.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="text-blue-500 w-5 h-5 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-base">
                    Community Activities
                  </h3>
                  <p className="text-[#2C3E50] text-sm">
                    Join groups, workshops, and adventures to connect with
                    like-minded explorers near you.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="text-blue-500 w-5 h-5 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-base">
                    User-Generated Contents
                  </h3>
                  <p className="text-[#2C3E50] text-sm">
                    Share stories, tips, and hidden gems from your city — your
                    voice fuels the Zephyra community.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Camera className="text-blue-500 w-5 h-5 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] text-base">
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
