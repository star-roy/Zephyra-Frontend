import React, { useState } from "react";
import { FaMapMarkerAlt, FaStar, FaCheckCircle, FaCamera, FaRedoAlt, FaShareAlt } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

// Zephyra theme color palette
const zephyra = {
  zephyraBlue: "#7F56D9",
  zephyraGold: "#FDB022",
  cloudWhite: "#F8FAFC",
  stormyGrey: "#667085",
  duskHaze: "#F2F4F7",
};

// Helper styles
const theme = {
  bg: `bg-[${zephyra.cloudWhite}]`,
  card: "bg-white border border-[#f2f4f7] shadow-sm",
  primary: `text-[${zephyra.zephyraBlue}]`,
  accent: `text-[${zephyra.zephyraGold}]`,
  accentBg: `bg-[${zephyra.zephyraGold}]`,
  accentBgSoft: `bg-[${zephyra.duskHaze}]`,
  tagBg: `bg-[${zephyra.duskHaze}]`,
  tagText: `text-[${zephyra.stormyGrey}]`,
  button: `bg-[${zephyra.zephyraBlue}] hover:bg-[#6842c2]`,
  buttonAccent: `bg-[${zephyra.zephyraGold}] hover:bg-[#e39d1a]`,
  border: `border-[${zephyra.duskHaze}]`
};

const quest = {
  title: "Explore Historic Downtown",
  image: "/assets/downtown.jpg",
  xp: 50,
  tags: ["#history", "#architecture"],
  details:
    "Embark on a journey through the heart of our city's past. This quest will lead you through the charming streets of historic downtown, where you'll uncover stories etched in stone and architecture that whisper tales of bygone eras. Discover hidden gems, from quaint boutiques to grand landmarks, and immerse yourself in the rich tapestry of our local heritage.",
  steps: [
    {
      label: "The Old Town Square",
      description:
        "Start at the town square and find the oldest building. Take a picture of the plaque to begin your journey.",
    },
    {
      label: "Main Street Murals",
      description:
        "Walk down Main Street and find the mural depicting the city's founding. Answer a question about it to proceed.",
    },
    {
      label: "Hidden Courtyard",
      description:
        "Find the tucked-away courtyard and look for the fountain. Record a short video explaining its history.",
    },
    {
      label: "City Hall",
      description:
        "Head to City Hall and snap a photo of the old clock tower. Submit your favorite fun fact about the building.",
    },
  ],
  distance: "1.2 km from your location",
  map: "/assets/quest-map.png",
  address: "123 Main St, Historic Downtown, Springfield",
  tips: [
    "Wear comfortable shoes! There's a fair bit of walking involved.",
    "Don't miss the hidden alleyways for unique photo opportunities.",
    "Best to go in the morning to avoid crowds at popular spots.",
  ],
  reviews: [
    {
      name: "Sophia C.",
      avatar: "/assets/profile-sophia.jpg",
      text: "Loved discovering the city's history. A must-do!",
      rating: 4,
    },
    {
      name: "Ben M.",
      avatar: "/assets/profile-ben.jpg",
      text: "A fantastic way to spend a Saturday. Learned so much!",
      rating: 5,
    },
  ],
  achievements: [
    {
      icon: <FaCheckCircle className="text-[#7F56D9] text-xl" />,
      label: "History Buff",
      desc: "Complete 5 history quests.",
    },
    {
      icon: <FaCamera className="text-[#FDB022] text-xl" />,
      label: "City Photographer",
      desc: "Submit 10 photos during quests.",
    },
  ],
  communityRating: {
    average: 4.5,
    totalReviews: 120,
    breakdown: {
      5: 80,
      4: 25,
      3: 9,
      2: 4,
      1: 2,
    },
  },
};

function StarRating({ rating, size = "xs" }) {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar
          key={i}
          className={
            i <= rating
              ? `text-[${zephyra.zephyraGold}] ${sizes[size]} mr-0.5`
              : `text-[${zephyra.duskHaze}] ${sizes[size]} mr-0.5`
          }
        />
      ))}
    </span>
  );
}

function RateStars({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          className="focus:outline-none"
          onClick={() => onChange(star)}
        >
          <FaStar
            className={
              star <= value
                ? `text-[${zephyra.zephyraGold}] text-2xl transition`
                : `text-[${zephyra.duskHaze}] text-2xl transition`
            }
          />
        </button>
      ))}
    </div>
  );
}

