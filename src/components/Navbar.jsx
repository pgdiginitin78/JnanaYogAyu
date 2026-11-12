import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/HorizentalLogo.webp";

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
    { name: "Shatayush World", path: "/shatayushWorld" },
    { name: "Global AyurX", path: "/globalayurx" },
    { name: "EcoSphere", path: "/ecosphere" },
    { name: "Muktikhela", path: "/muktikhela" },
    { name: "Membership", path: "/membership" },
    { name: "Insight", path: "/insight" },
    { name: "Contact", path: "/contact" },
  ];

  const isLinkActive = (path) => {
    const currentPath = location.pathname.toLowerCase();
    const targetPath = path.toLowerCase();

    if (targetPath === "/muktikhela") {
      return currentPath === "/muktikhela" || location.hash === "#muktikhela";
    }

    if (targetPath === "/") {
      return currentPath === "/" && location.hash !== "#muktikhela";
    }

    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b w-full border-white/50 bg-white/50 backdrop-blur-xl shadow-sm ${
        scrolled ? "py-4 bg-white/60 shadow-md backdrop-blur-2xl" : "py-3"
      }`}
    >
      <div className=" w-full mx-auto px-6 lg:px-12 2xl:px-14">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex-shrink-0 flex items-center z-50">
            <img
              src={logo}
              alt="JnanaYogAyu"
              className={`transition-all duration-500 object-contain ${
                scrolled ? "h-20 lg:h-12 2xl:h-20" : "h-16 lg:h-12 2xl:h-16"
              }`}
            />
          </Link>
          <div className="flex items-center justify-end">
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 2xl:space-x-4 pr-6">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-3.5 py-2 rounded-full font-sans text-[13px] tracking-[0.14em] whitespace-nowrap transition-all duration-300 flex items-center gap-2 group ${
                      isActive
                        ? "font-bold text-[#0F3D29]"
                        : "font-semibold text-emerald-950/70 hover:text-emerald-950 hover:bg-emerald-950/5"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute inset-0 rounded-full bg-[#0F3D29]/10 border border-[#C8933F]/55 shadow-sm -z-10"
                      />
                    )}

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8933F] shadow-sm shrink-0" />
                    )}

                    <span>{link.name}</span>

                    {isActive ? (
                      <motion.span
                        layoutId="navbar-active-underline"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute -bottom-1 left-3 right-3 h-[2.5px] bg-gradient-to-r from-[#0F3D29] via-[#C8933F] to-[#0F3D29] rounded-full"
                      />
                    ) : (
                      <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-emerald-700/70 transition-all duration-300 group-hover:w-2/3 group-hover:left-[16.666%] opacity-0 group-hover:opacity-100 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center space-x-6 pl-8 border-l border-emerald-900/10">
              <button
                className="text-emerald-950 hover:text-emerald-700 transition-colors relative"
                aria-label="Wishlist"
              >
                <FiHeart className="h-[18px] w-[18px]" />
              </button>
              <button
                className="text-emerald-950 hover:text-emerald-700 transition-colors relative"
                aria-label="Cart"
              >
                <FiShoppingCart className="h-[18px] w-[18px]" />
              </button>
              <Link
                to="/join"
                className="px-6 py-2.5 bg-emerald-900 text-white font-sans text-[12px] font-bold tracking-[0.2em] rounded hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg text-center"
              >
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
            <div className="px-6 pt-8 pb-6 space-y-3 flex flex-col items-center">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`w-full max-w-xs py-3 px-5 rounded-xl font-sans text-base tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2.5 ${
                      isActive
                        ? "bg-[#0F3D29] text-[#FAF6EE] font-bold border border-[#C8933F]/60 shadow-md"
                        : "text-emerald-950/75 font-semibold hover:text-emerald-950 hover:bg-emerald-950/5"
                    }`}
                  >
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#C8933F] shrink-0" />
                    )}
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              <div className="flex items-center space-x-8 pt-4 border-t border-emerald-900/10 w-full justify-center">
                <button
                  className="text-emerald-950 hover:text-emerald-700 transition-colors p-2"
                  aria-label="Wishlist"
                >
                  <FiHeart className="h-6 w-6" />
                </button>
                <button
                  className="text-emerald-950 hover:text-emerald-700 transition-colors p-2"
                  aria-label="Cart"
                >
                  <FiShoppingCart className="h-6 w-6" />
                </button>
              </div>

              <Link
                to="/join"
                onClick={() => setIsOpen(false)}
                className="block w-full max-w-[200px] text-center py-3 bg-emerald-900 text-white font-sans text-[13px] font-bold tracking-[0.2em] rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-md"
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
