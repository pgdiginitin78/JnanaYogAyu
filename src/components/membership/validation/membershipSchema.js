import * as yup from "yup";

export const membershipSchema = yup.object({
  // Step 1: Personal Information
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  dob: yup.mixed().nullable(),
  gender: yup.string().nullable(),
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
  country: yup.string().default("India"),

  // Step 2: Professional Information
  profession: yup.string().nullable(),
  organisation: yup.string().nullable(),
  background: yup.string().nullable(),
  interests: yup.array().of(yup.string()).default([]),

  // Step 3: Membership Selection
  membershipOption: yup
    .string()
    .required("Please select your preferred membership plan"),

  // Step 4: Additional Information
  accessSelections: yup.array().of(yup.string()).default([]),
  modeOfParticipation: yup
    .string()
    .required("Please select your preferred mode of participation")
    .default("Both"),
  ecosphereSeason: yup.string().nullable(),
  ecosphereResidential: yup.string().nullable(),
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
  fullName: "",
  dob: null,
  gender: "",
  mobile: "",
  whatsapp: "",
  email: "",
  city: "",
  state: "",
  country: "India",
  profession: "",
  organisation: "",
  background: "",
  interests: [],
  membershipOption: "शतायुस्World Life Membership – ₹500",
  accessSelections: [],
  modeOfParticipation: "Both",
  ecosphereSeason: "",
  ecosphereResidential: "",
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
