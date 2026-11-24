import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ lenisRef }) {
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

