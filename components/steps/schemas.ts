import { z } from "zod";

export const step1Schema = z.object({
  firstName: z.string()
    .min(3, "First Name should be at least 3 characters long")
    .refine(value => /^[a-zA-Z\s]+$/.test(value), {
      message: "First Name should not contain special characters",
    }),
  otherNames: z.string()
    .min(3, "Other Name(s) should be at least 3 characters long")
    .refine(value => /^[a-zA-Z\s]+$/.test(value), {
      message: "Other Name(s) should not contain special characters",
    }),
});


export const step2Schema = z.object({
  email: z.string().email().min(1, "Email address is required"),
  gender:z.enum(["male", "female", "other"])
});

export const step3Schema = z.object({
  mobileNumber: z.string()
  .min(1, "Phone number is required")
  .refine((value) => {
    const regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{0,})[-. ]?([0-9]{0,})$/;
    return regex.test(value);
  }, "Invalid phone number format"),
  description: z.string().min(1,"description is required"),
});
