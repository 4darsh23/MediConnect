import { z } from "zod";

export const doctorFormSchema = z.object({
  specialty: z.string().min(1, "Please select a specialty"),
  experience: z
    .number({ invalid_type_error: "Experience is required" })
    .int("Experience must be a whole number")
    .min(0, "Experience must be at least 0 years")
    .max(70, "Please enter a valid number of years"),
  credentialUrl: z
    .string()
    .min(1, "Credential URL is required")
    .url("Please enter a valid URL"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be under 2000 characters"),
});
