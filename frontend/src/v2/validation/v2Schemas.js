import * as yup from "yup";

const dropdownRequired = (message) =>
  yup
    .mixed()
    .nullable()
    .test("dropdown-required", message, (val) => {
      if (!val) return false;
      if (typeof val === "string") return val.trim().length > 0;
      if (typeof val === "object") {
        return Boolean(val.value || val.label);
      }
      return false;
    });

export const getDropdownValue = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val.value || val.label || "";
};

const phoneRegex = /^[0-9+\-\s()]{10,15}$/;

export const v2LoginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const v2ForgotPasswordEmailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Enter your registered email address")
    .required("Registered email is required"),
});

export const v2ForgotPasswordResetSchema = yup.object().shape({
  otp: yup
    .string()
    .trim()
    .matches(/^[0-9]{6}$/, "Enter the 6-digit verification OTP sent to your email")
    .required("Email verification OTP is required"),
  newPassword: yup
    .string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm your new password"),
});

export const v2SignUpSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Enter your full name (at least 2 characters)")
    .required("Full name is required"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter a valid 10-digit mobile / WhatsApp number")
    .required("Mobile number is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter your current city")
    .required("City is required"),
  primaryInterest: dropdownRequired("Select your primary ecosystem interest"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "Please agree to JYA Terms & Privacy Guidelines"),
});

export const v2EnquirySchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Enter your full name")
    .required("Full name is required"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter a valid 10-digit phone or WhatsApp number")
    .required("Phone / WhatsApp number is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required for detailed response"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter your city or town")
    .required("City is required"),
  callbackMode: dropdownRequired("Choose how you prefer our team to reach out"),
  callbackSlot: yup
    .string()
    .trim()
    .required("Select an open callback slot"),
  interest: dropdownRequired("Please select an area of interest"),
  message: yup
    .string()
    .trim()
    .min(10, "Please share at least 10 characters describing your requirement")
    .required("Detailed enquiry note is required"),
});

export const v2BookingSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Enter patient full name")
    .required("Patient full name is required"),
  age: yup
    .number()
    .typeError("Enter patient age")
    .min(1, "Enter valid age")
    .max(115, "Enter valid age under 115")
    .required("Patient age is required"),
  gender: dropdownRequired("Select patient gender"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter a valid contact number")
    .required("Phone number is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required for booking confirmation"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter patient city")
    .required("City is required"),
  consultationMode: yup
    .string()
    .required("Choose consultation format"),
  preferredDate: yup
    .date()
    .nullable()
    .typeError("Select a valid consultation date")
    .required("Preferred date is required"),
  slot: yup
    .string()
    .trim()
    .required("Choose an open consultation slot"),
  doshaCategory: dropdownRequired("Select primary clinical concern category"),
  medications: yup.string().trim().notRequired(),
  concern: yup
    .string()
    .trim()
    .min(10, "Describe your symptoms and duration (min 10 characters)")
    .required("Health symptoms & duration required for Vaidya review"),
  clinicalConsent: yup
    .boolean()
    .oneOf([true], "Confirm consent for Ayurvedic Vaidya intake review"),
});

export const v2DigitalClinicSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Enter Vaidya / director name")
    .required("Full name is required"),
  clinicName: yup
    .string()
    .trim()
    .min(2, "Enter clinic or hospital name")
    .required("Clinic / organization name is required"),
  role: dropdownRequired("Select your organizational role"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter valid contact number")
    .required("Phone number is required"),
  email: yup
    .string()
    .trim()
    .email("Enter official email address")
    .required("Email address is required"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter city and state")
    .required("City is required"),
  teamSize: dropdownRequired("Select clinic team size"),
  interest: dropdownRequired("Select Global AyurX module"),
  message: yup
    .string()
    .trim()
    .min(10, "Describe your clinic workflows and expectations")
    .required("Requirements note is required"),
});

