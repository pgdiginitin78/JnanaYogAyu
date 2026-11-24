import * as yup from "yup";

const dropdownRequired = (message) =>
  yup
    .mixed()
    .nullable()
    .test("required", message, (val) => {
      if (!val) return false;
      if (typeof val === "string") return val.trim().length > 0;
      if (typeof val === "object") return Boolean(val.value || val.label);
      return false;
    });

export const challengeSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Minimum 2 characters"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    .min(7, "Enter a valid phone number"),
  country: yup.string().trim().required("Country is required"),
  city: yup.string().trim().required("City is required"),
  ageGroup: dropdownRequired("Please select your age group"),
  profession: yup.string().trim().required("Profession is required"),
  preferredLanguage: dropdownRequired("Please select your preferred language"),
  referralSource: dropdownRequired("Please select how you heard about us"),
  motivation: yup
    .string()
    .trim()
    .required("Please share what motivates you to join"),
  lifestyleAspect: yup
    .string()
    .trim()
    .required("Please share what you would like to become aware of"),
  takeawayHope: yup
    .string()
    .trim()
    .required("Please share what you hope to take away"),
});

export const challengeDefaults = {
  name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  ageGroup: null,
  profession: "",
  preferredLanguage: null,
  referralSource: null,
  motivation: "",
  lifestyleAspect: "",
  takeawayHope: "",
};

export const step1Fields = [
  "name",
  "email",
  "phone",
  "country",
  "city",
  "ageGroup",
  "profession",
  "preferredLanguage",
  "referralSource",
];

export const enquireSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: yup.string().trim().required("Phone number is required"),
  message: yup.string().trim(),
});

export const enquireDefaults = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export const ageGroups = [
  { label: "16-22", value: "16-22" },
  { label: "22-32", value: "22-32" },
  { label: "32-45", value: "32-45" },
  { label: "45-55", value: "45-55" },
  { label: "55-65", value: "55-65" },
  { label: "65 and above", value: "65+" },
];

export const languages = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Marathi", value: "Marathi" },
  { label: "Other", value: "Other" },
];

export const referralSources = [
  { label: "Referral", value: "Referral" },
  { label: "Social media", value: "Social media" },
  { label: "Website", value: "Website" },
  { label: "Event", value: "Event" },
  { label: "Other", value: "Other" },
];
