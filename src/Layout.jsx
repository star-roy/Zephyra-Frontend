import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
