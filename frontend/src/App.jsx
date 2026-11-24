import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import { LenisContext } from "./components/common/SmoothScroll";
import HomePage from "./pages/HomePage";
import MembershipPage from "./pages/MembershipPage";
import ShatayushWorldPage from "./pages/ShatayushWorldPage";
import V2App from "./v2/V2App";

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

function AppContent({ lenisRef }) {
  const location = useLocation();
  const isV2 = location.pathname.toLowerCase().startsWith("/v2");

  if (isV2) {
    return (
      <Routes>
        <Route path="/v2/*" element={<V2App />} />
      </Routes>
    );
  }

  return (
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
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/shatayushWorld" element={<ShatayushWorldPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

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

    let cancelled = false;
    lenisRef.current = lenis;
    Promise.resolve().then(() => {
      if (!cancelled) setLenisInstance(lenis);
    });

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
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
      lenisRef.current = null;
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      <Router>
        <AppContent lenisRef={lenisRef} />
      </Router>
    </LenisContext.Provider>
  );
}

export default App;
