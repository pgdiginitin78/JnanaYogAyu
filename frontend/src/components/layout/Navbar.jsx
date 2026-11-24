import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logo from "../../assets/images/brand/horizontal-logo.webp";
import { useLenis } from "../common/SmoothScroll";

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
  const [openRouteKey, setOpenRouteKey] = useState(null);
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 20 : false
  );
  const navContainerRef = useRef(null);
  const underlineRef = useRef(null);
  const linkRefs = useRef({});
  const activeTargetRef = useRef(null);
  const currentTransformRef = useRef({ x: 0, scale: 0, initialized: false });
  const lastContainerWidthRef = useRef(0);
  const location = useLocation();
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  const currentRouteKey = `${location.pathname}${location.hash}`;
  const isOpen = openRouteKey === currentRouteKey;

  const closeMenu = useCallback(() => {
    setOpenRouteKey(null);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpenRouteKey((prev) =>
      prev === currentRouteKey ? null : currentRouteKey
    );
  }, [currentRouteKey]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;

    html.classList.add("overflow-hidden");
    body.classList.add("overflow-hidden");
    lenis?.stop();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenRouteKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const handleBreakpointChange = (event) => {
      if (event.matches) {
        setOpenRouteKey(null);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);
    return () => mediaQuery.removeEventListener("change", handleBreakpointChange);
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

  const hideUnderline = useCallback(() => {
    const lineEl = underlineRef.current;
    activeTargetRef.current = null;
    currentTransformRef.current = { x: 0, scale: 0, initialized: false };
    if (!lineEl) return;

    lineEl.getAnimations().forEach((anim) => anim.cancel());
    lineEl.animate([{ opacity: 0 }, { opacity: 0 }], {
      duration: 0,
      fill: "forwards",
    });
  }, []);

  const moveUnderlineToLink = useCallback(
    (targetPath, immediate = false) => {
      const containerEl = navContainerRef.current;
      const lineEl = underlineRef.current;
      const activeEl = targetPath ? linkRefs.current[targetPath] : null;

      if (
        !containerEl ||
        !lineEl ||
        !activeEl ||
        containerEl.offsetWidth === 0 ||
        activeEl.offsetWidth === 0
      ) {
        return;
      }

      const containerWidth = containerEl.offsetWidth;
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

      if (immediate || !prev.initialized || shouldReduceMotion) {
        lineEl.animate(
          [
            { transform: endTransform, opacity: 1 },
            { transform: endTransform, opacity: 1 },
          ],
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
    },
    [shouldReduceMotion]
  );

  useEffect(() => {
    const matchedLink = navLinks.find((link) => isLinkActive(link.path));
    if (matchedLink) {
      moveUnderlineToLink(
        matchedLink.path,
        !currentTransformRef.current.initialized
      );
    } else {
      hideUnderline();
    }
  }, [isLinkActive, moveUnderlineToLink, hideUnderline]);

  useEffect(() => {
    const containerEl = navContainerRef.current;

    const syncUnderline = () => {
      const matchedLink = navLinks.find((link) => isLinkActive(link.path));
      if (matchedLink) {
        moveUnderlineToLink(matchedLink.path, true);
      } else {
        hideUnderline();
      }
    };

    let resizeObserver;
    if (containerEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        const currentWidth = containerEl.offsetWidth;
        if (Math.abs(currentWidth - lastContainerWidthRef.current) > 0.5) {
          lastContainerWidthRef.current = currentWidth;
          if (currentWidth > 0) {
            syncUnderline();
          } else {
            currentTransformRef.current = {
              x: 0,
              scale: 0,
              initialized: false,
            };
          }
        }
      });
      resizeObserver.observe(containerEl);
    }

    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) syncUnderline();
      });
    }

    window.addEventListener("resize", syncUnderline, { passive: true });
    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      window.removeEventListener("resize", syncUnderline);
    };
  }, [isLinkActive, moveUnderlineToLink, hideUnderline]);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-0 z-50 flex flex-col pointer-events-none"
    >
      <div
        className={`relative z-10 pointer-events-auto shrink-0 w-full border-b transition-all duration-500 ease-out ${
          isOpen
            ? "py-3 border-emerald-900/10 bg-white/95 backdrop-blur-2xl shadow-sm"
            : scrolled
              ? "py-2.5 border-white/50 bg-white/80 backdrop-blur-2xl shadow-md"
              : "py-3 border-white/50 bg-white/55 backdrop-blur-xl shadow-sm"
        }`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-8 2xl:px-14">
          <div className="flex items-center justify-between gap-3 w-full">
            <Link
              to="/"
              onClick={closeMenu}
              className="shrink-0 flex items-center"
            >
              <img
                src={logo}
                alt="JnanaYogAyu"
                className={`w-auto transition-all duration-500 object-contain ${
                  scrolled
                    ? "h-9 sm:h-11 xl:h-11 2xl:h-12"
                    : "h-10 sm:h-12 xl:h-12 2xl:h-14"
                }`}
              />
            </Link>

            <div className="flex items-center justify-end min-w-0">
              <div
                ref={navContainerRef}
                className="hidden xl:flex items-center xl:gap-5 2xl:gap-7 xl:pr-5 2xl:pr-8 relative"
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
                      className={`relative py-1 font-sans xl:text-[12px] 2xl:text-[13px] font-semibold xl:tracking-[0.08em] 2xl:tracking-[0.14em] whitespace-nowrap transition-colors duration-300 ${
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
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-1 left-0 w-full h-[2px] bg-emerald-800 origin-left will-change-transform opacity-0"
                />
              </div>

              <div className="hidden sm:flex items-center gap-4 2xl:gap-6 xl:pl-5 2xl:pl-8 xl:border-l xl:border-emerald-900/10">
                <button
                  type="button"
                  className="shrink-0 text-emerald-950 hover:text-emerald-700 transition-colors p-1"
                  aria-label="Wishlist"
                >
                  <FiHeart className="h-[18px] w-[18px]" />
                </button>
                <button
                  type="button"
                  className="shrink-0 text-emerald-950 hover:text-emerald-700 transition-colors p-1"
                  aria-label="Cart"
                >
                  <FiShoppingCart className="h-[18px] w-[18px]" />
                </button>
                <Link
                  to="/join"
                  onClick={closeMenu}
                  className="shrink-0 whitespace-nowrap px-4 py-2 xl:px-5 2xl:px-6 2xl:py-2.5 bg-emerald-900 text-white font-sans text-[11px] 2xl:text-[12px] font-bold tracking-[0.14em] 2xl:tracking-[0.2em] rounded hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg text-center"
                >
                  JOIN JYA
                </Link>
              </div>

              <div className="flex xl:hidden items-center justify-end sm:ml-4 sm:pl-4 sm:border-l sm:border-emerald-900/10">
                <button
                  type="button"
                  onClick={toggleMenu}
                  aria-label={
                    isOpen ? "Close navigation menu" : "Open navigation menu"
                  }
                  aria-expanded={isOpen}
                  aria-controls="mobile-navigation-drawer"
                  className="shrink-0 inline-flex items-center justify-center p-2 rounded-md text-emerald-900 hover:text-emerald-700 hover:bg-emerald-950/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 transition-colors"
                >
                  {isOpen ? (
                    <FiX className="h-7 w-7 sm:h-8 sm:w-8" />
                  ) : (
                    <FiMenu className="h-7 w-7 sm:h-8 sm:w-8" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            data-lenis-prevent
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-0 xl:hidden pointer-events-auto flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white/95 backdrop-blur-2xl border-t border-emerald-900/10 shadow-2xl"
          >
            <div className="min-h-full flex flex-col px-6 py-6 sm:py-10">
              <div className="my-auto w-full max-w-2xl mx-auto flex flex-col items-center">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-x-8 sm:gap-y-3 place-items-center">
                  {navLinks.map((link) => {
                    const isActive = isLinkActive(link.path);
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        aria-current={isActive ? "page" : undefined}
                        onClick={closeMenu}
                        className={`relative inline-block py-2 sm:py-2.5 px-3 font-sans text-base sm:text-lg tracking-[0.16em] md:tracking-[0.2em] text-center whitespace-nowrap transition-colors ${
                          isActive
                            ? "font-bold text-emerald-950"
                            : "font-semibold text-emerald-950/75 hover:text-emerald-700"
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <motion.span
                            layoutId="mobile-navbar-active-underline"
                            transition={
                              shouldReduceMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                  }
                            }
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-800 rounded-full"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>

                <div className="sm:hidden flex flex-col items-center w-full max-w-xs mt-5 pt-5 border-t border-emerald-900/10 gap-5">
                  <div className="flex items-center justify-center gap-8">
                    <button
                      type="button"
                      className="text-emerald-950 hover:text-emerald-700 transition-colors p-2"
                      aria-label="Wishlist"
                    >
                      <FiHeart className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      className="text-emerald-950 hover:text-emerald-700 transition-colors p-2"
                      aria-label="Cart"
                    >
                      <FiShoppingCart className="h-6 w-6" />
                    </button>
                  </div>

                  <Link
                    to="/join"
                    onClick={closeMenu}
                    className="block w-full max-w-[220px] text-center py-3 bg-emerald-900 text-white font-sans text-[13px] font-bold tracking-[0.2em] rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-md whitespace-nowrap"
                  >
                    JOIN JYA
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
