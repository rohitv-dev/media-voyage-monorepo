import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export interface LoginSchema extends z.infer<typeof loginSchema> {}
export interface RegisterSchema extends z.infer<typeof registerSchema> {}
