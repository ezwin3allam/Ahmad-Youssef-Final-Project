"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, RegisterFormData } from "./register.schema";
import { registerUser } from "./register.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { handleSubmit, control } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(data: RegisterFormData) {
    toast.promise(registerUser(data), {
      loading: "Creating your account...",
      success: (res) => {
        if (res.message === "success") {
          router.push("/login");
          return "Account created! Please sign in.";
        }
        throw new Error(res.message || "Registration failed");
      },
      error: (err) => err.message || "Something went wrong",
    });
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
            <div className="relative">
              <i className="fa-solid fa-user-plus absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your full name"
                className="pl-10 focus-visible:ring-main-color"
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                autoComplete="off"
                type="email"
                className="pl-10 focus-visible:ring-main-color"
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
            <div className="relative">
              <i className="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="01XXXXXXXXX"
                type="tel"
                className="pl-10 focus-visible:ring-main-color"
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10 focus-visible:ring-main-color"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`} />
              </button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="rePassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Confirm your password"
                autoComplete="new-password"
                type={showConfirm ? "text" : "password"}
                className="pl-10 pr-10 focus-visible:ring-main-color"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"} text-sm`} />
              </button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <button
        type="submit"
        className="w-full bg-main-color hover:bg-main-color/90 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        Sign Up
      </button>
    </form>
  );
}
