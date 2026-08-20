import { useRef } from "react";
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
      <style>{`
        /* ── Accent bar ── */
        .footer-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, transparent, #cfa462, #8b6534, #cfa462, transparent);
        }

        /* ── Section headings ── */
        .footer-heading {
          position: relative;
          padding-bottom: 10px;
          letter-spacing: 0.1em;
        }
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 36px;
          height: 2px;
          background: linear-gradient(90deg, #cfa462, #8b6534);
          border-radius: 2px;
        }

        /* ── Nav links ── */
        .footer-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(253, 251, 247, 0.68);
          font-size: 0.8rem;
          transition: color 0.25s ease, gap 0.25s ease;
          text-decoration: none;
        }
        .footer-link:hover {
          color: #cfa462;
          gap: 10px;
        }
        .footer-link .link-arrow {
          opacity: 0;
          color: #cfa462;
          flex-shrink: 0;
          transition: opacity 0.25s ease, transform 0.25s ease;
          transform: translateX(-4px);
        }
        .footer-link:hover .link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Contact rows ── */
        .contact-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: rgba(253, 251, 247, 0.72);
          font-size: 0.775rem;
          line-height: 1.55;
        }
        .contact-icon {
          flex-shrink: 0;
          margin-top: 2px;
          color: #cfa462;
        }

        /* ── Social buttons ── */
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(253, 251, 247, 0.07);
          border: 1px solid rgba(207, 164, 98, 0.25);
          color: rgba(253, 251, 247, 0.78);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .social-btn:hover {
          background: rgba(207, 164, 98, 0.18);
          border-color: rgba(207, 164, 98, 0.55);
          color: #cfa462;
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(207, 164, 98, 0.18);
        }

        /* ── Map container ── */
        .map-container {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(207, 164, 98, 0.22);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
        }

        /* ── Logo card ── */
        .logo-card {
          background: linear-gradient(135deg, rgba(253,251,247,0.09), rgba(253,251,247,0.04));
          border: 1px solid rgba(207, 164, 98, 0.22);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .logo-tagline {
          font-size: 0.7rem;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          color: rgba(207, 164, 98, 0.80);
          text-align: center;
          line-height: 1.65;
        }

        /* ── Maps link ── */
        .maps-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          color: #cfa462;
          text-decoration: none;
          margin-top: 6px;
          transition: color 0.2s, gap 0.2s;
        }
        .maps-link:hover {
          color: #d4b87d;
          gap: 8px;
        }

        /* ── Email / office link hover ── */
        .contact-link {
          color: rgba(253,251,247,0.72);
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact-link:hover {
          color: #cfa462;
        }

        /* ── CTA nudge card ── */
        .cta-nudge {
          margin-top: 18px;
          padding: 14px 16px;
          background: linear-gradient(135deg, rgba(207,164,98,0.10), rgba(139,101,52,0.07));
          border: 1px solid rgba(207,164,98,0.20);
          border-radius: 10px;
        }
        .cta-nudge-label {
          font-size: 0.7rem;
          color: #cfa462;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .cta-nudge-body {
          font-size: 0.72rem;
          color: rgba(253,251,247,0.58);
          line-height: 1.55;
        }
        .cta-nudge-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #cfa462;
          text-decoration: none;
          transition: gap 0.2s;
        }
        .cta-nudge-link:hover {
          gap: 10px;
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          border-top: 1px solid rgba(207,164,98,0.14);
          padding-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          justify-content: space-between;
        }
        .footer-bottom p {
          font-size: 0.73rem;
          color: rgba(253,251,247,0.45);
          letter-spacing: 0.04em;
        }
        .footer-bottom-links {
          display: flex;
          gap: 18px;
        }
        .footer-bottom-links a {
          font-size: 0.73rem;
          color: rgba(207,164,98,0.60);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-bottom-links a:hover {
          color: #cfa462;
        }
      `}</style>

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

        <div className="relative z-10 mx-auto px-6 lg:px-12 py-10 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">

            {/* ── Col 1 : Logo ── */}
            <div className="flex flex-col gap-3">
              <div className="logo-card">
                <img
                  src={jyaLogo}
                  loading="lazy"
                  alt="JnanaYogAyu Logo"
                  style={{ width: "120px", height: "auto" }}
                />
                <p className="logo-tagline">
                  Ayurveda · Yoga · Nature<br />Wisdom for Wellbeing
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
            </div>

            {/* ── Col 2 : Explore ── */}
            <div>
              <h4 className="footer-heading font-['Cinzel'] text-white text-sm font-bold mb-4">
                Explore
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
              <h4 className="footer-heading font-['Cinzel'] text-white text-sm font-bold mb-4">
                Contact
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                {/* WhatsApp */}
                <div className="contact-row">
                  <FiPhone className="contact-icon" size={15} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.75rem", marginBottom: "2px", color: "rgba(253,251,247,0.90)" }}>
                      WhatsApp <span style={{ fontWeight: 400 }}>(8AM – 6PM)</span>
                    </p>
                    <p>+91 9272130399 &nbsp;/&nbsp; +91 9272110399</p>
                  </div>
                </div>

                {/* Helpline */}
                <div className="contact-row">
                  <FiPhone className="contact-icon" size={15} />
                  <p>
                    Helpline:{" "}
                    <span style={{ fontWeight: 600, color: "rgba(253,251,247,0.90)" }}>24×7</span>{" "}
                    <span style={{ fontSize: "0.7rem", color: "rgba(207,164,98,0.70)" }}>(coming soon)</span>
                  </p>
                </div>

                {/* Email */}
                <div className="contact-row">
                  <FiMail className="contact-icon" size={15} />
                  <a href="mailto:swagrama.lavale@gmail.com" className="contact-link">
                    swagrama.lavale@gmail.com
                  </a>
                </div>

                {/* Community address */}
                <div className="contact-row">
                  <FiMapPin className="contact-icon" size={15} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.75rem", marginBottom: "3px", color: "rgba(253,251,247,0.90)" }}>
                      Community Village
                    </p>
                    <p>
                      SwaGrama Ayurveda Yoga Nature Agro Tourism, Near
                      Symbiosis University Women's Medical College, Next to
                      Lupin Company, Lavale – 412115, Pune, Maharashtra
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
                    <p style={{ fontWeight: 600, fontSize: "0.75rem", marginBottom: "3px", color: "rgba(253,251,247,0.90)" }}>
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
              <h4 className="footer-heading font-['Cinzel'] text-white text-sm font-bold mb-4">
                Find Us
              </h4>

              <div className="map-container" style={{ height: "175px", marginBottom: "10px" }}>
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

          </div>

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
