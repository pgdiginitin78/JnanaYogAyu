import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { V2StoreProvider } from "./context/V2StoreContext";
import { useV2Store } from "./context/v2Context";
import { useLenis } from "../components/common/SmoothScroll";
import V2Navbar from "./components/V2Navbar";
import V2Footer from "./components/V2Footer";
import V2HomePage from "./pages/V2HomePage";
import V2ShatayushWorldPage from "./pages/V2ShatayushWorldPage";
import V2GlobalAyurXPage from "./pages/V2GlobalAyurXPage";
import V2EcoSpherePage from "./pages/V2EcoSpherePage";
import V2MuktikhelaPage from "./pages/V2MuktikhelaPage";
import V2MembershipPage from "./pages/V2MembershipPage";
import V2InsightPage from "./pages/V2InsightPage";
import V2ContactPage from "./pages/V2ContactPage";
import V2AuthPage from "./pages/V2AuthPage";
import V2WishlistPage from "./pages/V2WishlistPage";
import V2CartPage from "./pages/V2CartPage";
import V2UserDashboardPage from "./pages/V2UserDashboardPage";
import V2UserProfilePage from "./pages/V2UserProfilePage";

function V2ScrollManager() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace("#", ""));
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lenis]);

  return null;
}

function V2ToastBanner() {
  const { toastMessage } = useV2Store();
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[70] rounded-full border border-[#C9A45C] bg-[#071E14] text-[#FAF5E8] px-5 py-3 shadow-2xl font-sans text-xs font-bold"
        >
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function V2AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route index element={<V2HomePage />} />
          <Route path="shatayush-world" element={<V2ShatayushWorldPage />} />
          <Route path="global-ayurx" element={<V2GlobalAyurXPage />} />
          <Route path="ecosphere" element={<V2EcoSpherePage />} />
          <Route path="muktikhela" element={<V2MuktikhelaPage />} />
          <Route path="membership" element={<V2MembershipPage />} />
          <Route path="insight" element={<V2InsightPage />} />
          <Route path="contact" element={<V2ContactPage />} />
          <Route path="login" element={<V2AuthPage />} />
          <Route path="wishlist" element={<V2WishlistPage />} />
          <Route path="cart" element={<V2CartPage />} />
          <Route path="dashboard" element={<V2UserDashboardPage />} />
          <Route path="profile" element={<V2UserProfilePage />} />
          <Route path="*" element={<V2HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function V2App() {
  return (
    <MotionConfig reducedMotion="user">
      <V2StoreProvider>
        <V2ScrollManager />
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-x-hidden flex flex-col">
          <V2Navbar />
          <div className="relative z-10 pt-16 sm:pt-[72px] flex-1">
            <V2AnimatedRoutes />
          </div>
          <V2Footer />
          <V2ToastBanner />
        </div>
      </V2StoreProvider>
    </MotionConfig>
  );
}

export default V2App;
