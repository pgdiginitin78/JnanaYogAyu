import { motion, useReducedMotion } from "framer-motion";
import AyurvedaStillLife from "./assets/a_photorealistic_still_life_scene_on_a_warm_beige.png";

const vp = { once: false, amount: 0.15 };

const fadeUp = (reduceMotion) => ({
  hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduceMotion ? 0.4 : 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
});

const makeIcon = (viewBox, d) =>
  function Icon({ className }) {
    return (
      <svg viewBox={viewBox} className={className} fill="currentColor" fillRule="evenodd">
        <path d={d} />
      </svg>
    );
  };

const LotusIcon = makeIcon(
  "0 0 58 44",
  "M3.5 22.4L5.1 27.2 7.2 31.5 9.0 33.9 11.0 35.9 13.4 37.6 17.1 39.4 22.9 40.4 25.9 40.4 28.8 39.5 31.1 40.1 35.8 40.4 40.2 39.5 44.6 37.6 47.2 35.6 50.5 32.0 52.4 28.6 54.6 22.9 54.5 22.0 53.5 21.4 46.4 21.9 45.9 21.4 46.1 11.6 45.4 10.9 44.1 11.1 38.6 14.2 37.2 15.8 36.4 15.8 33.9 10.6 29.4 3.6 28.6 3.6 25.1 8.9 21.8 15.6 21.1 15.8 19.1 14.0 13.8 11.1 12.2 10.9 11.6 11.5 11.9 21.6 11.5 22.0 4.5 21.6ZM51.8 24.2L51.6 25.4 49.5 29.9 47.6 32.4 45.4 34.5 41.1 37.1 36.6 38.2 35.6 38.2 35.1 37.9 35.5 37.0 37.8 35.8 41.1 32.5 43.2 29.4 45.4 24.5 46.2 24.1 49.2 23.8 51.2 23.8ZM6.8 24.0L7.2 23.6 12.1 24.1 13.0 25.4 13.4 27.2 14.4 29.5 16.2 32.2 18.5 34.5 21.5 36.5 22.8 37.0 23.1 37.9 22.6 38.2 18.8 37.8 16.5 37.0 13.2 35.0 10.9 32.8 9.1 30.5 6.6 24.8ZM43.4 14.0L44.1 14.8 43.9 21.2 43.1 24.4 41.0 29.0 39.0 31.9 38.0 32.9 37.2 33.0 36.9 32.5 38.0 29.0 38.2 24.4 37.1 18.1 38.1 17.0 39.8 15.9ZM14.0 14.0L14.9 14.0 16.9 15.0 20.2 17.2 20.9 18.1 20.9 18.9 20.0 21.1 19.9 27.1 20.4 29.9 21.9 33.4 21.6 33.9 20.5 33.4 17.9 30.6 16.1 28.0 14.2 23.0 13.8 19.4 13.6 14.5ZM28.6 7.6L29.1 7.6 30.0 8.2 34.1 15.5 35.5 19.6 36.2 24.6 36.1 27.1 35.6 29.1 34.1 32.9 31.4 36.0 29.4 37.4 28.4 37.2 27.6 36.8 23.9 32.9 22.5 29.2 22.0 26.0 22.1 21.5 23.2 17.2 26.1 11.2Z"
);

const LeafIcon = makeIcon(
  "0 0 49 49",
  "M44.6 3.9L43.2 4.1 41.8 5.8 38.2 8.0 33.2 9.9 27.0 11.2 24.5 12.1 20.6 14.4 18.0 16.9 16.2 19.4 15.2 21.2 14.4 23.8 14.2 25.6 13.8 26.2 13.2 26.2 11.6 24.6 9.5 23.2 6.8 22.1 5.2 21.1 4.5 21.0 4.0 21.4 3.8 22.5 3.8 27.6 5.2 32.8 6.5 34.6 8.6 36.6 13.1 38.8 13.6 39.4 11.0 43.9 10.9 44.6 11.2 45.2 12.5 45.2 16.0 40.4 17.2 39.2 21.9 40.5 29.1 40.5 32.5 39.6 35.0 38.5 37.9 36.5 40.8 33.6 42.5 31.1 43.6 28.9 45.1 24.4 45.6 19.6 45.6 12.4 45.0 4.4ZM6.2 24.0L7.0 24.0 10.5 26.1 12.5 28.2 13.0 30.4 12.9 34.0 13.8 35.5 13.4 36.2 11.9 36.0 9.9 34.9 6.9 31.6 6.2 30.1 5.8 27.2 5.8 24.6ZM42.9 7.9L43.4 8.5 43.5 12.6 43.2 22.5 41.8 28.0 39.0 32.5 35.2 35.9 33.2 37.0 27.4 38.8 25.9 38.8 20.0 37.8 19.5 37.1 19.6 36.4 31.9 24.0 35.4 19.8 35.9 18.4 35.4 18.0 34.6 18.2 30.0 23.1 24.5 28.0 18.0 34.6 17.2 34.8 16.8 34.0 16.2 30.5 16.1 26.1 17.1 22.0 19.0 18.9 22.1 15.9 25.5 14.0 36.9 10.8 41.1 8.8 42.2 7.9Z"
);

