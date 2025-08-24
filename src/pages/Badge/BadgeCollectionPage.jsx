import React from "react";

// Dummy Data for badges
const badgesInProgress = [
  {
    id: "history-buff",
    title: "History Buff",
    subtitle: "3 more historical quests",
    progress: 75,
    image: "/images/history-buff.jpg",
    label: "QUEST SERIES",
    link: "#",
  },
  {
    id: "foodie-adventurer",
    title: "Foodie Adventurer",
    subtitle: "2 more food quests",
    progress: 60,
    image: "/images/foodie-adventurer.jpg",
    label: "FOODIE COLLECTION",
    link: "#",
  },
  {
    id: "nature-lover",
    title: "Nature Lover",
    subtitle: "1 more nature quest",
    progress: 80,
    image: "/images/nature-lover.jpg",
    label: null,
    link: "#",
  },
  {
    id: "urban-pioneer",
    title: "Urban Pioneer",
    subtitle: "1 more urban quest",
    progress: 50,
    image: "/images/urban-pioneer.jpg",
    label: null,
    link: "#",
  },
];

const earnedBadges = [
  {
    id: "city-explorer",
    title: "City Explorer",
    date: "Jan 15, 2024",
    image: "/images/city-explorer.jpg",
    label: null,
  },
  {
    id: "art-enthusiast",
    title: "Art Enthusiast",
    date: "Feb 02, 2024",
    image: "/images/art-enthusiast.jpg",
    label: null,
  },
  {
    id: "coffee-connoisseur",
    title: "Coffee Connoisseur",
    date: "Feb 28, 2024",
    image: "/images/coffee-connoisseur.jpg",
    label: "SERIES",
  },
  {
    id: "nightlife-navigator",
    title: "Nightlife Navigator",
    date: "Mar 12, 2024",
    image: "/images/nightlife-navigator.jpg",
    label: null,
  },
  {
    id: "hidden-gems-hunter",
    title: "Hidden Gems Hunter",
    date: "Mar 25, 2024",
    image: "/images/hidden-gems-hunter.jpg",
    label: "COLLECTION",
  },
];

const moreBadges = [
  {
    id: "culture-seeker",
    title: "Culture Seeker",
    subtitle: "Complete 5 cultural quests",
    image: "/images/culture-seeker.jpg",
  },
  {
    id: "thrill-seeker",
    title: "Thrill Seeker",
    subtitle: "Complete 5 adventure quests",
    image: "/images/thrill-seeker.jpg",
  },
  {
    id: "wellness-warrior",
    title: "Wellness Warrior",
    subtitle: "Complete 5 wellness quests",
    image: "/images/wellness-warrior.jpg",
  },
  {
    id: "eco-champion",
    title: "Eco-Champion",
    subtitle: "Complete 5 eco quests",
    image: "/images/eco-champion.jpg",
  },
  {
    id: "community",
    title: "Community",
    subtitle: "Complete 5 social quests",
    image: "/images/community.jpg",
  },
  {
    id: "urban-pioneer",
    title: "Urban Pioneer",
    subtitle: "Complete 5 urban quests",
    image: "/images/urban-pioneer.jpg",
  },
];

function BadgeProgressCard({
  image,
  title,
  subtitle,
  progress,
  label,
  link,
}) {
  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-2xl shadow-lg border border-slate-200 p-0 overflow-hidden flex flex-col min-w-[230px] max-w-[260px] transition-transform hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-36">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
        />
        {label && (
          <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {label}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center mt-6">
          <div className="relative">
            <svg width={82} height={82}>
              <circle
                cx={41}
                cy={41}
                r={34}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={7}
              />
              <circle
                cx={41}
                cy={41}
                r={34}
                fill="none"
                stroke="#14B8A6"
                strokeWidth={7}
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - progress / 100)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.4s" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-slate-900 font-bold text-xl drop-shadow">
              {progress}%
            </span>
          </div>
        </div>
      </div>
      <div className="px-6 pt-5 pb-4 flex-1 flex flex-col">
        <div className="font-bold text-base text-slate-900 mb-1">{title}</div>
        <div className="text-slate-400 text-sm mb-2">{subtitle}</div>
        <div className="mb-2">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-teal-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <a
          href={link}
          className="text-teal-600 text-sm font-semibold hover:underline mt-auto"
        >
          See Quests for This Badge
        </a>
      </div>
    </div>
  );
}

function EarnedBadgeCard({ image, title, date, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative group">
        <img
          src={image}
          alt={title}
          className="w-24 h-24 rounded-full border-4 border-teal-100 object-cover bg-slate-50 shadow group-hover:shadow-lg transition"
        />
        {label && (
          <span className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            {label}
          </span>
        )}
      </div>
      <div className="text-sm font-semibold text-slate-800 text-center">{title}</div>
      <div className="text-xs text-slate-400 text-center">Earned: {date}</div>
    </div>
  );
}

function DiscoverBadgeCard({ image, title, subtitle }) {
  return (
    <div className="flex flex-col items-center gap-2 opacity-60 grayscale">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shadow">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-xs font-semibold text-slate-500 text-center">{title}</div>
      <div className="text-xs text-slate-400 text-center">{subtitle}</div>
    </div>
  );
}

function BadgeCollectionPage() {
  // Group progress badges by 4 per row
  const progressRows = [];
  for (let i = 0; i < badgesInProgress.length; i += 4) {
    progressRows.push(badgesInProgress.slice(i, i + 4));
  }

  // Group earned badges by 5 per row
  const earnedRows = [];
  for (let i = 0; i < earnedBadges.length; i += 5) {
    earnedRows.push(earnedBadges.slice(i, i + 5));
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-teal-50 min-h-screen pb-12">
      <main className="max-w-5xl mx-auto pt-12 px-4 sm:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-7 text-center drop-shadow">Your Badge Collection</h1>
        
        {/* Badges in Progress */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Badges in Progress</h2>
          {progressRows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center mb-8"
            >
              {row.map((badge) => (
                <BadgeProgressCard key={badge.id} {...badge} />
              ))}
            </div>
          ))}
        </section>

        {/* Your Earned Badges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Earned Badges</h2>
          {earnedRows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 justify-center mb-8"
            >
              {row.map((badge) => (
                <EarnedBadgeCard key={badge.id} {...badge} />
              ))}
            </div>
          ))}
        </section>

        {/* Discover More Badges */}
        <section className="mb-2">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Discover More Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-center">
            {moreBadges.map((badge) => (
              <DiscoverBadgeCard key={badge.id} {...badge} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default BadgeCollectionPage;