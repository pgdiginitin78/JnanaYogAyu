import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiExternalLink,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiGrid,
  FiYoutube,
} from "react-icons/fi";
import verticalLogo from "../../assets/images/brand/vertical-logo.webp";
import { CONTACT_DETAILS, V2_NAV_MENUS } from "../data/v2Data";
import { useV2Store } from "../context/v2Context";

const SOCIAL_ICON_MAP = {
  Instagram: FiInstagram,
  Facebook: FiFacebook,
  YouTube: FiYoutube,
};

function V2Footer() {
  const { currentUser } = useV2Store();

  return (
    <footer className="bg-gradient-to-b from-[#0f3d26] to-[#071E14] text-ivory relative overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent" />
      <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#C9A45C]/20">
          <div className="flex flex-col items-start gap-4">
            <div className="rounded-2xl border border-[#C9A45C]/25 bg-white/5 p-5 flex flex-col items-center gap-3 w-full sm:w-64">
              <img
                src={verticalLogo}
                alt="JnanaYogAyu Logo"
                className="w-36 h-auto object-contain"
              />
              <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#C9A45C] text-center">
                Ayurveda · Yoga · Nature · Wisdom for Wellbeing
              </p>
            </div>
            <p className="font-sans text-xs text-ivory/75 leading-relaxed">
              Rooted in Bharatiya Chikitsa, living the Swagrama natural rhythm,
              and guiding conscious preventive wellbeing.
            </p>
            <div className="flex items-center gap-2.5">
              {(CONTACT_DETAILS.socials || []).map((soc) => {
                const IconComp = SOCIAL_ICON_MAP[soc.label] || FiExternalLink;
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A45C]/35 bg-white/5 text-[#E7D7B5] hover:bg-[#C9A45C] hover:text-[#071E14] transition-colors"
                  >
                    <IconComp className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#C9A45C] hover:text-white transition-colors"
            >
              View Classic Site (V1) <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">
              Explore JYA
            </h4>
            <ul className="space-y-2.5">
              {V2_NAV_MENUS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="font-sans text-xs text-ivory/75 hover:text-[#C9A45C] transition-colors inline-flex items-center gap-1.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">
              Ecosystem Pillars
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-ivory/75">
              <li>
                <Link
                  to="/v2/global-ayurx"
                  className="hover:text-[#C9A45C] transition-colors"
                >
                  Healthcare: OPD, IPD, Clinic & Patient Camps
                </Link>
              </li>
              <li>
                <Link
                  to="/v2/global-ayurx"
                  className="hover:text-[#C9A45C] transition-colors"
                >
                  Global AyurX: Ayurmitra, Digital Solutions & E-Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/v2/global-ayurx"
                  className="hover:text-[#C9A45C] transition-colors"
                >
                  Barter Goods Exchange Network
                </Link>
              </li>
              <li>
                <Link
                  to="/v2/ecosphere"
                  className="hover:text-[#C9A45C] transition-colors"
                >
                  Academy: Seasonal, Root Healers & Ecosphere
                </Link>
              </li>
              <li>
                <Link
                  to="/v2/ecosphere"
                  className="hover:text-[#C9A45C] transition-colors"
                >
                  SwaGrama Village Enquiry & Business Model Visit
                </Link>
              </li>
              <li>
                <Link
                  to="/v2/insight"
                  className="hover:text-[#C9A45C] transition-colors"
                >
                  Upcoming Events, Lectures & Insights
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">
              Reach SwaGrama & Office
            </h4>
            <div className="space-y-3 font-sans text-xs text-ivory/75">
              <div className="flex items-start gap-2.5">
                <FiPhone className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory">
                    WhatsApp ({CONTACT_DETAILS.whatsappHours})
                  </p>
                  <p>{CONTACT_DETAILS.whatsappNumbers}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FiPhone className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <p>{CONTACT_DETAILS.helplineText}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <FiMail className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="hover:text-[#C9A45C] transition-colors"
                >
                  {CONTACT_DETAILS.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <FiMapPin className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory">Community Village</p>
                  <p>{CONTACT_DETAILS.communityAddress}</p>
                  <a
                    href={CONTACT_DETAILS.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#C9A45C] hover:text-white"
                  >
                    <FiExternalLink className="h-3 w-3" /> View on Maps
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FiMapPin className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ivory">Office</p>
                  <p>{CONTACT_DETAILS.officeAddress}</p>
                  <a
                    href={CONTACT_DETAILS.officeMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#C9A45C] hover:text-white"
                  >
                    <FiExternalLink className="h-3 w-3" /> View Office &amp; Parking Map
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#C9A45C]/20 flex flex-col gap-2">
              <Link
                to="/v2/membership"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 font-sans text-xs font-bold text-[#071E14] hover:bg-[#E7D7B5] transition-colors"
              >
                <span>Join JYA Community</span>
                <FiArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to={currentUser ? "/v2/dashboard" : "/v2/login"}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-6 py-2.5 font-sans text-xs font-bold text-[#FAF5E8] hover:bg-[#C9A45C] hover:text-[#071E14] transition-colors"
              >
                <FiGrid className="h-3.5 w-3.5" />
                {currentUser ? "Open User Dashboard" : "Sign In / User Portal"}
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-sans text-ivory/55">
          <p>© {new Date().getFullYear()} JnanaYogAyu Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacyAndPolicy" className="hover:text-[#C9A45C] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#C9A45C]/80">User Experience Showcase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default V2Footer;
