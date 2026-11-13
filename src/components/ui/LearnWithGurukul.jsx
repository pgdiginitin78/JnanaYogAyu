import { motion, useReducedMotion } from "framer-motion";
import heroImage from "./assets/Traditional Ayurveda Gurukul Lesson.webp";

const vp = { once: false, amount: 0.15 };

const pillars = [
  {
    title: "Learn Traditionally",
    text: "Ground yourself in authentic Ayurvedic knowledge passed down through generations.",
  },
  {
    title: "Practice Consciously",
    text: "Apply what you learn through guided, hands-on experiences with full awareness.",
  },
  {
    title: "Live Naturally",
    text: "Build sustainable daily habits that connect you with health, nature and balance.",
  },
];

function LearnWithGurukul() {
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    hidden: shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0.4 : 0.7,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0D3323] via-[#12432D] to-[#1B5137] text-[#FDFBF7] py-6 md:py-14">
      {/* Decorative hairline dividers and ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-moss/20 blur-3xl" />
      </div>

      <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 max-w-xl">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-amber border border-amber/30 bg-white/5 rounded-full px-4 py-1.5 backdrop-blur-sm"
            >
              Ayurvedic Learning
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FDFBF7] leading-tight tracking-tight"
            >
              Learn with <span className="italic gradient-heading-dark">Swagurukul</span>
            </motion.h1>
            <motion.h2
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="font-serif text-base sm:text-lg lg:text-xl text-amber font-medium italic"
            >
              Learn Traditionally. Practice Consciously. Live Naturally.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="font-sans text-sm md:text-base text-white/85 leading-relaxed"
            >
              Swagurukul is a space where ancient Ayurvedic wisdom meets
              practical learning. Explore traditional knowledge, understand
              natural living, and develop a deeper connection with health,
              nature and sustainable lifestyles through guided learning and
              hands-on experiences.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button className="bg-amber text-forest px-7 py-3.5 rounded-xl font-sans text-sm font-bold shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300">
                Explore Swagurukul →
              </button>
              <button className="border border-amber/50 text-[#FDFBF7] px-7 py-3.5 rounded-xl font-sans text-sm font-semibold hover:bg-white/10 hover:border-amber transition-all duration-300">
                Discover Our Learning Approach →
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
              <img
                src={heroImage}
                alt="Lotus rising before a golden sun, framed by herb branches"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* <div className="mt-20 md:mt-28 text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-amber"
          >
            Our Learning Philosophy
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FDFBF7] leading-snug"
          >
            Knowledge is meaningful when it becomes part of everyday life.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="font-sans text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            At Swagurukul, learning goes beyond information. It encourages
            curiosity, practical understanding, conscious choices and the
            application of traditional wisdom in modern living.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={index * 0.5}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="bg-white/[0.07] backdrop-blur-md border border-white/15 hover:border-amber/40 rounded-2xl sm:rounded-3xl p-8 text-left shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <span className="font-sans text-amber text-sm font-bold tracking-widest">
                0{index + 1}
              </span>
              <h3 className="font-serif text-[#FDFBF7] text-xl font-bold mt-2 mb-3 group-hover:text-amber transition-colors">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-white/75 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

export default LearnWithGurukul;
