import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowRight,
  FiExternalLink,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiYoutube,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import jyaLogo from "../assets/VerticleLogo.png";

const Footer = () => {
  const shouldReduce = useReducedMotion();

  const colFadeUp = (i) => ({
    hidden: shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0.4 : 0.65,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  const vp = { once: false, amount: 0.1 };

  const footerRef = useRef(null);

  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/aboutUs" },
    { label: "JYA Ecosystem", href: "/jyaEcosystem" },
    { label: "Services", href: "/services" },
    { label: "Knowledge", href: "/knowledge" },
    { label: "Privacy Policy", href: "/privacyAndPolicy" },
    { label: "Terms & Conditions", href: "/" },
  ];

  const socialLinks = [
    {
      href: "https://www.instagram.com/swagramacommunity/?igsh=am9scG90bXd1ZW0y#",
      icon: FiInstagram,
      label: "Instagram",
    },
    {
      href: "https://www.facebook.com/swagramacommunity/",
      icon: FiFacebook,
      label: "Facebook",
    },
    {
      href: "https://www.youtube.com/@swagramacommunity",
      icon: FiYoutube,
      label: "YouTube",
    },
  ];

  return (
    <>
      <footer
        ref={footerRef}
        style={{ backgroundColor: "#0f3d26" }}
        className="relative overflow-hidden"
      >
        {/* ── Top accent bar ── */}
        <div className="footer-accent-bar" />

        {/* ── Subtle radial glow ── */}
        <div
          style={{
            position: "absolute",
            top: "-90px",
            right: "-90px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(207,164,98,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 mx-auto px-6 lg:px-12 py-10 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8"
          >
            {/* ── Col 1 : Logo ── */}
            <motion.div variants={colFadeUp(0)} className="flex flex-col gap-3">
              <div className="logo-card">
                <img
                  src={jyaLogo}
                  loading="lazy"
                  alt="JnanaYogAyu Logo"
                  style={{ width: "190px", height: "auto" }}
                />
                <p className="logo-tagline">
                  Ayurveda · Yoga · Nature
                  <br />
                  Wisdom for Wellbeing
                </p>
              </div>

              {/* Social row below logo */}
              <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label={label}
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Col 2 : Explore ── */}
            <div>
              <h4 className="footer-heading font-serif text-white text-sm font-bold mb-4">
                Explore
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {exploreLinks.map((link, index) => (
                  <Link to={link.href} key={index} className="footer-link">
                    <FiArrowRight className="link-arrow" size={13} />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Col 3 : Contact ── */}
            <div>
              <h4 className="footer-heading font-serif text-white text-sm font-bold mb-4">
                Contact
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* WhatsApp */}
                <div className="contact-row">
                  <FiPhone className="contact-icon" size={15} />
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        marginBottom: "2px",
                        color: "rgba(253,251,247,0.90)",
                      }}
                    >
                      WhatsApp{" "}
                      <span style={{ fontWeight: 400 }}>(8AM – 6PM)</span>
                    </p>
                    <p>+91 9272130399 &nbsp;/&nbsp; +91 9272110399</p>
                  </div>
                </div>

                {/* Helpline */}
                <div className="contact-row">
                  <FiPhone className="contact-icon" size={15} />
                  <p>
                    Helpline:{" "}
                    <span
                      style={{
                        fontWeight: 600,
                        color: "rgba(253,251,247,0.90)",
                      }}
                    >
                      24×7
                    </span>{" "}
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "rgba(207,164,98,0.70)",
                      }}
                    >
                      (coming soon)
                    </span>
                  </p>
                </div>

                {/* Email */}
                <div className="contact-row">
                  <FiMail className="contact-icon" size={15} />
                  <a
                    href="mailto:swagrama.lavale@gmail.com"
                    className="contact-link"
                  >
                    swagrama.lavale@gmail.com
                  </a>
                </div>

                {/* Community address */}
                <div className="contact-row">
                  <FiMapPin className="contact-icon" size={15} />
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        marginBottom: "3px",
                        color: "rgba(253,251,247,0.90)",
                      }}
                    >
                      Community Village
                    </p>
                    <p>
                      SwaGrama Ayurveda Yoga Nature Agro Tourism, Near Symbiosis
                      University Women's Medical College, Next to Lupin Company,
                      Lavale – 412115, Pune, Maharashtra
                    </p>
                    <a
                      href="https://maps.app.goo.gl/gUrwu5xSRZxVbyZw5#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="maps-link"
                    >
                      <FiExternalLink size={11} /> View on Maps
                    </a>
                  </div>
                </div>

                {/* Office */}
                <div className="contact-row">
                  <FiMapPin className="contact-icon" size={15} />
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        marginBottom: "3px",
                        color: "rgba(253,251,247,0.90)",
                      }}
                    >
                      Office
                    </p>
                    <a
                      href="https://www.google.com/maps/place/JnanaYogAyu+PVT.+LTD."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      JnanaYogAyu, 81/635, Nandraj Sankul, 1A-2, Main Road,
                      Famous Chowk, New Sangavi, Pune 411027
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Col 4 : Map + CTA ── */}
            <div>
              <h4 className="footer-heading font-serif text-white text-sm font-bold mb-4">
                Find Us
              </h4>

              <div
                className="map-container"
                style={{ height: "175px", marginBottom: "10px" }}
              >
                <iframe
                  src="https://www.google.com/maps?q=Swagram%20Car%20Parking%20Lavale%20Maharashtra&output=embed"
                  width="100%"
                  height="175"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>

              <a
                href="https://www.google.com/maps/place/GPQ9%2BJW3+Swagram+Car+Parking,+Lavale,+Maharashtra+412115"
                target="_blank"
                rel="noopener noreferrer"
                className="maps-link"
              >
                <FiExternalLink size={11} /> View Parking Location
              </a>

              {/* CTA nudge */}
              <div className="cta-nudge">
                <p className="cta-nudge-label">Join Our Community</p>
                <p className="cta-nudge-body">
                  Discover Ayurveda, Yoga & Nature — your journey to holistic
                  wellbeing starts here.
                </p>
                <Link to="/join" className="cta-nudge-link">
                  <FiArrowRight size={13} /> Join JYA
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom">
            <p>© 2026 JnanaYogAyu Pvt. Ltd. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacyAndPolicy">Privacy Policy</Link>
              <Link to="/">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
