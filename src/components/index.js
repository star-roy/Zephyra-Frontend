// cards
import ChatSupportBox from "./Cards/ChatSupportBox.jsx";
import CompletedQuestRow from "./Cards/CompletedQuestRow.jsx";
import EmptyOngoingQuests from "./Cards/EmptyOngoingQuests.jsx";
import EventCard from "./Cards/EventCard.jsx";
import InlineQuestScroller from "./Cards/InlineQuestScroller.jsx";
import LogoutModal from "./Cards/LogoutModal.jsx";
import OngoingQuestCard from "./Cards/OngoingQuestCard.jsx";
import QuestCard from "./Cards/QuestCard.jsx";
import QuestLimitModal from "./Modals/QuestLimitModal.jsx";

// Navigation bar
import Navbar from "./Navbar/Navbar.jsx";
import NavbarLoggedIn from "./Navbar/NavbarLoggedIn.jsx";
import NavbarLoggedOut from "./Navbar/NavbarLoggedOut.jsx";
import XPProgressBar from "./Navbar/XPProgressBar.jsx";

// Admin Components
import AdminNavbar from "./AdminNavbar/AdminNavbar.jsx";
import AdminLayout from "./AdminLayout/AdminLayout.jsx";

// Skeleton Components
import Skeleton, { SkeletonCard, SkeletonStatCard, SkeletonProfile } from "./Skeleton/Skeleton.jsx";

// Home - logged in users
import ExplorerHubSection from "./Home/HomeLoggedIn/ExplorerHubSection.jsx";
import HeroLoggedIn from "./Home/HomeLoggedIn/HeroLoggedIn.jsx";
import OngoingQuestsSection from "./Home/HomeLoggedIn/OngoingQuestsSection.jsx";
import UpcomingEventsSection from "./Home/HomeLoggedIn/UpcomingEventsSection.jsx";
import YourNextAdventureSection from "./Home/HomeLoggedIn/YourNextAdventureSection.jsx";

// Home - logged out users
import ActionSection from "./Home/HomeLoggedOut/ActionSection.jsx";
import FeatureSection from "./Home/HomeLoggedOut/FeatureSection.jsx";
import HomeHeroSection from "./Home/HomeLoggedOut/HomeHeroSection.jsx";
import JoinCTA from "./Home/HomeLoggedOut/JoinCTA.jsx";
import TestimonialSection from "./Home/HomeLoggedOut/TestimonialSection.jsx";

//Explore - logged in users
import BrowseCategories from "./Explore/ExploreLoggedIn/BrowseCategories.jsx"
import FeaturedQuest from "./Explore/ExploreLoggedIn/FeaturedQuest.jsx";
import JustForYou from "./Explore/ExploreLoggedIn/JustForYou.jsx";
import PopularQuests from "./Explore/ExploreLoggedIn/PopularQuests.jsx";
import UserExploreHero from "./Explore/ExploreLoggedIn/UserExploreHero.jsx";

//Explore - logged out users
import CommunityHighlights from "./Explore/ExploreLoggedOut/CommunityHighlights.jsx";
import ExploreAction from "./Explore/ExploreLoggedOut/ExploreAction.jsx";
import ExploreHero from "./Explore/ExploreLoggedOut/ExploreHero.jsx";
import JoinCommunity from "./Explore/ExploreLoggedOut/JoinCommunity.jsx";

// Compass - logged in users
import CompassHero from "./Compass/CompassLoggedIn/CompassHero.jsx";
import KnowledgeSupportSection from "./Compass/CompassLoggedIn/KnowledgeSupportSection.jsx";
import PersonalizedGuidance from "./Compass/CompassLoggedIn/PersonalizedGuidance.jsx";

//compass - logged out users
import AccordionHelp from "./Compass/CompassLoggedOut/AccordionHelp.jsx";
import ContactSupportBox from "./Compass/CompassLoggedOut/ContactSupportBox.jsx";
import CTASection from "./Compass/CompassLoggedOut/CTASection.jsx";
import HeroSection from "./Compass/CompassLoggedOut/HeroSection.jsx";
import PopularTopics from "./Compass/CompassLoggedOut/PopularTopics.jsx";

// Account - logged in users
import AccountSection from "./SettingsPage/AccountSection.jsx";
import AppPreferencesSection from "./SettingsPage/AppPreferencesSection.jsx";
import PrivacySection from "./SettingsPage/PrivacySection.jsx";
import SecuritySection from "./SettingsPage/SecuritySection.jsx";
import SettingsSidebar from "./SettingsPage/SettingsSidebar.jsx";

// Scroll to top
import ScrollToTop from "./ScrollToTop.jsx"

// Footer
import Footer from "./Footer/Footer.jsx";

//all exports for cards and sections
export {
    // cards 
    ChatSupportBox,
    CompletedQuestRow,
    EmptyOngoingQuests,
    EventCard,
    InlineQuestScroller,
    LogoutModal,
    OngoingQuestCard,
    QuestCard,
    QuestLimitModal,

    // Navigation bar
    Navbar,
    NavbarLoggedIn,
    NavbarLoggedOut,
    XPProgressBar,

    // Home - logged in users
    ExplorerHubSection,
    HeroLoggedIn,
    OngoingQuestsSection,
    UpcomingEventsSection,
    YourNextAdventureSection,

    // Home - logged out users
    ActionSection,
    FeatureSection,
    HomeHeroSection,
    JoinCTA,
    TestimonialSection,

    // Explore - logged in users
    BrowseCategories,
    FeaturedQuest,
    JustForYou,
    PopularQuests,
    UserExploreHero,

    // Explore - logged out users
    CommunityHighlights,
    ExploreAction,
    ExploreHero,
    JoinCommunity,

    // compass - logged in users
    CompassHero,
    KnowledgeSupportSection,
    PersonalizedGuidance,
    
    // compass - logged out users
    AccordionHelp,
    ContactSupportBox,
    CTASection,
    HeroSection,
    PopularTopics,

    // Account - logged in users
    AccountSection,
    AppPreferencesSection,
    PrivacySection,
    SecuritySection,
    SettingsSidebar,

    // Admin Components
    AdminNavbar,
    AdminLayout,

    // Skeleton Components
    Skeleton,
    SkeletonCard,
    SkeletonStatCard,
    SkeletonProfile,

    // Footer
    Footer,

    //ScrollToTop
    ScrollToTop
};