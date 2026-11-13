import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/HorizentalLogo.webp";

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navContainerRef = useRef(null);
  const underlineRef = useRef(null);
  const linkRefs = useRef({});
  const activeTargetRef = useRef(null);
  const currentTransformRef = useRef({ x: 0, scale: 0, initialized: false });
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = useCallback(
    (path) => {
      const currentPath = location.pathname.toLowerCase();
      const targetPath = path.toLowerCase();

      if (targetPath === "/") {
        return currentPath === "/";
      }

      return (
        currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
      );
    },
    [location.pathname]
  );

  const moveUnderlineToLink = useCallback((targetPath, immediate = false) => {
    const containerEl = navContainerRef.current;
    const lineEl = underlineRef.current;
    const activeEl = targetPath ? linkRefs.current[targetPath] : null;

    if (!containerEl || !lineEl || !activeEl) return;

    const containerWidth = containerEl.offsetWidth || 1;
    const nextX = activeEl.offsetLeft;
    const nextScale = activeEl.offsetWidth / containerWidth;

    const prev = currentTransformRef.current;
    if (
      !immediate &&
      prev.initialized &&
      activeTargetRef.current === targetPath &&
      Math.abs(prev.x - nextX) < 0.5 &&
      Math.abs(prev.scale - nextScale) < 0.001
    ) {
      return;
    }

    let startX = prev.x;
    let startScale = prev.scale;

    if (prev.initialized && !immediate) {
      const containerRect = containerEl.getBoundingClientRect();
      const lineRect = lineEl.getBoundingClientRect();
      if (lineRect.width > 0 && containerRect.width > 0) {
        startX = lineRect.left - containerRect.left;
        startScale = lineRect.width / containerRect.width;
      }
    }

    activeTargetRef.current = targetPath;
    currentTransformRef.current = {
      x: nextX,
      scale: nextScale,
      initialized: true,
    };

    const endTransform = `translate3d(${nextX}px, 0, 0) scaleX(${nextScale})`;

    lineEl.getAnimations().forEach((anim) => anim.cancel());

    if (immediate || !prev.initialized) {
      lineEl.animate(
        [{ transform: endTransform, opacity: 1 }, { transform: endTransform, opacity: 1 }],
        { duration: 0, fill: "forwards" }
      );
      return;
    }

    const startTransform = `translate3d(${startX}px, 0, 0) scaleX(${startScale})`;

    lineEl.animate(
      [
        { transform: startTransform, opacity: 1 },
        { transform: endTransform, opacity: 1 },
      ],
      {
        duration: 420,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );
  }, []);

  useEffect(() => {
    const matchedLink = navLinks.find((link) => isLinkActive(link.path));
    if (matchedLink) {
      moveUnderlineToLink(
        matchedLink.path,
        !currentTransformRef.current.initialized
      );
    }
  }, [isLinkActive, moveUnderlineToLink]);

  useEffect(() => {
    const handleResize = () => {
      const matchedLink = navLinks.find((link) => isLinkActive(link.path));
      if (matchedLink) {
        moveUnderlineToLink(matchedLink.path, true);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isLinkActive, moveUnderlineToLink]);

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
            <div
              ref={navContainerRef}
              className="hidden lg:flex items-center gap-8 pr-8 relative"
            >
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    ref={(el) => {
                      if (el) linkRefs.current[link.path] = el;
                    }}
                    onClick={() => moveUnderlineToLink(link.path, false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative py-1 font-sans text-[13px] font-semibold tracking-[0.15em] whitespace-nowrap transition-colors duration-300 ${
                      isActive
                        ? "text-emerald-950"
                        : "text-emerald-950/65 hover:text-emerald-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <span
                ref={underlineRef}
                className="pointer-events-none absolute -bottom-1 left-0 w-full h-[2px] bg-emerald-800 origin-left will-change-transform opacity-0"
              />
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
            <div className="px-6 pt-12 pb-6 space-y-8 flex flex-col items-center">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`relative inline-block py-2 font-sans text-lg tracking-[0.2em] transition-colors ${
                      isActive
                        ? "font-bold text-emerald-950"
                        : "font-semibold text-emerald-950/75 hover:text-emerald-700"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="mobile-navbar-active-underline"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-800 rounded-full"
                      />
                    )}
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
