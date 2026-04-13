"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, LoginFormData } from "./loginSchema";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, control } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginFormData) {
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result?.ok) {
      location.href = "/";
    } else {
      toast.error("Invalid email or password");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
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
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Link href="/forgot-password" className="text-xs text-main-color hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
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
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex items-center gap-2">
        <input type="checkbox" id="remember" className="size-4 accent-main-color rounded" />
        <label htmlFor="remember" className="text-sm text-gray-600">Keep me signed in</label>
      </div>

      <button
        type="submit"
        className="w-full bg-main-color hover:bg-main-color/90 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        Sign In
      </button>
    </form>
  );
}
