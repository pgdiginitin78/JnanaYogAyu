import * as yup from "yup";

const dropdownNullable = yup.mixed().nullable();
const dropdownRequired = (message) =>
  yup
    .mixed()
    .nullable()
    .test("required", message, (val) => {
      if (!val) return false;
      if (typeof val === "string") return val.trim().length > 0;
      if (typeof val === "object") {
        return Boolean(val.value || val.label);
      }
      return true;
    });

export const membershipSchema = yup.object({
  // Step 1: Personal Information
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required"),
  fullName: yup.string().nullable(),
  dob: yup.mixed().nullable(),
  gender: dropdownNullable,
  mobile: yup
    .string()
    .trim()
    .required("Mobile number is required"),
  whatsapp: yup.string().nullable(),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  city: yup
    .string()
    .trim()
    .required("City is required"),
  state: yup.string().nullable(),
  pincode: yup.string().nullable(),
  country: yup.string().default("India"),

  // Step 2: Professional Information
  profession: yup.string().nullable(),
  organisation: yup.string().nullable(),
  background: yup.string().nullable(),
  interests: yup.array().of(yup.string()).default([]),

  // Step 3: Membership Selection
  membershipOption: dropdownRequired("Please select your preferred membership plan"),

  // Step 4: Additional Information
  accessSelections: yup.array().of(yup.string()).default([]),
  modeOfParticipation: yup
    .string()
    .required("Please select your preferred mode of participation")
    .default("Both"),
  ecosphereSeason: dropdownNullable,
  ecosphereResidential: dropdownNullable,
  entranceExamApplied: yup.boolean().default(false),
  academyInterest: yup.string().nullable(),

  // Step 5: Declaration
  declaration1: yup.boolean().oneOf([true], "Must confirm"),
  declaration2: yup.boolean().oneOf([true], "Must confirm"),
  declaration3: yup.boolean().oneOf([true], "Must confirm"),
  declaration4: yup.boolean().oneOf([true], "Must confirm"),
  declarations: yup.array().of(yup.string()).default([]),
});

export const defaultFormValues = {
  firstName: "",
  lastName: "",
  fullName: "",
  dob: null,
  gender: null,
  mobile: "",
  whatsapp: "",
  email: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  profession: "",
  organisation: "",
  background: "",
  interests: [],
  membershipOption: "शतायुस्World Life Membership – ₹500",
  accessSelections: [],
  modeOfParticipation: "Both",
  ecosphereSeason: null,
  ecosphereResidential: null,
  entranceExamApplied: false,
  academyInterest: "",
  declaration1: true,
  declaration2: true,
  declaration3: true,
  declaration4: true,
  declarations: [
    "I confirm that the information provided above is accurate.",
    "I have read and understood the membership terms and conditions.",
    "I agree to abide by JYA membership policies and programme-specific guidelines.",
    "I consent to receiving membership-related communications from JYA.",
  ],
};
