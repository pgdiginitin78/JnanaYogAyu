import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import JYAMembershipPage from "./components/membership/JYAMembershipPage";
import { LenisContext } from "./components/membership/SmoothScroll";
import ShatayushWorld from "./components/shatayushWorld/ShatayushWorld";


function ScrollToTop({ lenisRef }) {
  const { pathname, search, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const seasonParam = queryParams.get("season");
    const planParam = queryParams.get("plan");

    const targetId =
      hash?.replace("#", "") ||
      (seasonParam ? `season-${seasonParam}` : "") ||
      (planParam ? `membership-${planParam}` : "");

    const isRouteChanged = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    // Always start at top immediately when switching pages so the user sees the page redirect
    // and then smoothly scrolls down to the focused section/card.
    if (isRouteChanged || !targetId) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, {
          immediate: true,
          force: true,
        });
      }
      window.scrollTo(0, 0);
    }

    if (!targetId) return undefined;

    const scrollToTarget = () => {
      const el =
        document.getElementById(targetId) ||
        (seasonParam ? document.getElementById("seasonal-academy") : null) ||
        (planParam ? document.getElementById("membership-plans") : null);

      if (!el) return false;

      if (lenisRef.current) {
        lenisRef.current.resize();
        lenisRef.current.scrollTo(el, {
          offset: -96,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          immediate: false,
          force: true,
        });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return true;
    };

    const delay = isRouteChanged ? 380 : 120;
    const timer = setTimeout(() => {
      if (!scrollToTarget()) {
        setTimeout(scrollToTarget, 300);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [pathname, search, hash, lenisRef]);

  return null;
}

// Dummy pages to demonstrate routing
const About = () => (
  <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">
    About Page
  </div>
);
const Community = () => (
  <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">
    Community Page
  </div>
);
const Services = () => (
  <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">
    Services Page
  </div>
);
const Knowledge = () => (
  <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">
    Knowledge Page
  </div>
);
const Contact = () => (
  <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">
    Contact Page
  </div>
);

function App() {
  const lenisRef = useRef(null);
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.scrollTo(0, {
      immediate: true,
      force: true,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenisRef.current = null;
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      <Router>
        <div className="min-h-screen bg-white relative overflow-x-hidden">
          <ScrollToTop lenisRef={lenisRef} />

          <Navbar />

          <div className="relative z-10 pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/community" element={<Community />} />
              <Route path="/services" element={<Services />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/membership" element={<JYAMembershipPage />} />
              <Route path="/shatayushWorld" element={<ShatayushWorld />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </LenisContext.Provider>
  );
}

export default App;
