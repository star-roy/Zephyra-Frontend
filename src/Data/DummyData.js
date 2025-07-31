// Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-07-29 08:51:25
// Current User's Login: star-roy

export const ongoingQuests = [
  // {
  //   id: "ongoing-001",
  //   image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  //   title: "Explore the Hidden Gems of Downtown",
  //   description: "Discover the secret spots and local favorites in the heart of the city. Visit historic landmarks, hidden cafes, and underground passages that only locals know about.",
  //   progress: 75,
  //   currentStep: 4,
  //   totalSteps: 5,
  //   xpReward: 300,
  //   timeRemaining: "2 days left",
  //   startedAt: "2025-07-27T08:30:00Z",
  //   lastActivity: "2025-07-29T08:50:00Z"
  // },
  // {
  //   id: "ongoing-002",
  //   image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
  //   title: "Taste of the World Food Tour",
  //   description: "Embark on a culinary journey through diverse cuisines and flavors. Try authentic dishes from 8 different cultures and learn about their history and preparation methods.",
  //   progress: 45,
  //   currentStep: 3,
  //   totalSteps: 8,
  //   xpReward: 250,
  //   timeRemaining: "4 days left",
  //   startedAt: "2025-07-25T10:15:00Z",
  //   lastActivity: "2025-07-28T19:30:00Z"
  // },
  // {
  //   id: "ongoing-003",
  //   image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
  //   title: "Urban Photography Challenge",
  //   description: "Capture the essence of city life through your lens. Document street art, architecture, and candid moments that tell the story of urban culture.",
  //   progress: 90,
  //   currentStep: 9,
  //   totalSteps: 10,
  //   xpReward: 400,
  //   timeRemaining: "1 day left",
  //   startedAt: "2025-07-22T14:20:00Z",
  //   lastActivity: "2025-07-29T08:51:00Z"
  // }
];

export const forYouCards = [
  {
    id: "quest-001",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    title: "City Parks & Green Spaces",
    description: "Unwind and explore the city's natural oases. Perfect for a relaxing afternoon adventure through beautiful gardens and peaceful walking trails.",
    difficulty: "Easy",
    xp: 120
  },
  {
    id: "quest-002",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80",
    title: "The Ultimate Coffee Crawl",
    description: "Discover the best brews and coziest cafes the city has to offer. Meet local baristas and learn about different coffee brewing techniques.",
    difficulty: "Medium",
    xp: 180
  },
  {
    id: "quest-003",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    title: "Local Market Scavenger Hunt",
    description: "Find unique ingredients and artisan goods at the farmer's market. Interact with local vendors and discover seasonal specialties.",
    difficulty: "Hard",
    xp: 250
  }
];

// User Created Quests - Only shows if user has created quests
export const userCreatedQuests = [
  {
    id: "created-001",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80",
    title: "Sunset Photography Tour",
    description: "Capture the perfect golden hour shots across the city's most photogenic locations. Learn composition techniques and editing tips from fellow photographers.",
    participants: 23,
    status: "Active",
    createdAt: "2025-07-25T14:30:00Z"
  },
  {
    id: "created-002",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80",
    title: "Local Artisan Market Hunt",
    description: "Discover handcrafted treasures and meet local artists in the weekend market. Support small businesses while finding unique souvenirs.",
    participants: 8,
    status: "Draft",
    createdAt: "2025-07-28T16:45:00Z"
  }
];

// To simulate a user with no created quests, uncomment the line below:
// export const userCreatedQuests = [];

export const completedQuests = [
  {
    id: "completed-001",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a07b1?auto=format&fit=crop&w=400&q=80",
    title: "Nature Trails Exploration",
    date: "Completed on July 26, 2025"
  },
  {
    id: "completed-002",
    image: "https://images.unsplash.com/photo-1465101178521-1bc9e6a0be0e?auto=format&fit=crop&w=400&q=80",
    title: "Historical Landmarks Tour",
    date: "Completed on July 23, 2025"
  },
  {
    id: "completed-003",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80",
    title: "Rooftop Garden Discovery",
    date: "Completed on July 20, 2025"
  }
];

export const userProfile = {
  username: "star-roy",
  displayName: "Star Roy",
  lastLogin: "2025-07-29T08:51:25Z",
  joinedDate: "2024-03-15T09:30:00Z",
  totalXP: 2750,
  level: 9,
  questsCompleted: 26,
  currentStreak: 8,
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
};