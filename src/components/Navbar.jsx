import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/JnanaYogAyuLogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Community", path: "/community" },
    { name: "JYA Ecosystem", path: "/jyaEcosystem" },
    { name: "Services", path: "/services" },
    { name: "Knowledge", path: "/knowledge" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b border-white/50 bg-white/50 backdrop-blur-xl shadow-sm ${
        scrolled ? "py-4 bg-white/60 shadow-md backdrop-blur-2xl" : "py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between w-full">
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center z-50">
            <img 
              src={logo} 
              alt="JnanaYogAyu" 
              className={`transition-all duration-500 object-contain ${
                scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
              }`}
            />
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center justify-end">
            <div className="hidden lg:flex items-center space-x-8 pr-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[13px] font-semibold text-emerald-950 tracking-[0.15em] hover:text-emerald-700 transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-emerald-700 transition-all duration-300 group-hover:w-full group-hover:left-0 opacity-0 group-hover:opacity-100 rounded-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-6 pl-8 border-l border-emerald-900/10">
            <button className="text-emerald-950 hover:text-emerald-700 transition-colors relative" aria-label="Wishlist">
              <FiHeart className="h-[18px] w-[18px]" />
            </button>
            <button className="text-emerald-950 hover:text-emerald-700 transition-colors relative" aria-label="Cart">
              <FiShoppingCart className="h-[18px] w-[18px]" />
            </button>
            <Link to="/join" className="px-6 py-2.5 bg-emerald-900 text-white text-[12px] font-bold tracking-[0.2em] rounded hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg text-center">
              JOIN JYA
            </Link>
          </div>

            <div className="flex lg:hidden justify-end ml-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-emerald-900 hover:text-emerald-700 focus:outline-none transition-colors"
              >
                {isOpen ? (
                  <FiX className="h-8 w-8" />
                ) : (
                  <FiMenu className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-0 right-0 h-screen bg-white/90 backdrop-blur-2xl border-t border-white/40 shadow-2xl z-50"
          >
            <div className="px-6 pt-12 pb-6 space-y-8 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2 text-lg font-semibold tracking-[0.2em] text-emerald-950 hover:text-emerald-700 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center space-x-8 pt-4 border-t border-emerald-900/10 w-full justify-center">
                <button className="text-emerald-950 hover:text-emerald-700 transition-colors p-2" aria-label="Wishlist">
                  <FiHeart className="h-6 w-6" />
                </button>
                <button className="text-emerald-950 hover:text-emerald-700 transition-colors p-2" aria-label="Cart">
                  <FiShoppingCart className="h-6 w-6" />
                </button>
              </div>
              
              <Link
                to="/join"
                onClick={() => setIsOpen(false)}
                className="block w-full max-w-[200px] text-center py-3 bg-emerald-900 text-white text-[13px] font-bold tracking-[0.2em] rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-md"
              >
                JOIN JYA
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
