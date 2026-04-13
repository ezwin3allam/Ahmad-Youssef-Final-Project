import RegisterForm from "./RegisterForm";
import SocialLoginButtons from "../login/SocialLoginButtons";
import { Star, Award, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import FreshCartLogo from "@/components/FreshCartLogo/FreshCartLogo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
      {/* Left - Marketing Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12">
        <Link href="/">
          <FreshCartLogo className="h-7 w-auto" />
        </Link>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Welcome to <span className="text-main-color">FreshCart</span>
            </h2>
            <p className="text-gray-500 mt-3 text-base leading-relaxed">
              Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Award, title: "Premium Quality", desc: "Premium quality products sourced from trusted suppliers." },
              { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery available in most areas." },
              { icon: ShieldCheck, title: "Secure Shopping", desc: "Your data and payments are completely secure." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="bg-main-color/10 text-main-color p-2.5 rounded-xl shrink-0">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{title}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600 italic mb-3">
              "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </p>
            <p className="text-xs font-semibold text-gray-500">– Sarah Johnson</p>
          </div>
        </div>

        <div className="flex gap-8 text-center">
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "10K+", label: "Products" },
            { value: "4.9★", label: "App Rating" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-main-color">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="flex items-center justify-center p-8 bg-white shadow-sm overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Logo mobile */}
          <div className="lg:hidden flex items-center justify-center">
            <FreshCartLogo className="h-8 w-auto" />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="text-gray-500 mt-2">Start your fresh journey with us today</p>
          </div>

          {/* Social buttons */}
          <SocialLoginButtons />

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-main-color font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
