"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.statusMsg === "success" || res.ok) {
        setSubmitted(true);
        toast.success("Reset link sent! Check your inbox.");
      } else {
        toast.error(data.message || "Email not found");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-3">
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-green-700 font-medium">
            Reset link sent to <span className="font-bold">{email}</span>
          </p>
          <p className="text-xs text-green-600 mt-1">Check your inbox and follow the instructions.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-main-color/30 focus:border-main-color transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-main-color hover:bg-main-color/90 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        Send Reset Link
      </button>
    </form>
  );
}
