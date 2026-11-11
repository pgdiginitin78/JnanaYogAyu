import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import JYAMembershipPage from "./components/membership/JYAMembershipPage";

// Dummy pages to demonstrate routing
const About = () => <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">About Page</div>;
const Community = () => <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">Community Page</div>;
const Services = () => <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">Services Page</div>;
const Knowledge = () => <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">Knowledge Page</div>;
const Contact = () => <div className="min-h-screen flex items-center justify-center font-serif text-4xl font-light text-gray-700">Contact Page</div>;

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white relative overflow-x-hidden">

        
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
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
