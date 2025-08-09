import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import { getCurrentUser, initializeAuth } from "./features/authSlice";
import AOS from "aos";
import "aos/dist/aos.css";

function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, userData } = useSelector((state) => state.auth);
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Initialize auth state from localStorage
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    // If user is authenticated but we don't have user data, fetch it
    if (isAuthenticated && !userData) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated, userData]);

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <div className="scroll-smooth overflow-x-hidden">
        <main>
          <Outlet />
        </main>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );

}
export default Layout;