function RatingBar({ value, max, percent }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs text-[#22223B] w-3">{value}</span>
      <div className="flex-1 h-2 rounded bg-[#F2F4F7] relative">
        <div
          className="h-2 rounded absolute left-0 top-0"
          style={{
            width: `${percent}%`,
            background: zephyra.zephyraBlue,
          }}
        />
      </div>
    </div>
  );
}

function CommunityRatingSection({ ratingData }) {
  const { average, totalReviews, breakdown } = ratingData;
  return (
    <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col items-center w-full min-w-[210px]">
      <div className="font-semibold text-[#7F56D9] mb-2 text-base sm:text-lg">
        Community Rating
      </div>
      <div className="flex flex-col items-center mb-3">
        <span className="text-4xl font-bold text-[#22223B] leading-none">{average}</span>
        <div className="-mt-1 mb-1">
          <StarRating rating={average} size="base" />
        </div>
        <span className="text-xs text-[#667085]">
          Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="w-full flex flex-col gap-1">
        {[5, 4, 3, 2, 1].map((val) => {
          const percent =
            totalReviews === 0 ? 0 : (breakdown[val] / totalReviews) * 100;
          return (
            <RatingBar
              key={val}
              value={val}
              max={totalReviews}
              percent={percent}
            />
          );
        })}
      </div>
    </div>
  );
}

function ActionsSection() {
  return (
    <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col gap-3 w-full min-w-[210px]">
      <div className="font-semibold text-[#7F56D9] mb-1">Actions</div>
      <button
        type="button"
        className="flex items-center gap-2 py-2 px-3 w-full justify-center rounded-xl border border-[#F2F4F7] text-[#7F56D9] bg-white hover:bg-[#F8FAFC] font-semibold transition"
      >
        <FaRedoAlt /> Do This Quest Again
      </button>
      <button
        type="button"
        className="flex items-center gap-2 py-2 px-3 w-full justify-center rounded-xl border border-[#F2F4F7] text-[#7F56D9] bg-white hover:bg-[#F8FAFC] font-semibold transition"
      >
        <FaShareAlt /> Share Completion
      </button>
      <button
        type="button"
        className="flex items-center gap-2 py-2 px-3 w-full justify-center rounded-xl bg-[#7F56D9] text-white font-semibold hover:bg-[#6842c2] transition"
      >
        <HiOutlineArrowNarrowRight /> Explore More Quests
      </button>
    </div>
  );
}

