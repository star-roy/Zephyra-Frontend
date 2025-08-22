import React from "react";

function PersonalizedGuidance() {
  const cards = [
    {
      title: "Recommended for You",
      description: "AI-powered articles and tips based on your activity and level.",
      image: "/assets/support1.webp",
    },
    {
      title: "Your Account & Profile",
      description: "Direct links to manage your account, password, and connected services.",
      image: "/assets/support2.webp",
    },
    {
      title: "Active Quest Support",
      description: "Trouble with a quest? Get contextual help here.",
      image: "/assets/support3.webp"
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 xl:px-14 mt-8 mb-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-midnightIndigo mb-5">
          Personalized Guidance & Quick Access
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition p-4 text-center"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-28 sm:h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-sm font-semibold text-midnightIndigo mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-stormyGrey leading-snug">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PersonalizedGuidance;
