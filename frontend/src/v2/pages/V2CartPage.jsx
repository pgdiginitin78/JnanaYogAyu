import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import RadioField from "../../components/common/forms/RadioField";
import V2ModalShell, { FieldError } from "../components/V2ModalShell";
import { V2FormSection, V2SlotSelector } from "../components/V2FormControls";
import { SpotlightBentoCard, SectionHeader } from "../components/V2InteractiveComponents";
import { useV2Store } from "../context/v2Context";
import { v2CheckoutSchema } from "../validation/v2Schemas";

const PAYMENT_METHODS = [
  { id: "UPI / Digital", label: "UPI / Digital" },
  { id: "Card", label: "Debit / Credit Card" },
  { id: "Cash on Delivery", label: "Pay at Pickup / COD" },
];

const DELIVERY_WINDOW_CARDS = [
  {
    value: "Standard Courier (3-5 Working Days)",
    title: "Standard Courier Dispatch",
    time: "3 – 5 Working Days",
    availability: "Pan-India Open",
    note: "Insured Herbal Pack",
  },
  {
    value: "Morning Slot (09:00 AM - 01:00 PM)",
    title: "Morning Local Dispatch",
    time: "09:00 AM – 01:00 PM",
    availability: "Next-Day Window",
    note: "Pune & Sahyadri",
  },
  {
    value: "SwaGrama Dispensary Self Pickup",
    title: "SwaGrama Desk Pickup",
    time: "08:30 AM – 06:00 PM",
    availability: "Same-Day Ready",
    note: "Lavale Sanctuary",
  },
];

