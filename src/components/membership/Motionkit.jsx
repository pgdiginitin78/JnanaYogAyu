import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

export const viewportConfig = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -5% 0px",
};

export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return fine;
}

const offsets = {
  up: { y: 44 },
  down: { y: -44 },
  left: { x: -56 },
  right: { x: 56 },
  scale: { scale: 0.92, y: 28 },
  fade: {},
};

const buildVariants = (reduce, kind, duration, delay) => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offsets[kind] },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration, delay, ease },
  },
});

export function Reveal({
  as = "div",
  kind = "up",
  delay = 0,
  duration = 0.7,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const variants = useMemo(
    () => buildVariants(reduce, kind, duration, delay),
    [reduce, kind, duration, delay],
  );
  const Component = motion[as];

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function Stagger({
  as = "div",
  stagger = 0.08,
  delay = 0,
  className,
  children,
  ...rest
}) {
  const Component = motion[as];

  return (
    <Component
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function Item({
  as = "div",
  kind = "up",
  duration = 0.6,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const variants = useMemo(
    () => buildVariants(reduce, kind, duration, 0),
    [reduce, kind, duration],
  );
  const Component = motion[as];

  return (
    <Component variants={variants} className={className} {...rest}>
      {children}
    </Component>
  );
}

export function SplitWords({
  as = "h2",
  parts,
  className,
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  const words = [];

  parts.forEach((part, pi) => {
    if (part.className && part.className.includes("gradient-heading")) {
      words.push({
        word: part.text.trim(),
        className: part.className,
        key: `${pi}-0`,
      });
    } else {
      part.text
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word, wi) => {
          words.push({ word, className: part.className, key: `${pi}-${wi}` });
        });
    }
  });

  const label = parts.map((part) => part.text).join(" ");
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: viewportConfig };

  return (
    <Component
      aria-label={label}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      className={className}
      {...trigger}
    >
      {words.map((item, i) => (
        <Fragment key={item.key}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom pt-[0.2em] pb-[0.35em] -mt-[0.2em] -mb-[0.35em]"
          >
            <motion.span
              variants={{
                hidden: reduce ? { opacity: 0 } : { y: "130%", rotate: 4 },
                show: {
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  transition: { duration: 0.8, ease },
                },
              }}
              className={`inline-block origin-left ${item.className || ""}`}
            >
              {item.word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Component>
  );
}

export function Counter({
  value,
  prefix = "",
  suffix = "",
  locale = "en-IN",
  duration = 1.8,
  className = "",
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.6 });
  const motionValue = useMotionValue(reduce ? value : 0);
  const text = useTransform(motionValue, (v) =>
    Math.round(v).toLocaleString(locale),
  );

  useEffect(() => {
    if (reduce) {
      motionValue.set(value);
      return undefined;
    }
    if (inView) {
      const controls = animate(motionValue, value, { duration, ease });
      return () => controls.stop();
    }
    motionValue.set(0);
    return undefined;
  }, [inView, reduce, value, duration, motionValue]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}

export function Parallax({
  as = "div",
  range = 60,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [range, -range],
  );
  const Component = motion[as];

  return (
    <Component ref={ref} style={{ y }} className={className} {...rest}>
      {children}
    </Component>
  );
}

export function TiltCard({ className = "", children, max = 7, ...rest }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 20,
  });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(201,164,92,0.22), transparent 55%)`;

  const handleMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={enabled ? handleMove : undefined}
      onMouseLeave={enabled ? handleLeave : undefined}
      style={
        enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined
      }
      whileHover={enabled ? { y: -8, transition: { duration: 0.3 } } : undefined}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {enabled && (
        <motion.div
          aria-hidden="true"
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}

export function Magnetic({ children, strength = 0.3, className = "" }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    my.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={enabled ? handleMove : undefined}
      onMouseLeave={enabled ? handleLeave : undefined}
      style={enabled ? { x, y } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrubWord({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
    </motion.span>
  );
}

export function ScrubWords({ text, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 60%"],
  });
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {reduce ? (
            <span>{word}</span>
          ) : (
            <ScrubWord
              word={word}
              progress={scrollYProgress}
              start={i / words.length}
              end={Math.min(1, (i + 1.5) / words.length)}
            />
          )}{" "}
        </Fragment>
      ))}
    </p>
  );
}

export function Marquee({
  items,
  className = "",
  itemClassName = "",
  speed = 45,
}) {
  const reduce = useReducedMotion();

  const row = (
    <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className={`whitespace-nowrap ${itemClassName}`}>{item}</span>
          <span className="h-2 w-2 shrink-0 rotate-45 border border-[#C9A45C] bg-[#C9A45C]/40" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max will-change-transform"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {row}
        {row}
      </motion.div>
    </div>
  );
}

export function Orbit({ className = "", duration = 60, reverse = false }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      animate={reduce ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
      className={`will-change-transform ${className}`}
    />
  );
}

export function AnimatedCheck({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.5, ease },
          },
        }}
      />
    </svg>
  );
}