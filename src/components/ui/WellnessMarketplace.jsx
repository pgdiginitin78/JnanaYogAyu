import { motion, useReducedMotion } from "framer-motion";
import opdImage from "./assets/marketplace/Warm Ayurveda Clinic Consultation.webp";
import PanchakarmaImage from "./assets/marketplace/Serene Shirodhara Ayurvedic Spa Ritual.webp";
import natureTherapyImage from "./assets/marketplace/Serene Forest Stream Meditation.webp";
import wellnessImage from "./assets/marketplace/Sunrise Garden Meditation Retreat.webp";
import HerbalImage from "./assets/marketplace/Ayurvedic Herbal Still Life.webp";
import naturalFoodsImage from "./assets/marketplace/Rustic Harvest of Grains and Garden Freshness.webp";
import artisanGoodsImage from "./assets/marketplace/Rustic Artisan Market Still Life.webp";
import communityBarterImage from "./assets/marketplace/Sustainable Village Barter Market.webp";

const sections = [
  {
    id: "wellness",
    title: "Wellness Services",
    hindi: "स्वास्थ्य सेवा",
    cta: "Explore Wellness →",
    items: [
      {
        title: "OPD Clinic",
        subtitle: "Personalised Ayurvedic Care",
        image: opdImage,
      },
      {
        title: "Panchakarma",
        subtitle: "Detox & Rejuvenation",
        image: PanchakarmaImage,
      },
      {
        title: "Nature Therapy",
        subtitle: "Healing with Nature",
        image: natureTherapyImage,
      },
      {
        title: "Wellness Programs",
        subtitle: "Lifestyle & Prevention",
        image: wellnessImage,
      },
    ],
  },
  {
    id: "marketplace",
    title: "Natural Marketplace",
    hindi: "आयुर्वेदिक बाजार",
    cta: "Explore Marketplace →",
    items: [
      {
        title: "Herbal Products",
        subtitle: "Ayurvedic & Natural Essentials",
        image: HerbalImage,
      },
      {
        title: "Natural Foods",
        subtitle: "Farm Fresh & Wholesome",
        image: naturalFoodsImage,
      },
      {
        title: "Artisan Goods",
        subtitle: "Local & Handmade",
        image: artisanGoodsImage,
      },
      {
        title: "Community Barter",
        subtitle: "Exchange & Support",
        image: communityBarterImage,
      },
    ],
  },
];

const vp = { once: false, amount: 0.15 };

function hideBrokenImage(event) {
  event.currentTarget.style.display = "none";
}

function WellnessMarketplace() {
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
    <section className="bg-[#FDFBF7] py-6 md:py-14 text-forest relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-20">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-amber border border-amber/30 bg-amber/5 rounded-full px-4 py-1.5"
          >
            Wellness &amp; Natural Living
          </motion.span>
          <motion.p
            variants={fadeUp}
            custom={0.5}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="text-amber font-serif text-lg tracking-widest"
          >
            आरोग्यम् · प्रकृतिः · समुदायः
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest leading-tight"
          >
            A Healthier Life, Rooted in <span className="gradient-heading">Nature and Community</span>.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="font-sans text-forest/75 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Discover holistic Ayurvedic care and natural products through the
            Swagrama ecosystem. From personalised wellness experiences to
            locally crafted essentials, explore a more conscious and
            sustainable way of living.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {sections.map((section, sectionIdx) => (
            <motion.div
              key={section.id}
              variants={fadeUp}
              custom={sectionIdx * 0.5}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="bg-white border border-forest/10 hover:border-amber/40 rounded-3xl p-6 md:p-8 shadow-[0_16px_36px_rgba(15,61,38,0.06)] hover:shadow-[0_24px_48px_rgba(15,61,38,0.12)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 flex items-baseline justify-between flex-wrap gap-2">
                  <h2 className="font-serif text-forest text-2xl md:text-3xl font-bold">
                    {section.title}
                  </h2>
                  <p className="text-amber font-serif text-sm tracking-wider">{section.hindi}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {section.items.map((item, itemIdx) => (
                    <motion.div
                      key={item.title}
                      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={vp}
                      transition={{
                        duration: 0.6,
                        delay: itemIdx * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-forest shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={hideBrokenImage}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Clean bottom gradient only for subtitle legibility, no green tint overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-serif font-bold text-base md:text-lg leading-tight">
                          {item.title}
                        </h3>
                        <p className="font-sans text-stone-200 text-xs md:text-sm mt-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            <div className="flex justify-center">
                <button className="mt-8 self-start bg-forest text-white px-7 py-3.5 rounded font-sans text-sm font-semibold tracking-wide shadow-md hover:bg-moss hover:shadow-lg transition-all duration-300">
                {section.cta}
              </button>
            </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WellnessMarketplace;
