import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export interface LoginSchema extends z.infer<typeof loginSchema> {}
export interface RegisterSchema extends z.infer<typeof registerSchema> {}
