// src/App.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return null; // We’re only using this for global effects like AOS
}

export default App;
