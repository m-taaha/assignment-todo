import { z } from "zod";

export const registerUserSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: `Name cannot be empty` }),

    lastName: z.string().trim(),

    userName: z.string().trim().min(1, { message: `Username cannot be empty` }),

    email: z
      .string()
      .email({ message: `Invalid Email Address` })
      .trim()
      .min(1, { message: `Email is required` }),

    password: z
      .string()
      .trim()
      .min(1, { message: `Password is required` })
      .min(6, { message: `At least 6 characters is required` }),

    confirmPassword: z.string().trim().min(1, { message: `Please confirm your password` }),
  })
  //refine() to compare password
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"], 
  });

export const loginUserSchema = z.object({
  email: z.string().email({ message: `Invalid Email Address` }).trim(),

  password: z.string().trim().min(1, { message: `Password is required` }).min(6, { message: `At least 6 characters is required` }),
});