export const v2SwagramVisitSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Enter lead visitor full name")
    .required("Visitor full name is required"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter valid phone / WhatsApp number")
    .required("Phone number is required"),
  email: yup
    .string()
    .trim()
    .email("Enter valid email address")
    .required("Email is required for pass dispatch"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter city of origin")
    .required("City is required"),
  organisation: yup.string().trim().notRequired(),
  visitDate: yup
    .date()
    .nullable()
    .typeError("Choose a valid visit date")
    .required("Preferred visit date is required"),
  businessModel: dropdownRequired("Select a Swagram experience track"),
  visitPurpose: dropdownRequired("Select primary purpose of visit"),
  arrivalSlot: yup
    .string()
    .trim()
    .required("Select an open arrival slot"),
  guests: yup
    .number()
    .typeError("Enter visitor count")
    .min(1, "At least 1 visitor")
    .max(20, "Maximum 20 visitors per booking")
    .required("Visitor count is required"),
  dietaryNotes: yup.string().trim().notRequired(),
});

export const v2CheckoutSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(2, "Enter recipient full name")
    .required("Recipient name is required"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter a valid delivery contact number")
    .required("Primary mobile is required"),
  alternatePhone: yup
    .string()
    .trim()
    .test(
      "alt-phone",
      "Enter a valid alternate number or leave blank",
      (val) => !val || phoneRegex.test(val)
    ),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email for GST invoice & tracking")
    .required("Email address is required"),
  address: yup
    .string()
    .trim()
    .min(10, "Enter complete house no., street, and locality")
    .required("Delivery address is required"),
  landmark: yup
    .string()
    .trim()
    .min(2, "Enter nearby landmark")
    .required("Landmark is required"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter city or village")
    .required("City is required"),
  state: yup
    .string()
    .trim()
    .min(2, "Enter state")
    .required("State is required"),
  pinCode: yup
    .string()
    .trim()
    .matches(/^[1-9][0-9]{5}$/, "Enter valid 6-digit Indian PIN code")
    .required("PIN code is required"),
  deliveryWindow: yup
    .string()
    .trim()
    .required("Select preferred delivery window"),
  paymentMethod: yup.string().required("Select a payment method"),
  orderNotes: yup.string().trim().notRequired(),
});

export const v2BarterListingSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, "Enter goods or harvest title")
    .required("Item title is required"),
  category: dropdownRequired("Choose goods category"),
  tradeType: yup
    .string()
    .trim()
    .required("Select whether item is for Sell & Barter, Barter Only, or Direct Sale"),
  conditionGrade: dropdownRequired("Select batch condition / authenticity grade"),
  originLocation: yup
    .string()
    .trim()
    .min(2, "Enter farm / workshop village or city")
    .required("Origin location is required"),
  pinCode: yup
    .string()
    .trim()
    .matches(/^[1-9][0-9]{5}$/, "Enter valid 6-digit Indian PIN code")
    .required("Origin PIN code is required for logistics verification"),
  sellerPhone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter valid seller mobile / WhatsApp number")
    .required("Seller contact number is required"),
  harvestDate: yup
    .date()
    .nullable()
    .typeError("Select batch harvest / preparation date")
    .required("Preparation / harvest date is required"),
  quantityLabel: yup
    .string()
    .trim()
    .min(2, "Specify available quantity and unit (e.g. 5 kg, 6 bottles)")
    .required("Available quantity is required"),
  shelfLife: yup
    .string()
    .trim()
    .min(2, "Specify shelf life or durability (e.g. 12 Months / Non-perishable)")
    .required("Shelf life / durability is required"),
  purityStandard: dropdownRequired("Select purity / natural preparation standard"),
  exchangeMode: yup.string().required("Choose exchange logistics mode"),
  packagingDetails: yup
    .string()
    .trim()
    .min(4, "Specify packaging material (e.g. Amber Glass Jar, Linen Pouch)")
    .required("Packaging specification is required"),
  want: yup
    .string()
    .trim()
    .when("tradeType", {
      is: (val) => val !== "Direct Sale",
      then: (schema) =>
        schema
          .min(4, "Specify clearly what goods you seek in exchange")
          .required("Preferred exchange goods are required for barter listings"),
      otherwise: (schema) => schema.notRequired(),
    }),
  valueLabel: yup
    .number()
    .typeError("Enter numeric selling / barter price in INR")
    .min(100, "Minimum value ₹100")
    .max(500000, "Enter realistic selling or barter value")
    .required("Selling / estimated barter value is required"),
  imageUrl: yup
    .string()
    .trim()
    .required("Please upload a clear photo of your product or harvest"),
  description: yup
    .string()
    .trim()
    .min(12, "Describe preparation purity, ingredients, and storage notes")
    .required("Detailed description is required"),
  acceptPolicy: yup
    .boolean()
    .oneOf([true], "Confirm authentic chemical-free guidelines & admin verification"),
});

