import React from "react";

function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "Zephyra helped me discover places in my city I never knew existed. The quests make exploration fun and meaningful.",
      name: "Sarah M.",
      title: "Happy Explorer",
      avatar: "/assets/user-avatar.jpeg",
    },
    {
      quote:
        "As a solo traveler, connecting with other explorers through Zephyra gave me community and purpose.",
      name: "David L.",
      title: "Adventure Seeker",
      avatar: "/assets/user-avatar3.jpeg",
    },
    {
      quote:
        "I love the gamified aspect of Zephyra. Badges and XP kept me motivated to explore and try new things.",
      name: "Emily R.",
      title: "Badge Collector",
      avatar: "/assets/user-avatar2.jpeg",
    },
  ];

  return (
    <section className="bg-[#0D1B2A] text-[#F8F9FA] py-16 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Hear From Our Community
        </h2>
        <p className="text-center sm:text-lg text-[#CADCFC] mb-12">
          From routine streets to hidden wonders - journeys that change the way you see home.<br />
          Real stories from explorers who’ve transformed their bond with their world.
        </p>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white text-[#2C3E50] rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <div className="mb-4 text-5xl text-[#4A90E2] leading-tight">“</div>
              <p className="text-base mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full ring-2 ring-[#4A90E2] object-cover bg-white p-1"
                />
                <div>
                  <p className="font-medium text-lg">{testimonial.name}</p>
                  <p className="text-sm text-[#4A90E2] font-medium">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
