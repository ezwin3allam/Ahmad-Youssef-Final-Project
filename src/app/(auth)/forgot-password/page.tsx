import Link from "next/link";
import FreshCartLogo from "@/components/FreshCartLogo/FreshCartLogo";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center justify-center">
          <FreshCartLogo className="h-8 w-auto" />
        </div>

        <div className="text-center">
          <div className="bg-emerald-50 rounded-full size-16 flex items-center justify-center mx-auto mb-4">
            <i className="fa-regular fa-envelope text-main-color text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your email and we will send you a reset link.
          </p>
        </div>

        <ForgotPasswordForm />

        <p className="text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link href="/login" className="text-main-color font-semibold hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
