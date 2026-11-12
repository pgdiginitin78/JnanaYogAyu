import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";
import "lenis/dist/lenis.css";

export const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) return undefined;

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      anchors: false,
    });

    const update = ({ timestamp }) => instance.raf(timestamp);

    frame.update(update, true);
    setLenis(instance);

    return () => {
      cancelFrame(update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}