export const v2BarterOfferSchema = yup.object().shape({
  offeredItem: yup
    .string()
    .trim()
    .min(3, "Specify the good or harvest you are offering")
    .required("Offered item name is required"),
  offeredCondition: dropdownRequired("Select quality / batch condition of your item"),
  offeredQuantity: yup
    .string()
    .trim()
    .min(2, "Specify quantity and packaging (e.g. 2 kg jar)")
    .required("Offered quantity is required"),
  estimatedValue: yup
    .number()
    .typeError("Enter numeric estimated value")
    .min(100, "Minimum offered value ₹100")
    .required("Estimated offered value is required"),
  fulfillmentMode: dropdownRequired("Choose pickup or exchange method"),
  proposedDate: yup
    .date()
    .nullable()
    .typeError("Select proposed exchange date")
    .required("Proposed exchange date is required"),
  pickupCity: yup
    .string()
    .trim()
    .min(2, "Enter your city or dispatch hub")
    .required("Pickup / dispatch city is required"),
  contactPhone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter valid coordinator contact number")
    .required("Phone number is required"),
  message: yup
    .string()
    .trim()
    .min(10, "Provide pickup location & quality details for the owner")
    .required("Exchange note is required"),
});

export const v2EventRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Enter attendee full name")
    .required("Full name is required"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter a valid phone / WhatsApp number")
    .required("Phone number is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email for event pass")
    .required("Email is required"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter your city")
    .required("City is required"),
  attendeeType: dropdownRequired("Select your attendee category"),
  seats: yup
    .number()
    .typeError("Enter seat count")
    .min(1, "Minimum 1 seat")
    .max(10, "Maximum 10 seats per booking")
    .required("Seat count is required"),
  speakerQuestion: yup.string().trim().notRequired(),
});

export const v2MuktikhelaPlayerSchema = yup.object().shape({
  playerName: yup
    .string()
    .trim()
    .min(2, "Enter participant full name")
    .required("Participant name is required"),
  relation: dropdownRequired("Select relationship"),
  dob: yup
    .date()
    .nullable()
    .typeError("Select valid date of birth")
    .required("Date of birth is required"),
  gender: dropdownRequired("Select gender"),
  heightCm: yup
    .number()
    .typeError("Enter height in cm")
    .min(80, "Height must be between 80–240 cm")
    .max(240, "Height must be between 80–240 cm")
    .required("Height (cm) is required for BMI"),
  weightKg: yup
    .number()
    .typeError("Enter weight in kg")
    .min(15, "Weight must be between 15–220 kg")
    .max(220, "Weight must be between 15–220 kg")
    .required("Weight (kg) is required for BMI"),
  profession: yup
    .string()
    .trim()
    .min(2, "Enter daily profession or lifestyle role")
    .required("Profession / lifestyle role is required"),
  sleepHours: dropdownRequired("Select average nightly sleep duration"),
  dietType: dropdownRequired("Select primary dietary rhythm"),
  existingCondition: yup.string().trim().notRequired(),
  confidentialAccepted: yup
    .boolean()
    .oneOf([true], "Consent required for confidential encrypted storage"),
});

