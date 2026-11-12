import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import communityMain from "./assets/joincommunity/Golden Gathering Under the Tree.webp";
import communityPlanting from "./assets/joincommunity/Community Tree Planting Together.webp";
import communityBarter from "./assets/joincommunity/Warm Village Market Exchange.webp";
import gurukulLearning from "./assets/joincommunity/Traditional Gurukul Learning Circle.webp";
import gurukulCircleImage from "./assets/joincommunity/Ayurvedic Garden Lesson with the Guru.webp";
import gurkulSqureImage from "./assets/joincommunity/Herbal Preparation in a Sunlit Courtyard.webp";

const iconPaths = {
  leaf: [
    "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
    "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
  ],
  book: [
    "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",
    "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  ],
  exchange: [
    "m17 2 4 4-4 4",
    "M3 11v-1a4 4 0 0 1 4-4h14",
    "m7 22-4-4 4-4",
    "M21 13v1a4 4 0 0 1-4 4H3",
  ],
  sprout: [
    "M7 20h10",
    "M10 20c5.5-2.5.8-6.4 3-10",
    "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",
    "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",
  ],
};

const clients = [
  {
    id: "community",
    name: "Community",
    tag: "Join Our Community",
    native: "",
    headlinePlain: "Grow Together. Live Consciously.",
    headlineAccent: "Create a Better Tomorrow.",
    description:
      "Be part of a community that believes in natural living, shared knowledge, self-reliance and meaningful connections. Connect with like-minded people and contribute to a sustainable way of life inspired by a shared philosophy.",
    highlightsTitle: "Why Join Our Community?",
    highlights: [
      {
        icon: "leaf",
        title: "Live More Consciously",
        text: "Adopt healthier, mindful habits alongside people who share the same values.",
      },
      {
        icon: "book",
        title: "Learn and Share Knowledge",
        text: "Gain practical wisdom from others and contribute what you know in return.",
      },
      {
        icon: "exchange",
        title: "Exchange and Support",
        text: "Share resources and help one another through mutual exchange.",
      },
      {
        icon: "sprout",
        title: "Build a Sustainable Future",
        text: "Support nature, local agriculture and self-reliance for a better tomorrow.",
      },
    ],
    primaryCta: "Join Our Community →",
    secondaryCta: "Discover Our Philosophy →",
    images: [communityMain, communityPlanting, communityBarter],
    floatingLabel: "Grow Together",
    floatingNative: "Our Community",
    theme: {
      heading: "#2E5E3E",
      accent: "#D98E04",
      sectionBackground:
        "linear-gradient(135deg, #FFF9EE 0%, #F4F8EC 45%, #E4F0E6 100%)",
      glowA: "linear-gradient(135deg, #FFE2B0, #FFF3D6)",
      glowB: "linear-gradient(135deg, #BFE0C4, #E4F0E6)",
      button: "linear-gradient(90deg, #2E5E3E 0%, #5E9C6E 100%)",
      textGradient: "linear-gradient(90deg, #D98E04 0%, #2E5E3E 100%)",
      badge: "linear-gradient(135deg, #2E5E3E 0%, #5E9C6E 100%)",
      cards: [
        "linear-gradient(145deg, #FFF3DE 0%, #FFE3BC 100%)",
        "linear-gradient(145deg, #EAF5E8 0%, #D2E8D5 100%)",
        "linear-gradient(145deg, #FFF0E6 0%, #FAD6BE 100%)",
        "linear-gradient(145deg, #F1F6E0 0%, #DDE8B8 100%)",
      ],
      tiles: [
        "linear-gradient(160deg, #F8D9A0 0%, #E9A96B 100%)",
        "linear-gradient(160deg, #BFE0C4 0%, #5E9C6E 100%)",
        "linear-gradient(160deg, #F6E3B4 0%, #C9D9A6 100%)",
      ],
    },
  },
  // {
  //   id: "swagurukul",
  //   name: "Swagurukul",
  //   tag: "Learn with Swagurukul",
  //   native: "",
  //   headlinePlain: "Learn Traditionally. Practice Consciously.",
  //   headlineAccent: "Live Naturally.",
  //   description:
  //     "Swagurukul is a space where ancient Ayurvedic wisdom meets practical learning. Explore traditional knowledge, understand natural living, and develop a deeper connection with health, nature and sustainable lifestyles through guided learning and hands-on experiences.",
  //   highlightsTitle: "Our Learning Philosophy",
  //   highlights: [
  //     {
  //       icon: "book",
  //       title: "Learn Traditionally",
  //       text: "Ground yourself in authentic Ayurvedic knowledge passed down through generations.",
  //     },
  //     {
  //       icon: "leaf",
  //       title: "Practice Consciously",
  //       text: "Apply what you learn through guided, hands-on experiences with full awareness.",
  //     },
  //     {
  //       icon: "sprout",
  //       title: "Live Naturally",
  //       text: "Build sustainable daily habits that connect you with health, nature and balance.",
  //     },
  //   ],
  //   primaryCta: "Explore Swagurukul →",
  //   secondaryCta: "Discover Our Learning Approach →",
  //   images: [gurukulLearning, gurukulCircleImage, gurkulSqureImage],
  //   floatingLabel: "Learn Naturally",
  //   floatingNative: "Swagurukul",
  //   theme: {
  //     heading: "#6B3A12",
  //     accent: "#B4690E",
  //     sectionBackground:
  //       "linear-gradient(135deg, #FFF6EC 0%, #FBEFE0 45%, #F3E6D3 100%)",
  //     glowA: "linear-gradient(135deg, #FFD9B0, #FFF1DC)",
  //     glowB: "linear-gradient(135deg, #F2C9A5, #F8E8D4)",
  //     button: "linear-gradient(90deg, #B4690E 0%, #E3A53A 100%)",
  //     textGradient: "linear-gradient(90deg, #D98E04 0%, #8A3F1B 100%)",
  //     badge: "linear-gradient(135deg, #B4690E 0%, #E3A53A 100%)",
  //     cards: [
  //       "linear-gradient(145deg, #FFF3DE 0%, #FFE0B5 100%)",
  //       "linear-gradient(145deg, #FFEFE3 0%, #F9D3B8 100%)",
  //       "linear-gradient(145deg, #F7F0DC 0%, #E8DBB0 100%)",
  //     ],
  //     tiles: [
  //       "linear-gradient(160deg, #FBDDB0 0%, #E3A53A 100%)",
  //       "linear-gradient(160deg, #F9D3B8 0%, #C9703A 100%)",
  //       "linear-gradient(160deg, #F2E4BE 0%, #D9B97A 100%)",
  //     ],
  //   },
  // },
];

const vp = { once: false, amount: 0.1 };

const tilePositions = [
  "left-0 top-10 w-[55%] h-[80%] rounded-t-full rounded-b-3xl",
  "right-0 top-0 w-[40%] aspect-square rounded-full",
  "right-4 bottom-0 w-[42%] h-[42%] rounded-3xl",
];

const columnClasses = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

function hideBrokenImage(event) {
  event.currentTarget.style.display = "none";
}

function Icon({ name }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      {iconPaths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function ClientShowcase() {
  const [activeId, setActiveId] = useState(clients[0].id);
  const client = clients.find((item) => item.id === activeId);
  const { theme } = client;
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
    <section
      className="relative overflow-hidden transition-all duration-500"
      style={{ background: theme.sectionBackground }}
    >
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-60"
        style={{ background: theme.glowA }}
      ></div>
      <div
        className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-60"
        style={{ background: theme.glowB }}
      ></div>

      <div className="relative mx-auto px-6 md:px-12 lg:px-20 py-6 md:py-14">
    

        <div key={client.id} className="space-y-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
              <motion.span
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="inline-block font-sans text-xs tracking-widest uppercase rounded-full px-4 py-2 border border-stone-200 bg-white"
                style={{ color: theme.heading }}
              >
                {client.tag}
              </motion.span>
              {client.native && (
                <motion.p
                  variants={fadeUp}
                  custom={0.5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={vp}
                  className="text-xl tracking-widest"
                  style={{ color: theme.accent }}
                >
                  {client.native}
                </motion.p>
              )}
              <motion.h1
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="font-serif text-4xl md:text-5xl font-semibold leading-tight"
                style={{ color: theme.heading }}
              >
                {client.headlinePlain}{" "}
                <span
                  style={{
                    background: theme.textGradient,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {client.headlineAccent}
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="font-sans text-stone-600 leading-relaxed max-w-xl"
              >
                {client.description}
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="flex flex-wrap gap-3 pt-2"
              >
                <button
                  className="text-white px-7 py-3 rounded-full font-sans text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
                  style={{ background: theme.button }}
                >
                  {client.primaryCta}
                </button>
                <button
                  className="bg-white border border-stone-300 px-7 py-3 rounded-full font-sans text-sm font-medium hover:shadow-md hover:-translate-y-0.5 transition"
                  style={{ color: theme.heading }}
                >
                  {client.secondaryCta}
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[420px] md:h-[540px]"
            >
              {client.images.map((src, index) => (
                <div
                  key={src}
                  className={`absolute overflow-hidden shadow-xl ${tilePositions[index]}`}
                  style={{ background: theme.tiles[index] }}
                >
                  <img
                    src={src}
                    alt={`${client.name} ${index + 1}`}
                    onError={hideBrokenImage}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="absolute bottom-6 left-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-stone-100">
                <p className="font-serif font-semibold" style={{ color: theme.heading }}>
                  {client.floatingLabel}
                </p>
                <p className="font-sans text-sm" style={{ color: theme.accent }}>
                  {client.floatingNative}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="pt-20 md:pt-28">
            <div className="text-center mb-12">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="font-serif text-3xl md:text-4xl font-semibold"
                style={{ color: theme.heading }}
              >
                {client.highlightsTitle}
              </motion.h2>
              <div
                className="mx-auto mt-4 h-1 w-24 rounded-full"
                style={{ background: theme.textGradient }}
              ></div>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                columnClasses[client.highlights.length]
              } gap-6`}
            >
              {client.highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={index * 0.5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={vp}
                  className={`relative overflow-hidden rounded-3xl p-7 border border-white shadow-md hover:shadow-xl hover:-translate-y-1 transition ${
                    index % 2 === 1 ? "lg:mt-10" : ""
                  }`}
                  style={{
                    background: theme.cards[index % theme.cards.length],
                  }}
                >
                  <span className="absolute top-3 right-5 text-6xl font-bold text-white opacity-70">
                    0{index + 1}
                  </span>
                  <div
                    className="relative w-12 h-12 rounded-full text-white flex items-center justify-center shadow-md"
                    style={{ background: theme.badge }}
                  >
                    <Icon name={item.icon} />
                  </div>
                  <h3
                    className="relative font-serif text-lg font-semibold mt-8 mb-2"
                    style={{ color: theme.heading }}
                  >
                    {item.title}
                  </h3>
                  <p className="relative font-sans text-stone-600 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientShowcase;
