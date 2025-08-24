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
    name: "Adventure",
    backendCategory: "Adventure",
    icon: FaTree,
    image: "/assets/adventure.webp",
    label: "Great Outdoors",
  },
  {
    name: "Food",
    backendCategory: "Food",
    icon: FaUtensils,
    image: "/assets/food.webp",
    label: "Great Food",
  },
  {
    name: "Art",
    backendCategory: "Art", 
    icon: FaPaintBrush,
    image: "/assets/art.webp",
    label: "Inspiring Art",
  },
  {
    name: "History",
    backendCategory: "History",
    icon: FaLandmark,
    image: "/assets/history.webp",
    label: "Timeless History",
  },
  {
    name: "Culture",
    backendCategory: "Culture",
    icon: FaGlobeAsia,
    image: "/assets/culture.webp",
    label: "Rich Culture",
  },
  {
    name: "Hidden Gems",
    backendCategory: "HiddenGems",
    icon: FaBinoculars,
    image: "/assets/hidden-gems.webp",
    label: "Hidden Gems",
  },
];
