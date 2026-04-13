import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod.string().min(1, "Name is required"),
    email: zod
      .string()
      .regex(
        /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        "Enter a valid email"
      ),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    rePassword: zod.string(),
    phone: zod
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Must be an Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = zod.infer<typeof registerSchema>;
