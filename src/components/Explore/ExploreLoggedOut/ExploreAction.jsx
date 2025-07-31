import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Historical Quests",
    description:
      "Uncover the rich history of your city through guided tours and local challenges.",
    image: "/assets/historical-quest1.jpeg",
  },
  {
    title: "Food Trails",
    description:
      "Taste the authentic flavors of your city through curated culinary adventures.",
    image: "/assets/food-trail1.jpeg",
  },
  {
    title: "Nature Escapes",
    description:
      "Discover scenic trails and outdoor activities to reconnect with nature.",
    image: "/assets/nature-escape.jpeg",
  },
  {
    title: "Arts & Culture",
    description:
      "Immerse yourself in the vibrant art, crafts, and cultural experiences around you.",
    image: "/assets/arts-culture1.jpeg",
  },
];

function ExploreAction() {
  return (
    <section className="py-14 px-4 md:px-8 lg:px-16 w-full max-w-7xl mx-auto bg-[#F8F9FA] mt-10 rounded-lg shadow-md ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#0D1B2A] mb-10">
        Explore Your Way
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Link
            to="/signup"
            key={index}
            className="relative group bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl duration-300"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/80 to-transparent group-hover:from-[#4A90E2]/70 transition duration-300 ease-in-out"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm font-medium text-[#869AB8]">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ExploreAction;
