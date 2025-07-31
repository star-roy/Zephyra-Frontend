// src/Layout.jsx
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";

function Layout() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      
        <ScrollToTop />
        <Navbar />
        <div className="scroll-smooth overflow-x-hidden">
        <main>
          <Outlet />
        </main>
        </div>
        <Footer />
    </>
  );
}

export default Layout;
