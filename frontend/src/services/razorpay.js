/**
 * Common Razorpay Payment Gateway Utility for JnanaYogAyu
 * Reusable across the whole project for memberships, courses, consultations, and services.
 */

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

/**
 * Dynamically loads the Razorpay checkout script if not already present.
 * @returns {Promise<boolean>}
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    // If Razorpay is already available on window
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Check if script tag is already in DOM
    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Opens Razorpay checkout modal
 * @param {Object} config
 * @param {number} config.amount - Amount in INR (e.g. 500 for ₹500)
 * @param {string} [config.name] - Company or App Name (defaults to "JnanaYogAyu")
 * @param {string} [config.description] - Transaction description
 * @param {string} [config.currency] - Currency code (defaults to "INR")
 * @param {string} [config.key] - Razorpay Key ID (defaults to env or test key)
 * @param {Object} [config.prefill] - { name, email, contact }
 * @param {Object} [config.notes] - Custom metadata
 * @param {Function} [config.onSuccess] - Callback on payment success (receives response)
 * @param {Function} [config.onFailure] - Callback on payment failure or modal dismiss
 * @param {string} [config.themeColor] - Hex color for modal header (defaults to #103F2E)
 */
export const openRazorpayPayment = async ({
  amount = 0,
  name = "JnanaYogAyu",
  description = "Membership Registration Fee",
  currency = "INR",
  key = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_Twn2C3nZTbfE57",
  prefill = {},
  notes = {},
  onSuccess = () => {},
  onFailure = () => {},
  themeColor = "#103F2E",
  image = "",
}) => {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded || typeof window.Razorpay === "undefined") {
    alert("Unable to initialize payment gateway. Please check your internet connection.");
    if (onFailure) onFailure(new Error("Razorpay SDK failed to load"));
    return;
  }

  // Razorpay expects amount in smallest currency sub-unit (paise for INR)
  const amountInPaise = Math.round(Number(amount) * 100);

  // Validate contact: Razorpay requires 10 digits; omit if incomplete so Razorpay prompts cleanly
  const rawContact = String(prefill.contact || prefill.mobile || "").replace(/\D/g, "");
  const validContact = rawContact.length >= 10 ? rawContact.slice(-10) : undefined;

  const prefillData = {
    name: prefill.name || "",
    email: prefill.email || "",
  };
  if (validContact) {
    prefillData.contact = validContact;
  }

  const options = {
    key: key,
    amount: amountInPaise,
    currency: currency,
    name: name,
    description: description,
    image: image || undefined,
    prefill: prefillData,
    notes: {
      ...notes,
      platform: "JnanaYogAyu Web",
    },
    theme: {
      color: themeColor,
    },
    handler: function (response) {
      if (onSuccess) {
        onSuccess({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          amount: amount,
        });
      }
    },
    modal: {
      ondismiss: function () {
        if (onFailure) {
          onFailure({ status: "dismissed", message: "Payment cancelled by user" });
        }
      },
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.error("Razorpay payment failed:", response.error);
      if (onFailure) {
        onFailure(response.error);
      }
    });
    rzp.open();
  } catch (err) {
    console.error("Error opening Razorpay checkout:", err);
    if (onFailure) onFailure(err);
  }
};

export default openRazorpayPayment;