const RetreatIcon = makeIcon(
  "0 0 46 55",
  "M22.6 3.4L21.5 4.9 20.8 7.4 18.1 10.2 17.1 12.4 17.2 16.0 18.0 17.5 19.4 19.1 19.5 20.1 18.8 20.9 16.6 21.2 14.5 22.5 13.1 24.0 12.4 25.8 11.0 34.1 10.1 36.4 10.1 37.9 10.9 39.6 10.4 40.0 8.0 40.2 5.4 41.4 4.1 42.6 3.4 44.0 3.2 46.4 4.1 48.4 5.5 49.8 8.4 51.2 31.0 51.1 37.2 51.4 40.5 49.6 41.6 48.4 42.4 46.1 42.1 43.9 41.5 42.6 40.1 41.2 37.4 40.4 36.8 39.9 36.8 37.4 34.9 35.5 34.5 34.5 34.0 28.6 32.8 24.4 30.9 22.2 27.2 20.9 26.5 19.9 26.6 19.1 28.0 17.6 28.8 16.2 28.9 12.5 28.0 10.6 26.2 8.8 25.2 7.1 23.8 3.6ZM39.9 44.8L39.9 45.9 38.2 48.0 37.0 48.6 34.8 48.9 29.8 48.5 20.2 48.8 17.6 48.2 11.9 48.9 9.1 48.9 7.4 48.1 6.2 47.0 5.8 46.0 6.1 44.4 7.5 43.0 8.9 42.6 11.5 42.9 15.4 44.6 18.0 45.2 20.0 46.9 25.4 46.8 29.6 45.1 31.4 44.9 32.1 44.5 33.6 42.9 35.4 42.5 38.2 42.9ZM23.1 20.4L23.9 20.9 25.1 22.8 28.2 23.5 30.0 25.0 30.8 26.8 32.0 36.4 33.9 38.6 34.1 39.8 33.5 40.4 32.4 40.4 31.0 39.8 30.1 38.8 29.6 37.0 29.9 31.2 29.1 30.0 28.0 29.9 27.2 31.2 27.1 38.4 27.5 39.5 30.0 41.4 30.1 42.1 29.2 43.0 24.5 44.1 23.1 44.8 22.1 44.8 16.8 42.9 15.9 42.0 16.0 41.5 18.0 39.8 18.9 38.1 18.6 30.8 17.9 29.8 16.9 29.9 16.2 30.8 16.2 36.6 16.0 37.4 13.9 39.2 13.0 39.0 13.0 38.0 13.2 37.5 13.1 35.9 15.1 25.9 16.5 24.1 19.0 23.0 20.6 22.9 22.1 20.9ZM24.0 10.9L24.9 11.2 26.1 12.5 26.6 13.9 26.5 15.0 25.4 16.9 24.0 17.9 22.6 18.1 22.0 17.9 20.0 15.8 19.6 13.5 20.0 12.4 21.5 11.1ZM23.0 7.5L23.4 7.8 23.1 8.2 22.8 8.0Z"
);

const WellnessIcon = makeIcon(
  "0 0 48 48",
  "M40.1 3.4L38.9 3.1 37.1 4.4 33.8 9.0 25.0 19.0 24.0 19.8 4.6 19.8 3.9 20.2 3.8 22.2 4.2 26.2 6.1 31.1 8.0 34.0 10.5 36.5 14.5 39.4 13.2 42.9 13.4 43.6 14.0 44.4 32.0 44.5 33.8 44.4 34.5 44.0 34.8 43.4 34.5 41.6 33.6 39.5 34.5 38.5 38.4 35.8 41.6 31.6 43.6 26.5 44.0 23.1 44.5 21.8 44.4 20.6 43.4 19.9 41.6 19.6 38.0 19.8 37.4 19.4 37.5 18.4 44.9 9.0 44.6 7.5ZM32.0 41.0L32.0 41.8 31.4 42.5 17.0 42.5 16.0 41.8 16.2 40.9 17.2 40.1 27.4 40.5 31.1 40.0ZM6.5 23.9L6.5 22.4 7.4 21.8 40.4 21.8 41.1 22.0 41.6 22.8 41.0 26.5 40.0 29.2 37.8 32.8 35.5 35.0 32.4 36.9 29.4 37.9 25.2 38.2 18.6 38.0 15.6 36.9 12.5 34.9 10.1 32.6 8.6 30.5 7.5 27.9ZM38.9 12.2L38.8 13.1 33.6 19.5 30.5 19.4 28.6 19.6 28.2 19.2 28.4 18.4 35.8 10.6 36.6 10.5ZM39.2 5.9L39.8 5.9 41.5 7.4 42.4 8.6 42.1 9.4 40.6 10.9 40.0 10.8 37.8 8.2 37.9 7.2Z"
);