export const v2MembershipEnrollmentSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .trim()
    .min(2, "Last name is required")
    .required("Last name is required"),
  dob: yup
    .date()
    .nullable()
    .typeError("Select valid date of birth")
    .required("Date of birth is required"),
  gender: dropdownRequired("Select gender"),
  mobile: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter valid mobile number")
    .required("Mobile number is required"),
  whatsapp: yup
    .string()
    .trim()
    .test(
      "whatsapp-check",
      "Enter valid WhatsApp number or leave blank",
      (val) => !val || phoneRegex.test(val)
    ),
  email: yup
    .string()
    .trim()
    .email("Enter valid email address")
    .required("Email is required"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter city")
    .required("City is required"),
  state: yup
    .string()
    .trim()
    .min(2, "Enter state")
    .required("State is required"),
  addressLine: yup
    .string()
    .trim()
    .min(8, "Enter complete residential address for pass kit dispatch")
    .required("Residential address is required"),
  pinCode: yup
    .string()
    .trim()
    .matches(/^[1-9][0-9]{5}$/, "Enter valid 6-digit Indian PIN code")
    .required("PIN code is required"),
  householdSize: dropdownRequired("Select family / household members covered"),
  primaryFocus: dropdownRequired("Select primary wellness or learning focus"),
  emergencyName: yup
    .string()
    .trim()
    .min(2, "Enter emergency contact name")
    .required("Emergency contact name is required"),
  emergencyPhone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter valid emergency contact number")
    .required("Emergency contact phone is required"),
  paymentMethod: yup
    .string()
    .required("Select your membership payment mode"),
  profession: yup
    .string()
    .trim()
    .min(2, "Enter profession or background")
    .required("Profession is required"),
  organisation: yup.string().trim().notRequired(),
  modeOfParticipation: yup
    .string()
    .required("Select preferred participation mode"),
  preferredSeason: dropdownRequired("Select preferred seasonal academy cohort"),
  requirePractitioner: yup.boolean().default(false),
  credentials: yup
    .string()
    .trim()
    .when("requirePractitioner", {
      is: true,
      then: (schema) =>
        schema
          .min(4, "Enter BAMS / NCISM Registration No")
          .required("Practitioner registration number is required for GlobalAyurX"),
      otherwise: (schema) => schema.notRequired(),
    }),
  specialty: yup
    .mixed()
    .nullable()
    .when("requirePractitioner", {
      is: true,
      then: (schema) =>
        schema.test("spec-req", "Select clinical specialization", (val) =>
          Boolean(val && (val.value || val.label))
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
  goal: yup
    .string()
    .trim()
    .min(8, "Share your key wellness or learning goal")
    .required("Goal note is required"),
  declarationAccurate: yup
    .boolean()
    .oneOf([true], "Confirm submitted details are true and accurate"),
  declarationPolicy: yup
    .boolean()
    .oneOf([true], "Accept JYA Membership terms and community guidelines"),
});

export const v2EntranceExamSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Enter candidate full name")
    .required("Full name is required"),
  dob: yup
    .date()
    .nullable()
    .typeError("Select valid date of birth")
    .required("Date of birth is required"),
  gender: dropdownRequired("Select gender"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter valid 10-digit mobile number")
    .required("Phone number is required"),
  email: yup
    .string()
    .trim()
    .email("Enter valid email address")
    .required("Email address is required"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter city and state")
    .required("City is required"),
  background: dropdownRequired("Select academic / practitioner background"),
  qualification: yup
    .string()
    .trim()
    .min(2, "Enter highest degree or qualification")
    .required("Qualification is required"),
  residentialMode: yup
    .string()
    .required("Select preferred Gurukul residential commitment"),
  evaluationSlot: yup
    .string()
    .trim()
    .required("Select an open admission orientation / review slot"),
  statement: yup
    .string()
    .trim()
    .min(15, "Write at least 15 characters on why you wish to join the Gurukul")
    .required("Statement of purpose is required"),
  declarationExam: yup
    .boolean()
    .oneOf([true], "Confirm independent admission submission"),
});

export const v2ProfileUpdateSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Enter your full name")
    .required("Full name is required"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Enter valid 10-digit phone or WhatsApp number")
    .required("Mobile / WhatsApp number is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter your current city")
    .required("City is required"),
  state: yup.string().trim().notRequired(),
  addressLine: yup.string().trim().notRequired(),
  pinCode: yup
    .string()
    .trim()
    .test(
      "pin-check",
      "Enter valid 6-digit Indian PIN code or leave blank",
      (val) => !val || /^[1-9][0-9]{5}$/.test(val)
    ),
  householdSize: yup.string().trim().notRequired(),
  primaryFocus: yup.string().trim().notRequired(),
  emergencyName: yup.string().trim().notRequired(),
  emergencyPhone: yup
    .string()
    .trim()
    .test(
      "emg-phone",
      "Enter valid emergency number or leave blank",
      (val) => !val || phoneRegex.test(val)
    ),
  goal: yup.string().trim().notRequired(),
});

export const v2RejectReasonSchema = yup.object().shape({
  reason: yup
    .string()
    .trim()
    .min(8, "Enter a clear verification reason (at least 8 characters) for the seller")
    .required("Rejection reason is required before returning to seller"),
});
