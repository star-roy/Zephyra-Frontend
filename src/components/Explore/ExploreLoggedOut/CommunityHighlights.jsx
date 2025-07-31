import React from "react";

// --- Reusable Quote Icon ---
const QuoteIcon = () => (
  <svg
    className="w-6 h-6 text-[#2C3E50] opacity-20 mb-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M17 8h2a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4h-1" />
    <path d="M7 8H5a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4h1" />
  </svg>
);

// --- Column Data with Local Images ---
const column1Items = [
  {
    type: "quote",
    quote: "Zephyra helped me discover places in my city I never knew existed. The quests make exploration fun and meaningful.",
    author: "- Sarah M.",
    style: "bg-[#CADCFC]",
    textColor: "text-[#0D1B2A]"
  },
  {
    type: "image",
    image: "/assets/community1.jpeg",
    alt: "Local food platter",
    text: "A feast for the eyes and the soul.",
    heightClass: "h-[300px]",
  },
  {
    type: "stat",
    title: "4.7 ★",
    sub: "Average Rating",
    style: "bg-[#E0F7FA]",
    titleColor: 'text-[#0D1B2A]',  
  },
];

const column2Items = [
  {
    type: "stat",
    title: "1,200+",
    sub: "Quests Completed",
    titleColor: 'text-[#0D1B2A]',
    style: "bg-[#E0F7FA]",
  },
  {
    type: "quote",
    quote: "As a solo traveler, connecting with other explorers through Zephyra gave me community and purpose.",
    author: "- David L.",
    style: "bg-[#869AB8]",
    textColor: "text-[#0D1B2A]",
    authorColor: "text-[#E0F7FA]",
  },
  {
    type: "image",
    image: "/assets/community2.jpeg",
    alt: "Temple carvings",
    text: "The Historic details are incredible.",
    heightClass: "h-[260px]",
  },
];

const column3Items = [
  {
    type: "image",
    image: "/assets/community31.jpeg",
    alt: "Historical site visit",
    text: "A moment of peace at the temple.",
    heightClass: "h-[420px]",
  },
  {
    type: "image",
    image: "/assets/community4.jpeg",
    alt: "Silhouette of explorer",
    text: "Chasing the sunset.",
  },
];

const column4Items = [
  {
    type: "image",
    image: "/assets/community5.jpeg",
    alt: "Local cuisine",
    text: "Found the best Dahibara Aloodum!",
  },
  {
    type: "stat",
    title: "500+",
    sub: "Active Explorers",
    style: "bg-[#CADCFC]",
  },
  {
    type: "image",
    image: "/assets/community6.jpeg",
    alt: "Nature walk",
    text: "Morning walk through mountains.",
  },
];

// --- Reusable Card Component ---
function Card({ item }) {
  const baseStyle =
    "rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.03] shadow hover:shadow-xl";

  switch (item.type) {
    case "image":
      return (
        <div className={`${baseStyle} ${item.heightClass || "h-[220px]"}`}>
          <div className="relative w-full h-full group">
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover group-hover:brightness-75 transition duration-300"
            />
            <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-sm font-medium">{item.text}</p>
            </div>
          </div>
        </div>
      );
    case "quote":
      return (
        <div
          className={`${baseStyle} h-[170px] ${item.style} p-5 flex flex-col justify-center`}
        >
          <QuoteIcon />
          <p
            className={`${
              item.textColor || "text-[#2C3E50] "
            } italic text-base leading-tight`}
          >
            {item.quote}
          </p>
          <p
            className={`text-sm font-semibold mt-2 ${
              item.authorColor || "text-[#869AB8]"
            }`}
          >
            {item.author}
          </p>
        </div>
      );
    case "stat":
      return (
        <div
          className={`${baseStyle} h-[100px] ${item.style} p-6 flex flex-col justify-center items-center`}
        >
          <p
            className={`text-3xl font-bold ${
              item.titleColor || "text-[#2C3E50]"
            }`}
          >
            {item.title}
          </p>
          <p className={`text-sm ${item.subColor || "text-[#869AB8]"}`}>
            {item.sub}
          </p>
        </div>
      );

    default:
      return null;
  }
}

// --- Main Component ---
function CommunityHighlights() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#ffffff] pt-5 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50]">
            From the Community
          </h2>
          <p className="mt-4 text-lg text-[#869AB8] max-w-3xl mx-auto font-semibold">
            Journeys, discoveries, and moments captured by Zephyra explorers
            across the city.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex flex-col gap-5">
            {column1Items.map((item, idx) => (
              <Card key={idx} item={item} />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {column2Items.map((item, idx) => (
              <Card key={idx} item={item} />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {column3Items.map((item, idx) => (
              <Card key={idx} item={item} />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {column4Items.map((item, idx) => (
              <Card key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommunityHighlights;