const ayurvedaFeatures = [
  {
    Icon: LotusIcon,
    title: "Know Your Prakriti",
    description: "Discover your unique Ayurvedic constitution (Vata, Pitta, Kapha).",
  },
  {
    Icon: WellnessIcon,
    title: "Personalised Insights",
    description: "Understand your strengths, imbalances and tendencies.",
  },
  {
    Icon: LeafIcon,
    title: "Lifestyle Guidance",
    description: "Get simple, practical Ayurvedic suggestions for daily life.",
  },
  {
    Icon: RetreatIcon,
    title: "Holistic Wellbeing",
    description: "Bring balance to your body, mind and daily routine.",
  },
];

export default function MuktikhelaAyurvedaSection() {
  const shouldReduce = useReducedMotion();
  const v = fadeUp(shouldReduce);

  return (
    <section className="w-full bg-[#FDFBF7] py-14 sm:py-6 lg:py-14 text-forest relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl 2xl:max-w-[1600px] items-center gap-10 px-4 sm:px-6 lg:px-20 lg:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.65fr)] lg:gap-14">
        {/* Introduction: the game is explained, not shown as a live quiz. */}
        <div className="max-w-[540px]">
          <motion.div
            variants={v}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-amber" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-amber">
              The Muktikhela
            </span>
            <span className="h-px w-8 bg-amber" />
          </motion.div>

          <motion.h2
            variants={v}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-forest"
          >
            <span className="gradient-heading">Muktikhela</span>
          </motion.h2>
          <motion.p
            variants={v}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="mt-4 font-serif text-2xl sm:text-3xl leading-tight text-amber"
          >
            मुक्तिः जीवनस्य उत्सवः
          </motion.p>
          <motion.p
            variants={v}
            custom={2.5}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="mt-1 font-serif text-xl sm:text-2xl italic leading-tight text-amber/90"
          >
            The Play of Liberation
          </motion.p>

          <motion.p
            variants={v}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="mt-6 font-sans text-forest/75 text-base sm:text-[17px] leading-relaxed"
          >
            An Ayurvedic self-discovery game that helps you understand your unique mind-body nature (Prakriti), lifestyle, and holistic wellbeing through a thoughtful question-and-answer journey.
          </motion.p>

          <motion.div
            variants={v}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <a
              href="/muktikhela"
              className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-xl bg-forest px-8 py-3.5 font-sans text-sm sm:text-base font-semibold tracking-wide text-white shadow-md hover:shadow-lg hover:bg-moss transition duration-300 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2"
            >
              Play Muktikhela
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>

            <a
              href="#muktikhela-how-it-works"
              className="inline-flex items-center gap-3 font-sans text-sm sm:text-base font-semibold text-forest hover:text-amber transition duration-300"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber/60 text-amber bg-white shadow-sm hover:border-amber transition">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 6 9 6-9 6z" />
                </svg>
              </span>
              How It Works
            </a>
          </motion.div>
        </div>

        {/* Information panel: Ayurvedic still-life image above the existing SVG icon row. */}
        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl border border-forest/10 bg-white shadow-[0_20px_50px_rgba(15,61,38,0.06)] hover:border-amber/40 transition-all duration-500"
        >
          <div className="relative h-[220px] sm:h-[260px] lg:h-[280px] w-full overflow-hidden">
            <img
              src={AyurvedaStillLife}
              alt="Ayurvedic herbs, mortar and pestle, herbal powders and a traditional wellness book"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-2 divide-x divide-y divide-forest/10 sm:grid-cols-4 sm:divide-y-0 bg-[#FDFBF7]/60">
            {ayurvedaFeatures.map(({ Icon, title, description }, idx) => (
              <motion.article
                key={title}
                variants={v}
                custom={idx * 0.5}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="flex min-h-[210px] sm:min-h-[220px] flex-col items-center p-5 sm:p-6 text-center group hover:bg-white transition-colors duration-300"
              >
                <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-full bg-forest/[0.06] text-amber group-hover:bg-forest group-hover:text-amber transition-colors duration-300 border border-amber/30">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold leading-snug text-forest group-hover:text-moss transition-colors">
                  {title}
                </h3>
                <p className="mt-2 font-sans text-xs sm:text-sm leading-relaxed text-forest/70">
                  {description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
