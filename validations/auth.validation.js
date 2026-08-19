import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string({ required_error: "Email required" })
    .trim()
    .email("Invalid Email format")
    .toLowerCase(),

  firstName: z
    .string({ required_error: "First Name required" })
    .trim()
    .min(2, "First Name Must be atleast 2 characters"),

  lastName: z
    .string({ required_error: "Last Name required" })
    .trim()
    .min(2, "Last Name must be atleast 2 characters"),

  password: z
    .string({ required_error: "Password Required" })
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email required" })
    .trim()
    .email("Invalid Email format")
    .toLowerCase(),

  password: z
    .string({ required_error: "Password Required" })
    .min(6, "Password must be at least 6 characters"),
});
