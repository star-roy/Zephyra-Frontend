import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Layout from "./Layout.jsx";

import PrivateRoute from "./auth/PrivateRoute.jsx";
import AdminRoute from "./auth/AdminRoute.jsx";

import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { setStore } from "./utils/axiosConfig.js";
import { GoogleMapsProvider } from "./providers/GoogleMapsProvider.jsx";

// Initialize axios interceptors with store
setStore(store);

// Route components

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
import { AboutPage as About } from "./pages/index.js";
import { Settings } from "./pages/index.js";

import { QuestInProgressPage } from "./pages/index.js";
import { CreateQuestPage } from "./pages/index.js";
import { QuestOverviewPage } from "./pages/index.js";
import { QuestProofUpload } from "./pages/index.js";

import { ChatSupportBox } from "./components/index.js";
import { ReportBug } from "./pages/index.js";
import { ProvideFeedback } from "./pages/index.js";

import { BadgeCollectionPage } from "./pages/index.js";
import { BadgesGallery } from "./pages/index.js";

import { UserProfilePage } from "./pages/index.js";
import { VerifyEmail } from "./pages/index.js";
import { ForgotPasswordPage } from "./pages/index.js";
import { ResetPasswordPage } from "./pages/index.js";
import { ChangePasswordPage } from "./pages/index.js";

// Admin Dashboard Components
import { AdminDashboard, SuperAdminDashboard, UserManagement, QuestModeration, AdminActionLogs, TaskProofVerification } from "./pages/index.js";
import { AdminLayout } from "./components/index.js";

import { FeatureUnderDevelopment } from "./pages/index.js";
import { NotFound } from "./pages/index.js";

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

      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/change-password" element={<PrivateRoute><ChangePasswordPage /></PrivateRoute>} />

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
            <Contact />
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
            <Privacy />
        }
      />
      <Route
        path="terms"
        element={
            <Terms />
        }
      />
      <Route
        path="settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="report-bug"
        element={
            <ReportBug />
        }
      />
      <Route
        path="my-quest"
        element={
          <PrivateRoute>
            <MyQuest />
          </PrivateRoute>
        }
      />
      <Route
        path="quest-overview/:questId"
        element={
          <PrivateRoute>
            <QuestOverviewPage />
          </PrivateRoute>
        }
      />
      <Route
        path="quest-in-progress/:questId"
        element={
          <PrivateRoute>
            <QuestInProgressPage />
          </PrivateRoute>
        }
      />
      <Route
        path="create-quest"
        element={
          <PrivateRoute>
            <CreateQuestPage />
          </PrivateRoute>
        }
      />
      <Route
        path="badge-collection"
        element={
          <PrivateRoute>
            <BadgeCollectionPage />
          </PrivateRoute>
        }
      />
      <Route
        path="badges-gallery"
        element={
          <PrivateRoute>
            <BadgesGallery />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="quest-proof-upload/:questId"
        element={
          <PrivateRoute>
            <QuestProofUpload />
          </PrivateRoute>
        }
      />
      <Route
        path="chat-support"
        element={
          <PrivateRoute>
            <ChatSupportBox />
          </PrivateRoute>
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
          <PrivateRoute>
            <ProvideFeedback />
          </PrivateRoute>
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
      <Route
        path="admin/proofs"
        element={
          <AdminRoute>
            <AdminLayout>
              <TaskProofVerification />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="admin/action-logs"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminActionLogs />
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

      <Route path="*" element={<NotFound />} />
    </Route>
    
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleMapsProvider>
        <RouterProvider router={router} />
      </GoogleMapsProvider>
    </Provider>
  </React.StrictMode>
);