export default function V2CartPage() {
  const {
    state,
    currentUser,
    getDiscountPercent,
    getTierInfo,
    updateCartQty,
    removeFromCart,
    placeOrder,
  } = useV2Store();

  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const discountPercent = getDiscountPercent();
  const activeTier = currentUser
    ? getTierInfo(currentUser.membershipTier)
    : null;

  const subtotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const checkoutForm = useForm({
    resolver: yupResolver(v2CheckoutSchema),
    defaultValues: {
      fullName: currentUser?.name || "",
      phone: currentUser?.phone || "",
      alternatePhone: "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      state: "Maharashtra",
      landmark: "",
      pinCode: "",
      address: "",
      deliveryWindow: DELIVERY_WINDOW_CARDS[0].value,
      paymentMethod: "UPI / Digital",
      orderNotes: "",
    },
  });

  const watchedDeliveryWindow = useWatch({
    control: checkoutForm.control,
    name: "deliveryWindow",
  });

  const onSubmitCheckout = (values) => {
    const order = placeOrder({
      customerName: values.fullName,
      customerPhone: values.phone,
      alternatePhone: values.alternatePhone,
      email: values.email,
      addressLine1: values.address,
      landmark: values.landmark,
      city: values.city,
      state: values.state,
      pinCode: values.pinCode,
      deliveryWindow: values.deliveryWindow,
      orderNotes: values.orderNotes,
      address: `${values.address}, Near ${values.landmark}, ${values.city}, ${values.state} - ${values.pinCode}`,
      paymentMethod: values.paymentMethod,
    });
    if (order) {
      setConfirmedOrder(order);
    }
  };

  return (
    <div className="min-h-[82vh] bg-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8 2xl:px-14">
      <div className="w-full">
        <SectionHeader
          align="left"
          eyebrow="Cart & Tier Checkout"
          title="Your Wellness Provision Basket"
          subtitle={
            currentUser
              ? `Active Tier: ${activeTier?.name} (${discountPercent}% privilege applied at checkout)`
              : "Non-registered guests can complete purchase directly; sign in with an active pass to save up to 20%."
          }
        />

        {state.cart.length === 0 ? (
          <SpotlightBentoCard className="mt-10 p-10 text-center">
            <ShoppingCart className="h-10 w-10 text-[#C9A45C] mx-auto" />
            <h2 className="mt-4 font-serif text-2xl text-[#0f3d26]">
              Your Cart is Currently Empty
            </h2>
            <p className="mt-2 text-sm text-[#0f3d26]/70">
              Explore small-batch Ayurvedic formulations and Barter goods on Global AyurX.
            </p>
            <Link
              to="/v2/global-ayurx"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
            >
              <span>Shop Global AyurX</span>
              <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
            </Link>
          </SpotlightBentoCard>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              {state.cart.map((item) => (
                <SpotlightBentoCard
                  key={item.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-2xl border border-[#EDE5D5]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6534]">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-lg text-[#0f3d26]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#0f3d26]/75">
                        ₹{item.price.toLocaleString("en-IN")} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#0f3d26]/20 bg-[#FBF8F1] px-2.5 py-1">
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, item.qty - 1)}
                        className="p-1 text-[#0f3d26]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, item.qty + 1)}
                        className="p-1 text-[#0f3d26]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className="font-serif text-base font-bold text-[#0f3d26] w-20 text-right">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full p-2 text-[#8b6534] hover:bg-[#FAF5E8]"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </SpotlightBentoCard>
              ))}
            </div>

            <div className="lg:col-span-6">
              <SpotlightBentoCard className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#0f3d26]">
                    Shipping Details & Payment Summary
                  </h3>
                  <div className="mt-4 space-y-2.5 text-sm border-b border-[#EDE5D5] pb-4">
                    <div className="flex justify-between">
                      <span className="text-[#0f3d26]/70">Basket Subtotal</span>
                      <span className="font-semibold">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#8b6534]">
                      <span>Member Discount ({discountPercent}%)</span>
                      <span className="font-bold">
                        - ₹{discountAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between font-serif text-xl font-bold text-[#0f3d26] pt-2 border-t border-[#EDE5D5]">
                      <span>Net Total</span>
                      <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={checkoutForm.handleSubmit(onSubmitCheckout)}
                  className="space-y-4"
                >
                  <V2FormSection
                    step="01"
                    title="Recipient Identity & Contact"
                    hint="Tracking & Invoice"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <InputField
                          name="fullName"
                          label="Recipient Full Name *"
                          control={checkoutForm.control}
                          shrink
                          InputLabelProps={{ shrink: true }}
                          error={checkoutForm.formState.errors.fullName}
                        />
                        <FieldError error={checkoutForm.formState.errors.fullName} />
                      </div>
                      <div>
                        <InputField
                          name="email"
                          label="Email for Order Tracking *"
                          control={checkoutForm.control}
                          dontCapitalize
                          shrink
                          InputLabelProps={{ shrink: true }}
                          error={checkoutForm.formState.errors.email}
                        />
                        <FieldError error={checkoutForm.formState.errors.email} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <InputField
                          name="phone"
                          label="Primary Mobile *"
                          control={checkoutForm.control}
                          dontCapitalize
                          shrink
                          InputLabelProps={{ shrink: true }}
                          error={checkoutForm.formState.errors.phone}
                        />
                        <FieldError error={checkoutForm.formState.errors.phone} />
                      </div>
                      <div>
                        <InputField
                          name="alternatePhone"
                          label="Alternate Contact (Optional)"
                          control={checkoutForm.control}
                          dontCapitalize
                          shrink
                          InputLabelProps={{ shrink: true }}
                          error={checkoutForm.formState.errors.alternatePhone}
                        />
                        <FieldError error={checkoutForm.formState.errors.alternatePhone} />
                      </div>
                    </div>
                  </V2FormSection>

                  <V2FormSection
                    step="02"
                    title="Delivery Address & Landmark"
                    hint="Dispensary Fulfillment"
                  >
                    <div>
                      <InputArea
                        name="address"
                        label="Full Street / House Address *"
                        placeholder="House / Flat no., society, street road..."
                        control={checkoutForm.control}
                        minRows={2}
                      />
                      <FieldError error={checkoutForm.formState.errors.address} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <InputField
                          name="landmark"
                          label="Nearby Landmark *"
                          control={checkoutForm.control}
                          shrink
                          InputLabelProps={{ shrink: true }}
                          error={checkoutForm.formState.errors.landmark}
                        />
                        <FieldError error={checkoutForm.formState.errors.landmark} />
                      </div>
                      <div>
                        <InputField
                          name="pinCode"
                          label="6-Digit PIN Code *"
                          control={checkoutForm.control}
                          dontCapitalize
                          shrink
                          InputLabelProps={{ shrink: true }}
                          error={checkoutForm.formState.errors.pinCode}
                        />
                        <FieldError error={checkoutForm.formState.errors.pinCode} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <InputField
                          name="city"
                          label="City / Town *"
                          control={checkoutForm.control}
                          shrink
                          InputLabelProps={{ shrink: true }}
                          error={checkoutForm.formState.errors.city}
                        />
                        <FieldError error={checkoutForm.formState.errors.city} />
                      </div>
                      <div>
                        <InputField
                          name="state"
                          label="State *"
                          control={checkoutForm.control}
                          shrink
                          InputLabelProps={{ shrink: true }}
                          error={checkoutForm.formState.errors.state}
                        />
                        <FieldError error={checkoutForm.formState.errors.state} />
                      </div>
                    </div>
                  </V2FormSection>

                  <V2FormSection
                    step="03"
                    title="Delivery Slot & Payment Method"
                    hint="Final Confirmation"
                  >
                    <V2SlotSelector
                      label="Select Dispatch / Pickup Slot *"
                      value={watchedDeliveryWindow}
                      onChange={(val) =>
                        checkoutForm.setValue("deliveryWindow", val, {
                          shouldValidate: true,
                        })
                      }
                      slots={DELIVERY_WINDOW_CARDS}
                      error={checkoutForm.formState.errors.deliveryWindow}
                    />

                    <div>
                      <RadioField
                        name="paymentMethod"
                        label="Select Payment Method *"
                        control={checkoutForm.control}
                        dataArray={PAYMENT_METHODS}
                        error={checkoutForm.formState.errors.paymentMethod}
                      />
                    </div>

                    <div>
                      <InputField
                        name="orderNotes"
                        label="Courier Instructions (Optional)"
                        control={checkoutForm.control}
                        shrink
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>
                  </V2FormSection>

                  <CommonButton
                    type="submit"
                    label={`Place Order · ₹${finalTotal.toLocaleString("en-IN")}`}
                    className="w-full !rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
                  />
                </form>
              </SpotlightBentoCard>
            </div>
          </div>
        )}
      </div>

      <V2ModalShell
        open={Boolean(confirmedOrder)}
        onClose={() => setConfirmedOrder(null)}
        badge="Order Confirmed"
        title={`Thank You, ${confirmedOrder?.customerName || "Member"}!`}
        subtitle={`Reference ID: ${confirmedOrder?.id || ""}`}
        maxWidthClass="lg"
      >
        {confirmedOrder && (
          <div className="space-y-4 text-center py-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6efea] text-[#0f3d26]">
              <CheckCircle2 className="h-8 w-8 text-[#C9A45C]" />
            </div>
            <p className="text-sm text-[#0f3d26]/80">
              Total Paid:{" "}
              <span className="font-bold text-[#0f3d26]">
                ₹{confirmedOrder.total.toLocaleString("en-IN")}
              </span>{" "}
              (Saved ₹{confirmedOrder.discountAmount.toLocaleString("en-IN")})
            </p>
            <p className="text-xs text-[#0f3d26]/70">
              Delivering to: {confirmedOrder.address}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              {currentUser ? (
                <Link
                  to="/v2/dashboard"
                  onClick={() => setConfirmedOrder(null)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                >
                  <span>View Order in Dashboard</span>
                  <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
                </Link>
              ) : (
                <CommonButton
                  onClick={() => setConfirmedOrder(null)}
                  label="Done"
                  className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
                />
              )}
            </div>
          </div>
        )}
      </V2ModalShell>
    </div>
  );
}
