import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().min(1, { message: "email cannot be empty*" }).email(),
  password: z.string().min(1, { message: "password cannot be empty*" }),
});

export const signupSchema = z
  .object({
    email: z.string().min(1, { message: "email cannot be empty*" }).email(),
    // company: z.string().min(1, { message: "company cannot be empty*" }),
    name: z.string().min(1, { message: "name cannot be empty*" }),
    password: z
      .string()
      .min(6, { message: "Must be not less than 6 characters" }),
    // username: z.string().min(1, { message: "username cannot be empty*" }),
    // password: z
    //   .string()
    //   .min(8, "Password must be at least 8 characters long")
    //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    //   .regex(/\d/, "Password must contain at least one number")
    //   .regex(
    //     /[@$!%*?&]/,
    //     "Password must contain at least one special character"
    //   ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
