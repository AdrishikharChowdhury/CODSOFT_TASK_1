import * as z from "zod";

const BIO = z
  .string()
  .min(20, "Bio must be at least 20 characters.")
  .max(100, "Bio must be at most 100 characters.");

const PASSWORD = z
  .string()
  .min(8, "Password must be at least 8 characters.");

export const employeeSchema = z.object({
  name: z.string().min(5).max(32),
  email: z.string().email(),
  password: PASSWORD,
  jobTitle: z.string().min(2, "Job title is required."),
  skills: z.preprocess(
    (value) =>
      typeof value === "string"
        ? value.split(",").map((skill) => skill.trim()).filter(Boolean)
        : value,
    z.array(z.string()).min(1, "Add at least one skill.")
  ),
  bio: BIO,
  role: z.literal("employee"),
});

export const employerSchema = z.object({
  name: z.string().min(5).max(32),
  email: z.string().email(),
  password: PASSWORD,
  company: z.string().min(2, "Company name is required."),
  bio: BIO,
  role: z.literal("employer"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required."),
});

export type EmployeeValues = z.infer<typeof employeeSchema>;
export type EmployerValues = z.infer<typeof employerSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
