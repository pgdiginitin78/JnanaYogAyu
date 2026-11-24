import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiGrid,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logo from "../../assets/images/brand/horizontal-logo.webp";
import { V2_NAV_MENUS } from "../data/v2Data";
import { useV2Store } from "../context/v2Context";

function V2Navbar() {
  const [openRouteKey, setOpenRouteKey] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileExpandedId, setMobileExpandedId] = useState("services");
  const [profileRouteKey, setProfileRouteKey] = useState(null);
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 20 : false
  );

  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const {
    state,
    currentUser,
    getTierInfo,
    getDiscountPercent,
    setPendingAuthIntent,
    logoutUser,
  } = useV2Store();

  const currentRouteKey = `${location.pathname}${location.search}${location.hash}`;
  const isOpen = openRouteKey === currentRouteKey;
  const profileMenuOpen = profileRouteKey === currentRouteKey;
  const hoveredMenuId =
    hoveredMenu?.routeKey === currentRouteKey ? hoveredMenu.menuId : null;

  const setHoveredMenuId = useCallback(
    (menuId) => {
      setHoveredMenu(menuId ? { routeKey: currentRouteKey, menuId } : null);
    },
    [currentRouteKey]
  );

  const closeAllMenus = useCallback(() => {
    setOpenRouteKey(null);
    setHoveredMenu(null);
    setProfileRouteKey(null);
  }, []);

  const toggleMobileDrawer = useCallback(() => {
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
    if (!profileMenuOpen) return undefined;

    const handlePointerOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileRouteKey(null);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setProfileRouteKey(null);
      }
    };

    document.addEventListener("mousedown", handlePointerOutside);
    document.addEventListener("touchstart", handlePointerOutside, {
      passive: true,
    });
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handlePointerOutside);
      document.removeEventListener("touchstart", handlePointerOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [profileMenuOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("overflow-hidden");
    body.classList.add("overflow-hidden");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenRouteKey(null);
        setHoveredMenu(null);
        setProfileRouteKey(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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

  const isMenuActive = useCallback(
    (menu) => {
      const currentFull = `${location.pathname.toLowerCase()}${location.search.toLowerCase()}`;
      if (menu.id === "home") {
        return location.pathname.toLowerCase() === "/v2" || location.pathname.toLowerCase() === "/v2/";
      }
      if (menu.id === "services") {
        return currentFull.includes("/v2/global-ayurx") || currentFull.includes("/v2/muktikhela");
      }
      if (menu.id === "academy") {
        return (
          currentFull.includes("/v2/shatayush-world?section=seasonal") ||
          (currentFull.includes("/v2/ecosphere") && !currentFull.includes("tab=community"))
        );
      }
      if (menu.id === "community") {
        return (
          currentFull.includes("tab=community") ||
          (location.pathname.toLowerCase().includes("/v2/shatayush-world") &&
            !currentFull.includes("section=seasonal")) ||
          location.pathname.toLowerCase().includes("/v2/contact")
        );
      }
      if (menu.id === "membership") {
        return location.pathname.toLowerCase().includes("/v2/membership");
      }
      if (menu.id === "events") {
        return location.pathname.toLowerCase().includes("/v2/insight");
      }
      return false;
    },
    [location.pathname, location.search]
  );

  const wishlistCount = currentUser
    ? state.wishlist.filter((w) => w.userId === currentUser.id).length
    : 0;
  const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

  const handleWishlistClick = () => {
    closeAllMenus();
    if (!currentUser) {
      setPendingAuthIntent({
        type: "navigate",
        returnTo: "/v2/wishlist",
      });
      navigate("/v2/login");
      return;
    }
    navigate("/v2/wishlist");
  };

  const handleCartClick = () => {
    closeAllMenus();
    navigate("/v2/cart");
  };

  const activeTier = currentUser
    ? getTierInfo(currentUser.membershipTier)
    : null;
  const discountPercent = getDiscountPercent();
  const userInitials = currentUser
    ? currentUser.name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <nav
      aria-label="V2 Main navigation"
      onMouseLeave={() => {
        setHoveredMenuId(null);
      }}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col pointer-events-none"
    >
      <div
        className={`relative z-20 pointer-events-auto shrink-0 w-full h-16 sm:h-[72px] flex items-center border-b transition-all duration-300 ease-out ${
          isOpen
            ? "border-emerald-900/10 bg-white/98 backdrop-blur-2xl shadow-sm"
            : scrolled
              ? "border-[#C9A45C]/30 bg-white/95 backdrop-blur-2xl shadow-md"
              : "border-[#EDE5D5] bg-white/92 backdrop-blur-xl shadow-sm"
        }`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-14">
          <div className="flex items-center justify-between gap-3 w-full">
            <Link
              to="/v2"
              onClick={closeAllMenus}
              className="shrink-0 flex items-center gap-2"
            >
              <img
                src={logo}
                alt="JnanaYogAyu"
                className="h-9 sm:h-10 lg:h-16 w-auto transition-all duration-300 object-contain"
              />
            </Link>

            <div className="flex items-center justify-center min-w-0">
              <div className="hidden xl:flex items-center justify-center xl:gap-5 2xl:gap-7 xl:pr-5 2xl:pr-7 relative">
                {V2_NAV_MENUS.map((menu) => {
                  const isActive = isMenuActive(menu);
                  const hasChildren = menu.children && menu.children.length > 0;
                  const isDropdownOpen = hoveredMenuId === menu.id && hasChildren;

                  return (
                    <div
                      key={menu.id}
                      onMouseEnter={() => {
                        setProfileRouteKey(null);
                        if (hasChildren) {
                          setHoveredMenuId(menu.id);
                        } else {
                          setHoveredMenuId(null);
                        }
                      }}
                      className="relative"
                    >
                      <Link
                        to={menu.path}
                        onClick={() => closeAllMenus()}
                        aria-current={isActive ? "page" : undefined}
                        className={`relative inline-flex h-10 items-center gap-1 py-2 font-sans text-xs font-semibold tracking-[0.06em] 2xl:tracking-[0.09em] whitespace-nowrap transition-colors duration-200 ${
                          isActive
                            ? "text-emerald-950"
                            : "text-emerald-950/75 hover:text-emerald-800"
                        }`}
                      >
                        <span>{menu.name}</span>
                        {hasChildren && (
                          <FiChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              isDropdownOpen ? "rotate-180 text-[#8b6534]" : "text-emerald-950/45"
                            }`}
                          />
                        )}
                        {isActive && (
                          <motion.span
                            layoutId="v2NavUnderline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0f3d26] via-[#C9A45C] to-[#0f3d26] rounded-full"
                          />
                        )}
                      </Link>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 top-full pt-2.5 z-50 w-80"
                          >
                            <div className="overflow-hidden rounded-2xl border border-[#C9A45C]/40 bg-[#FFFDF9] shadow-[0_24px_70px_rgba(7,30,20,0.22)]">
                              <div className="bg-gradient-to-r from-[#071E14] to-[#12432D] px-4 py-3 text-[#FAF5E8]">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                                  {menu.name}
                                </p>
                                <p className="text-[11px] text-[#FAF5E8]/85">
                                  {menu.tagline}
                                </p>
                              </div>

                              <div className="p-2 flex flex-col gap-0.5">
                                {menu.children.map((sub) => (
                                  <Link
                                    key={sub.title}
                                    to={sub.path}
                                    onClick={closeAllMenus}
                                    className="group/item flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 hover:bg-[#e6efea]/75 transition-colors"
                                  >
                                    <div>
                                      <p className="font-serif text-sm font-bold text-[#0f3d26] group-hover/item:text-[#1a5c3a]">
                                        {sub.title}
                                      </p>
                                      <p className="font-sans text-[11px] text-[#0f3d26]/75">
                                        {sub.subtitle}
                                      </p>
                                    </div>
                                    <FiArrowRight className="h-3.5 w-3.5 text-[#C9A45C] opacity-70 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-2.5 xl:pl-5 2xl:pl-6 xl:border-l xl:border-emerald-900/10 relative">
                <button
                  type="button"
                  onClick={handleWishlistClick}
                  className="shrink-0 relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/10 text-emerald-950 hover:border-[#C9A45C]/60 hover:text-emerald-700 transition-colors"
                  aria-label="Wishlist"
                >
                  <FiHeart className="h-[18px] w-[18px]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-amber text-forest text-[10px] font-bold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCartClick}
                  className="shrink-0 relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/10 text-emerald-950 hover:border-[#C9A45C]/60 hover:text-emerald-700 transition-colors"
                  aria-label="Cart"
                >
                  <FiShoppingCart className="h-[18px] w-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-emerald-900 text-white text-[10px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {!currentUser ? (
                  <div className="flex items-center gap-2.5">
                    <Link
                      to="/v2/login"
                      onClick={closeAllMenus}
                      className="inline-flex h-10 items-center justify-center shrink-0 whitespace-nowrap px-5 rounded-full border border-emerald-900/25 text-emerald-950 font-sans text-xs font-bold tracking-[0.12em] hover:border-amber transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/v2/membership"
                      onClick={closeAllMenus}
                      className="inline-flex h-10 items-center justify-center shrink-0 whitespace-nowrap px-5 bg-emerald-900 text-white font-sans text-xs font-bold tracking-[0.12em] rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-md text-center"
                    >
                      JOIN JYA
                    </Link>
                  </div>
                ) : (
                  <div ref={profileRef} className="relative flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setHoveredMenu(null);
                        setProfileRouteKey((prev) =>
                          prev === currentRouteKey ? null : currentRouteKey
                        );
                      }}
                      aria-label="Account profile menu"
                      aria-expanded={profileMenuOpen}
                      className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C9A45C] bg-gradient-to-br from-[#071E14] via-[#0f3d26] to-[#1a5c3a] font-serif text-sm font-bold text-[#FAF5E8] shadow-md hover:scale-105 active:scale-95 transition-transform"
                    >
                      <span>{userInitials || <FiUser className="h-4 w-4" />}</span>
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#C9A45C]" />
                    </button>

                    <AnimatePresence>
                      {profileMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute right-0 top-full mt-2.5 w-64 rounded-2xl border border-[#C9A45C]/45 bg-[#FFFDF9] shadow-[0_24px_60px_rgba(7,30,20,0.25)] p-2 z-50"
                        >
                          <div className="rounded-xl bg-gradient-to-r from-[#071E14] to-[#12432D] px-3.5 py-3 text-[#FAF5E8]">
                            <p className="font-serif text-sm font-bold truncate">
                              {currentUser.name}
                            </p>
                            <p className="font-sans text-[11px] text-[#E7D7B5]">
                              {activeTier?.name}
                              {discountPercent > 0
                                ? ` · ${discountPercent}% off active`
                                : ""}
                            </p>
                          </div>

                          <div className="py-1.5 flex flex-col gap-0.5">
                            <Link
                              to="/v2/profile"
                              onClick={closeAllMenus}
                              className="px-3 py-2 text-xs font-sans font-bold text-[#0f3d26] hover:bg-[#e6efea] rounded-xl flex items-center gap-2.5 transition-colors"
                            >
                              <FiUser className="h-3.5 w-3.5 text-[#8b6534]" />
                              <span>My Profile</span>
                            </Link>
                            <Link
                              to="/v2/dashboard"
                              onClick={closeAllMenus}
                              className="px-3 py-2 text-xs font-sans font-semibold text-[#0f3d26] hover:bg-[#e6efea] rounded-xl flex items-center gap-2.5 transition-colors"
                            >
                              <FiGrid className="h-3.5 w-3.5 text-[#8b6534]" />
                              <span>User Dashboard & Analytics</span>
                            </Link>
                            <Link
                              to="/v2/membership"
                              onClick={closeAllMenus}
                              className="px-3 py-2 text-xs font-sans font-medium text-[#0f3d26] hover:bg-[#e6efea] rounded-xl flex items-center gap-2.5 transition-colors"
                            >
                              <FiAward className="h-3.5 w-3.5 text-[#8b6534]" />
                              <span>Membership & Tier Discounts</span>
                            </Link>
                            <Link
                              to="/v2/wishlist"
                              onClick={closeAllMenus}
                              className="px-3 py-2 text-xs font-sans font-medium text-[#0f3d26] hover:bg-[#e6efea] rounded-xl flex items-center gap-2.5 transition-colors"
                            >
                              <FiHeart className="h-3.5 w-3.5 text-[#8b6534]" />
                              <span>Saved Wishlist ({wishlistCount})</span>
                            </Link>
                            <Link
                              to="/v2/cart"
                              onClick={closeAllMenus}
                              className="px-3 py-2 text-xs font-sans font-medium text-[#0f3d26] hover:bg-[#e6efea] rounded-xl flex items-center gap-2.5 transition-colors"
                            >
                              <FiShoppingCart className="h-3.5 w-3.5 text-[#8b6534]" />
                              <span>My Cart ({cartCount})</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                logoutUser();
                                closeAllMenus();
                                navigate("/v2");
                              }}
                              className="mt-1 border-t border-[#EDE5D5] px-3 py-2.5 text-left text-xs font-sans font-bold text-[#8b6534] hover:bg-[#FAF5E8] rounded-xl flex items-center gap-2.5 transition-colors"
                            >
                              <FiLogOut className="h-3.5 w-3.5" />
                              <span>Sign out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="flex xl:hidden items-center justify-end sm:ml-3 sm:pl-3 sm:border-l sm:border-emerald-900/10">
                <button
                  type="button"
                  onClick={toggleMobileDrawer}
                  aria-label={
                    isOpen ? "Close navigation menu" : "Open navigation menu"
                  }
                  aria-expanded={isOpen}
                  aria-controls="v2-mobile-drawer"
                  className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full text-emerald-900 hover:text-emerald-700 hover:bg-emerald-950/5 focus:outline-none"
                >
                  {isOpen ? (
                    <FiX className="h-6 w-6" />
                  ) : (
                    <FiMenu className="h-6 w-6" />
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
            id="v2-mobile-drawer"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 sm:top-[72px] bottom-0 z-10 xl:hidden pointer-events-auto overflow-y-auto overscroll-contain bg-white/98 backdrop-blur-2xl border-t border-emerald-900/10 shadow-2xl"
          >
            <div className="min-h-full flex flex-col px-6 py-6 sm:py-8">
              <div className="w-full space-y-2.5">
                {V2_NAV_MENUS.map((menu) => {
                  const hasChildren = menu.children && menu.children.length > 0;
                  const expanded = mobileExpandedId === menu.id;
                  return (
                    <div
                      key={menu.id}
                      className="rounded-2xl border border-emerald-900/10 bg-[#FBF8F1]/60 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3">
                        <Link
                          to={menu.path}
                          onClick={closeAllMenus}
                          className="font-serif text-lg font-bold text-[#0f3d26]"
                        >
                          {menu.name}
                        </Link>
                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() =>
                              setMobileExpandedId(expanded ? null : menu.id)
                            }
                            className="p-1.5 rounded-full text-[#0f3d26] hover:bg-white"
                            aria-label={`Toggle ${menu.name} submenus`}
                          >
                            <FiChevronDown
                              className={`h-4 w-4 transition-transform ${
                                expanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {hasChildren && expanded && (
                        <div className="border-t border-[#EDE5D5] bg-white px-4 py-2 space-y-1">
                          {menu.children.map((sub) => (
                            <Link
                              key={sub.title}
                              to={sub.path}
                              onClick={closeAllMenus}
                              className="block rounded-xl px-3 py-2 hover:bg-[#e6efea]/60"
                            >
                              <p className="font-serif text-sm font-semibold text-[#0f3d26]">
                                {sub.title}
                              </p>
                              <p className="text-[11px] text-[#8b6534]">
                                {sub.subtitle}
                              </p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="sm:hidden flex flex-col items-center w-full pt-5 border-t border-emerald-900/10 gap-4">
                  <div className="flex items-center justify-center gap-8">
                    <button
                      type="button"
                      onClick={handleWishlistClick}
                      className="relative text-emerald-950 hover:text-emerald-700 p-2"
                      aria-label="Wishlist"
                    >
                      <FiHeart className="h-6 w-6" />
                      {wishlistCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 min-w-4 px-1 rounded-full bg-amber text-forest text-[10px] font-bold flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCartClick}
                      className="relative text-emerald-950 hover:text-emerald-700 p-2"
                      aria-label="Cart"
                    >
                      <FiShoppingCart className="h-6 w-6" />
                      {cartCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 min-w-4 px-1 rounded-full bg-emerald-900 text-white text-[10px] font-bold flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  </div>

                  {!currentUser ? (
                    <div className="w-full flex flex-col gap-2.5 items-center">
                      <Link
                        to="/v2/login"
                        onClick={closeAllMenus}
                        className="flex min-h-[44px] w-full items-center justify-center px-6 py-2.5 border border-emerald-900/25 text-emerald-950 font-sans text-xs font-bold tracking-[0.14em] rounded-full"
                      >
                        SIGN IN
                      </Link>
                      <Link
                        to="/v2/membership"
                        onClick={closeAllMenus}
                        className="flex min-h-[44px] w-full items-center justify-center px-6 py-2.5 bg-emerald-900 text-white font-sans text-xs font-bold tracking-[0.14em] rounded-full hover:bg-emerald-700 transition-all shadow-md"
                      >
                        JOIN JYA
                      </Link>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col gap-2.5">
                      <Link
                        to="/v2/profile"
                        onClick={closeAllMenus}
                        className="flex min-h-[44px] w-full items-center justify-center px-6 py-2.5 bg-[#C9A45C] text-[#071E14] font-sans text-xs font-bold tracking-[0.12em] rounded-full"
                      >
                        MY PROFILE (FULL BRIEF)
                      </Link>
                      <Link
                        to="/v2/dashboard"
                        onClick={closeAllMenus}
                        className="flex min-h-[44px] w-full items-center justify-center px-6 py-2.5 bg-emerald-900 text-white font-sans text-xs font-bold tracking-[0.12em] rounded-full"
                      >
                        USER DASHBOARD ({currentUser.name.split(" ")[0]})
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logoutUser();
                          closeAllMenus();
                          navigate("/v2");
                        }}
                        className="flex min-h-[44px] w-full items-center justify-center px-6 py-2.5 border border-emerald-900/20 text-bark font-sans text-xs font-bold tracking-[0.12em] rounded-full"
                      >
                        SIGN OUT
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default V2Navbar;
