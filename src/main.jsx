import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./Layout.jsx";

// Route components
import About from "./pages/About/About.jsx";
import Home from "./pages/Home/Home.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import Compass from "./pages/Compass/Compass.jsx";
import MyQuest from "./pages/MyQuest/MyQuest.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp/SignUp.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AccessDenied from "./pages/AccessDenied.jsx";
import Help from "./pages/Help.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Settings from "./pages/UserSetting/Settings.jsx";

import QuestInProgressPage from "./pages/Quest/QuestInProgressPage.jsx";
import MyQuestsPage from "./pages/MyQuest/MyQuest.jsx";
import CreateQuestPage from "./pages/MyQuest/CreateQuestPage.jsx";
import QuestOverviewPage from "./pages/Quest/QuestOverviewPage.jsx";
import QuestProofUpload from "./pages/Quest/QuestProofUpload.jsx";

import ChatSupportBox from "./components/Cards/ChatSupportBox.jsx";
import ReportBug from "./pages/ReportBug.jsx";
import ProvideFeedback from "./pages/ProvideFeedback.jsx";

import BadgeCollectionPage from "./pages/Badge/BadgeCollectionPage.jsx";

import UserProfilePage from "./pages/Profile/UserProfilePage.jsx";

import { AuthProvider } from "./auth/AuthContext.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";

import FeatureUnderDevelopment from "./pages/FeatureUnderDevelopment.jsx";
// 🔐 Dummy auth logic (replace with real one)
// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = true; // Or get from localStorage/context

//   if (!isLoggedIn) {
//     return <Navigate to="/access-denied" replace />;
//   }

//   return <>{children}</>;
// };

// 🚀 Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route path="" element={<Home />} />
      <Route path="about-us" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="access-denied" element={<AccessDenied />} />

      {/* Semi-Protected Pages (example logic, change as needed) */}
      <Route path="explore" element={<Explore />} />
      <Route
        path="compass"
        element={
          <PrivateRoute>
            <Compass />
          </PrivateRoute>
        }
      />

      {/* Fully Protected Routes */}
      <Route
        path="contact-us"
        element={
          <PrivateRoute>
            <ContactUs />
          </PrivateRoute>
        }
      />
      <Route
        path="help"
        element={
          <PrivateRoute>
            <Help />
          </PrivateRoute>
        }
      />
      <Route
        path="privacy"
        element={
          <PrivateRoute>
            <Privacy />
          </PrivateRoute>
        }
      />
      <Route
        path="terms"
        element={
          <PrivateRoute>
            <Terms />
          </PrivateRoute>
        }
      />
      <Route
        path="settings"
        element={
            <Settings />
        }
      />
      <Route
        path="report-bug"
        element={
            <ReportBug />
        }
      />
      <Route
        path="my-quest-new"
        element={
          <PrivateRoute>
            <MyQuest />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="quest/:questId"
        element={
          <PrivateRoute>
            <QuestOverview />
          </PrivateRoute>
        }
      /> */}
      <Route
        path="quest/:questId"
        element={
            <QuestOverviewPage />
        }
      />
      <Route
        path="quest-in-progress"
        element={
            <QuestInProgressPage />
        }
      />
      <Route
        path="my-quest"
        element={
            <MyQuestsPage />
        }
      />
      <Route
        path="create-quest"
        element={
            <CreateQuestPage />
        }
      />
      <Route
        path="badge-collection"
        element={
            <BadgeCollectionPage />
        }
      />
      <Route
        path="profile"
        element={
            <UserProfilePage />
        }
      />
      <Route
        path="quest-proof-upload"
        element={
            <QuestProofUpload />
        }
      />
      <Route
        path="chat-support"
        element={
            <ChatSupportBox />
        }
      />
      <Route
        path="feature-under-development"
        element={
          <PrivateRoute>
            <FeatureUnderDevelopment />
          </PrivateRoute>
        } 
      />
      <Route
        path="provide-feedback"
        element={
            <ProvideFeedback />
        }
      />
    </Route>
    
  )
);

// 🧷 Mount App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// createRoutesFromElements(
//   <Route path="/" element={<Layout />}>
//     <Route index element={<Home />} />
//     <Route path="about" element={<About />} />
//     <Route path="explore" element={<Explore />} />
//     <Route path="compass" element={<Compass />} />
//     <Route path="login" element={<Login />} />
//     <Route path="signup" element={<Signup />} />
//   </Route>
// )
