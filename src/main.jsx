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


import { AuthProvider } from "./auth/AuthContext.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import AdminRoute from "./auth/AdminRoute.jsx";

// Route components
import { VerifyEmail } from "./pages/index.js";
import { ForgotPasswordPage } from "./pages/index.js";
import { ResetPasswordPage } from "./pages/index.js";

import { AboutPage as About } from "./pages/index.js";
import { Home } from "./pages/index.js";
import { Explore } from "./pages/index.js";
import { Compass } from "./pages/index.js";
import { MyQuestsPage as MyQuest } from "./pages/index.js";
import { LoginPage as Login } from "./pages/index.js";
import { SignUp } from "./pages/index.js";
import { Contact } from "./pages/index.js";
import { AccessDenied } from "./pages/index.js"; 
import { Help } from "./pages/index.js";
import { Privacy } from "./pages/index.js";
import { Terms } from "./pages/index.js";
import { Settings } from "./pages/index.js";

import { QuestInProgressPage } from "./pages/index.js";
import { MyQuestsPage } from "./pages/index.js";
import { CreateQuestPage } from "./pages/index.js";
import { QuestOverviewPage } from "./pages/index.js";
import { QuestProofUpload } from "./pages/index.js";

import { ChatSupportBox } from "./components/index.js";
import { ReportBug } from "./pages/index.js";
import { ProvideFeedback } from "./pages/index.js";

import { BadgeCollectionPage } from "./pages/index.js";
import { BadgesGallery } from "./pages/index.js";

import { UserProfilePage } from "./pages/index.js";

// Admin Dashboard Components
import { AdminDashboard, SuperAdminDashboard, UserManagement, QuestModeration } from "./pages/index.js";
import { AdminLayout } from "./components/index.js";

import { FeatureUnderDevelopment } from "./pages/index.js";
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
      <Route path="signup" element={<SignUp />} />
      <Route path="access-denied" element={<AccessDenied />} />

      <Route
        path="verify-email"
        element={
            <VerifyEmail />
        }
      />

      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Semi-Protected Pages (example logic, change as needed) */}
      <Route path="explore" element={<Explore />} />
      <Route
        path="compass"
        element={
            <Compass />
        }
      />

      {/* Fully Protected Routes */}
      <Route
        path="contact-us"
        element={
          <PrivateRoute>
            <Contact />
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
        path="badges-gallery"
        element={
            <BadgesGallery />
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

      {/* Admin Routes */}
      <Route
        path="admin/dashboard"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="admin/users"
        element={
          <AdminRoute>
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="admin/quests"
        element={
          <AdminRoute>
            <AdminLayout>
              <QuestModeration />
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* Super Admin Routes */}
      <Route
        path="admin/super-dashboard"
        element={
          <AdminRoute requireSuperAdmin={true}>
            <AdminLayout>
              <SuperAdminDashboard />
            </AdminLayout>
          </AdminRoute>
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
