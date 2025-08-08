import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Historical Quests",
    description:
      "Uncover the rich history of your city through guided tours and local challenges.",
    image: "/assets/historical-quest2.jpg",
  },
  {
    title: "Food Trails",
    description:
      "Taste the authentic flavors of your city through curated culinary adventures.",
    image: "/assets/food-trail2.jpg",
  },
  {
    title: "Nature Escapes",
    description:
      "Discover scenic trails and outdoor activities to reconnect with nature.",
    image: "/assets/nature-escape.jpg",
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
    <section className="py-14 px-4 md:px-8 lg:px-16 w-full max-w-7xl mx-auto bg-[#F8F9FA] mt-10 rounded-2xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-blue-500">
        Explore Your Way
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Link
            to="/signup"
            key={index}
            className={`relative group bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 animate-staggerfadein opacity-0 [animation-delay:${0.2 + index * 0.15}s]`}
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/70 to-transparent group-hover:from-blue-500/40 transition duration-300 ease-in-out"></div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-2 group-hover:text-blue-600 transition">
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
