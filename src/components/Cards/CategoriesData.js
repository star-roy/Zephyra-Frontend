import {
  FaTree,
  FaUtensils,
  FaPaintBrush,
  FaLandmark,
  FaGlobeAsia,
  FaBinoculars,
} from "react-icons/fa";

export const categoriesData = [
  {
    name: "Outdoors",
    icon: FaTree,
    image: "/assets/user-avatar3.jpeg",
    label: "Great Outdoors",
    quests: [
      {
        id: "out-1",
        title: "Hike the Hidden Trail",
        description: "Breathe nature and earn XP.",
        image: "/assets/community4.jpeg",
      },
      {
        id: "out-2",
        title: "Sunset at Fort Hill",
        description: "A perfect golden hour quest.",
        image: "/images/outdoors2.jpg",
      },
      {
        id: "out-3",
        title: "Park Clean-Up Challenge",
        description: "Give back while exploring.",
        image: "/images/outdoors3.jpg",
      },
      {
        id: "out-4",
        title: "Morning Bird Walk",
        description: "Find rare birds in your city.",
        image: "/images/outdoors4.jpg",
      },
    ],
  },
  {
    name: "Food",
    icon: FaUtensils,
    image: "/images/categories/food.jpg",
    label: "Great Food",
    quests: [
      {
        id: "food-1",
        title: "Savor the Best Street Food",
        description: "Explore hidden stalls with iconic flavors.",
        image: "/images/food1.jpg",
      },
      {
        id: "food-2",
        title: "Discover a Cozy Café",
        description: "Relax and enjoy something new.",
        image: "/images/food2.jpg",
      },
      {
        id: "food-3",
        title: "Dessert Crawl Mission",
        description: "Complete the sweetest challenge.",
        image: "/images/food3.jpg",
      },
      {
        id: "food-4",
        title: "Midnight Biryani Quest",
        description: "Find the best biryani after dark.",
        image: "/images/food4.jpg",
      },
    ],
  },
  {
    name: "Art",
    icon: FaPaintBrush,
    image: "/images/categories/art.jpg",
    label: "Inspiring Art",
    quests: [
      {
        id: "art-1",
        title: "Street Mural Hunt",
        description: "Find and admire local mural art.",
        image: "/images/art1.jpg",
      },
      {
        id: "art-2",
        title: "Visit the Open Gallery",
        description: "Explore a rotating outdoor art exhibit.",
        image: "/images/art2.jpg",
      },
      {
        id: "art-3",
        title: "Sketch the City",
        description: "Draw a local scene from your walk.",
        image: "/images/art3.jpg",
      },
      {
        id: "art-4",
        title: "Sculpture Spotting Quest",
        description: "Track down 3 unique sculptures.",
        image: "/images/art4.jpg",
      },
    ],
  },
  {
    name: "History",
    icon: FaLandmark,
    image: "/images/categories/history.jpg",
    label: "Timeless History",
    quests: [
      {
        id: "hist-1",
        title: "Old Fort Discovery",
        description: "Uncover stories from ancient walls.",
        image: "/images/history1.jpg",
      },
      {
        id: "hist-2",
        title: "Freedom Trail Quest",
        description: "Visit monuments from the independence era.",
        image: "/images/history2.jpg",
      },
      {
        id: "hist-3",
        title: "Local Museum Trek",
        description: "Collect fun facts from exhibits.",
        image: "/images/history3.jpg",
      },
      {
        id: "hist-4",
        title: "Heritage Walk Mission",
        description: "Join a guided tour in old city lanes.",
        image: "/images/history4.jpg",
      },
    ],
  },
  {
    name: "Culture",
    icon: FaGlobeAsia,
    image: "/images/categories/culture.jpg",
    label: "Rich Culture",
    quests: [
      {
        id: "cult-1",
        title: "Folk Dance Festival",
        description: "Attend a vibrant cultural performance.",
        image: "/images/culture1.jpg",
      },
      {
        id: "cult-2",
        title: "Traditional Market Tour",
        description: "Explore and learn about regional crafts.",
        image: "/images/culture2.jpg",
      },
      {
        id: "cult-3",
        title: "Cultural Food Tasting",
        description: "Try dishes from 3 local cuisines.",
        image: "/images/culture3.jpg",
      },
      {
        id: "cult-4",
        title: "Temple Trail Quest",
        description: "Visit 3 culturally significant temples.",
        image: "/images/culture4.jpg",
      },
    ],
  },
  {
    name: "Hidden Gems",
    icon: FaBinoculars,
    image: "/images/categories/gems.jpg",
    label: "Hidden Gems",
    quests: [
      {
        id: "gem-1",
        title: "Secret Rooftop Café",
        description: "Find and relax at a hidden spot.",
        image: "/images/gem1.jpg",
      },
      {
        id: "gem-2",
        title: "Whispering Alley",
        description: "Explore the quietest alley in town.",
        image: "/images/gem2.jpg",
      },
      {
        id: "gem-3",
        title: "Bookstore Puzzle Quest",
        description: "Solve a riddle hidden in bookshelves.",
        image: "/images/gem3.jpg",
      },
      {
        id: "gem-4",
        title: "Art Behind the Wall",
        description: "Find a street art piece few know about.",
        image: "/images/gem4.jpg",
      },
    ],
  },
];