function QuestOverviewPage() {
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const stepsToShow = showAllSteps ? quest.steps : quest.steps.slice(0, 2);

  const handleSubmitRating = (e) => {
    e.preventDefault();
    setRatingSubmitted(true);
    // Here you would send the rating and review to your backend or analytics
  };

  // Google embed route map based on manual address (shows a marker or route if you have start/end)
  const googleMapEmbedUrl = quest.address
    ? `https://www.google.com/maps?q=${encodeURIComponent(quest.address)}&output=embed`
    : "";

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
      <main className="max-w-6xl mx-auto px-2 sm:px-4 py-4 lg:py-10 w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6">
          {/* Banner Card */}
          <div className="bg-white border border-[#F2F4F7] rounded-3xl shadow-sm overflow-hidden">
            <div className="relative h-56 xs:h-64 sm:h-72 md:h-80 lg:h-[430px] w-full transition-all">
              <img
                src={quest.image}
                alt={quest.title}
                className="w-full h-full object-cover"
              />
              {/* QUEST tag */}
              <span className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold text-[#7F56D9] shadow">
                QUEST
              </span>
              {/* Title */}
              <span className="absolute bottom-4 left-24 text-white text-lg xs:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow">
                {quest.title}
              </span>
            </div>
          </div>
          {/* Quest Details */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col md:flex-row md:items-center gap-4 relative">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                <span className="font-semibold text-[#7F56D9] text-base mr-2">Quest Details</span>
                {quest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#F2F4F7] text-[#667085] text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[#344054] text-base">{quest.details}</p>
            </div>
            <div className="absolute top-4 right-4 md:static">
              <span className="bg-[#FDB022] text-white font-bold px-4 py-2 rounded-xl text-sm shadow">
                +{quest.xp} XP
              </span>
            </div>
          </div>
          {/* Steps */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg text-[#7F56D9]">
                Start Your Adventure
              </h2>
              {quest.steps.length > 2 && (
                <button
                  className="text-[#7F56D9] text-sm font-semibold hover:underline focus:outline-none"
                  onClick={() => setShowAllSteps((open) => !open)}
                >
                  {showAllSteps ? "Show Less" : "View All Steps"}
                </button>
              )}
            </div>
            <ol className="space-y-4">
              {stepsToShow.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="bg-[#7F56D9] text-white font-bold w-8 h-8 flex items-center justify-center rounded-full text-base mt-0.5 shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-medium text-[#7F56D9]">{step.label}</div>
                    <div className="text-sm text-[#667085]">{step.description}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {/* Rate this Quest */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col gap-2 items-start">
            <div className="font-semibold text-[#7F56D9] text-lg mb-1">Rate this Quest</div>
            {ratingSubmitted ? (
              <div className="text-[#22c55e] font-medium text-sm">Thank you for your feedback!</div>
            ) : (
              <form onSubmit={handleSubmitRating} className="flex flex-col gap-2 w-full">
                <RateStars value={userRating} onChange={setUserRating} />
                <textarea
                  className="mt-2 w-full rounded-xl border border-[#F2F4F7] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                  rows={3}
                  placeholder="Share your experience..."
                  value={userReview}
                  onChange={e => setUserReview(e.target.value)}
                  maxLength={500}
                  style={{ minHeight: 48 }}
                />
                <button
                  type="submit"
                  className="mt-1 self-start px-4 py-2 bg-[#7F56D9] hover:bg-[#6842c2] text-white font-semibold rounded-xl text-sm transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={userRating === 0 && userReview.trim() === ""}
                >
                  Submit Rating
                </button>
              </form>
            )}
          </div>
          {/* Community Rating & Actions - horizontally */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <CommunityRatingSection ratingData={quest.communityRating} />
            <ActionsSection />
          </div>
        </div>
        {/* Right Side */}
        <aside className="w-full lg:w-[360px] flex flex-col gap-4 md:gap-6">
          {/* Map Card (Square) - EDITED: embed Google map and show manual address below */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-3 sm:p-4 flex flex-col">
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 border border-[#F2F4F7]">
              {googleMapEmbedUrl ? (
                <iframe
                  title="Quest Route Map"
                  src={googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "320px", minWidth: "100%" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <img
                  src={quest.map}
                  alt="Quest route map"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center text-sm text-[#667085] mb-4">
              <FaMapMarkerAlt className="mr-2 text-[#7F56D9]" />
              <span>{quest.distance}</span>
            </div>
            {/* Manual address displayed below the map */}
            <div className="bg-slate-100 px-4 py-3 rounded-lg text-slate-700 text-base font-medium mb-4">
              <span className="font-semibold text-[#7F56D9]">Address: </span>
              {quest.address}
            </div>
            <button className="w-full py-3 bg-[#7F56D9] hover:bg-[#6842c2] text-white font-semibold rounded-xl transition text-base">
              Start Quest
            </button>
          </div>
          {/* Explorer Tips */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-5">
            <div className="font-semibold mb-2 text-[#7F56D9] flex items-center gap-2">
              <MdOutlineTipsAndUpdates className="text-[#7F56D9] text-lg" />
              Explorer Tips
            </div>
            <ul className="space-y-2 text-sm text-[#667085]">
              {quest.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <BsFillInfoCircleFill className="min-w-4 mt-1 text-[#7F56D9]" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Explorer Reviews */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-5">
            <div className="font-semibold mb-2 text-[#7F56D9]">Explorer Reviews</div>
            <div className="space-y-4">
              {quest.reviews.map((review, i) => (
                <div key={i} className="flex items-start gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[#7F56D9]">{review.name}</span>
                      <StarRating rating={review.rating} />
                    </div>
                    <div className="text-sm text-[#667085]">&quot;{review.text}&quot;</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Related Achievements */}
          <div className="bg-white border border-[#F2F4F7] rounded-2xl shadow-sm p-4 sm:p-5">
            <div className="font-semibold mb-2 text-[#7F56D9]">Related Achievements</div>
            <div className="flex flex-col gap-3">
              {quest.achievements.map((ach, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#F2F4F7] rounded-full">
                    {ach.icon}
                  </span>
                  <div>
                    <div className="font-medium text-[#7F56D9]">{ach.label}</div>
                    <div className="text-[#667085]">{ach.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default QuestOverviewPage;