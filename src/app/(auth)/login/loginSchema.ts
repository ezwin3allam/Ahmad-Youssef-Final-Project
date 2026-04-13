import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string()
    .regex(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "Enter a valid email"
    ),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = zod.infer<typeof loginSchema>;
