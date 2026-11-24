import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Heart, Lock, ShoppingCart, Trash2 } from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import { SpotlightBentoCard, SectionHeader } from "../components/V2InteractiveComponents";
import {
  ECOSPHERE_CALENDAR,
  SEASONAL_ACADEMIES,
  WELLNESS_SERVICES,
} from "../data/v2Data";
import { useV2Store } from "../context/v2Context";

export default function V2WishlistPage() {
  const navigate = useNavigate();
  const {
    state,
    currentUser,
    toggleWishlist,
    addToCart,
    setPendingAuthIntent,
    getDiscountPercent,
  } = useV2Store();

  const discountPercent = getDiscountPercent();

  if (!currentUser) {
    return (
      <div className="min-h-[75vh] bg-[#FDFBF7] flex items-center justify-center px-4 sm:px-6 lg:px-8 2xl:px-14">
        <SpotlightBentoCard className="w-full sm:w-[540px] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6efea] text-[#0f3d26]">
            <Lock className="h-6 w-6 text-[#C9A45C]" />
          </div>
          <h1 className="mt-4 font-serif text-3xl text-[#0f3d26]">
            Sign In to View Saved Wishlist
          </h1>
          <p className="mt-2 text-sm text-[#0f3d26]/70">
            Wishlist synchronizes saved healthcare clinics, herbal remedies, and academy cohorts inside your account.
          </p>
          <CommonButton
            onClick={() => {
              setPendingAuthIntent({
                type: "navigate",
                returnTo: "/v2/wishlist",
              });
              navigate("/v2/login");
            }}
            label="Sign In / Create Free Account"
            className="mt-6 !rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
          />
        </SpotlightBentoCard>
      </div>
    );
  }

  const allCatalog = [
    ...state.listings,
    ...WELLNESS_SERVICES,
    ...SEASONAL_ACADEMIES.map((a) => ({
      ...a,
      title: a.name,
      price: a.fee,
      type: "academy",
    })),
    ...ECOSPHERE_CALENDAR.map((b) => ({
      ...b,
      title: `${b.season} EcoSphere Cohort (${b.dates})`,
      price: 112000,
      type: "academy",
    })),
  ];

  const savedIds = state.wishlist
    .filter((w) => w.userId === currentUser.id)
    .map((w) => w.itemId);

  const savedItems = savedIds
    .map((id) => allCatalog.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-[80vh] bg-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8 2xl:px-14">
      <div className="w-full">
        <SectionHeader
          align="left"
          eyebrow="Personal Collection"
          title="Your Saved Wishlist"
          subtitle="Move herbal goods to cart or jump straight back into your saved clinics & seasonal academies."
        />

        {savedItems.length === 0 ? (
          <SpotlightBentoCard className="mt-10 p-10 text-center">
            <Heart className="h-10 w-10 text-[#C9A45C] mx-auto" />
            <h2 className="mt-4 font-serif text-2xl text-[#0f3d26]">
              Your Wishlist is Empty
            </h2>
            <p className="mt-2 text-sm text-[#0f3d26]/70">
              Tap the heart icon on any E-Shop remedy, clinic consultation, or academy batch to save it here.
            </p>
            <Link
              to="/v2/global-ayurx"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
            >
              <span>Browse Global AyurX</span>
              <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
            </Link>
          </SpotlightBentoCard>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((item) => {
              const basePrice = Number(item.price) || 0;
              const finalPrice = Math.round(
                basePrice * (1 - discountPercent / 100)
              );
              return (
                <SpotlightBentoCard key={item.id} className="overflow-hidden flex flex-col">
                  {item.image && (
                    <div className="aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0f3d26]">
                        {item.category || item.type || "Saved Item"}
                      </span>
                      <h3 className="mt-3 font-serif text-xl text-[#0f3d26]">
                        {item.title}
                      </h3>
                      {basePrice > 0 && (
                        <p className="mt-2 font-serif text-lg font-bold text-[#0f3d26]">
                          ₹{finalPrice.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#EDE5D5] flex items-center justify-between gap-2">
                      {(item.type === "product" || item.type === "barter") ? (
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>Move to Cart</span>
                        </button>
                      ) : (
                        <Link
                          to={
                            item.type === "academy"
                              ? "/v2/shatayush-world"
                              : "/v2/global-ayurx"
                          }
                          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                        >
                          <span>View Programme</span>
                          <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleWishlist(item.id)}
                        className="rounded-full border border-[#0f3d26]/20 p-2 text-[#8b6534] hover:bg-[#FAF5E8]"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </SpotlightBentoCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
