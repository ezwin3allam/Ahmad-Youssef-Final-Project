import LoginForm from "./LoginForm";
import SocialLoginButtons from "./SocialLoginButtons";
import { Lock, Users, Star } from "lucide-react";
import Link from "next/link";
import FreshCartLogo from "@/components/FreshCartLogo/FreshCartLogo";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
      {/* Left - Illustration Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 gap-8 bg-white">
        {/* Grocery cart illustration */}
        <div className="flex flex-col items-center text-center">
          <div className="w-72 h-64 flex items-center justify-center mb-6">
            <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Cart body */}
              <rect x="60" y="100" width="160" height="100" rx="12" fill="#f0fdf4" stroke="#16A34A" strokeWidth="3"/>
              {/* Cart handle */}
              <path d="M30 60 L60 100" stroke="#16A34A" strokeWidth="4" strokeLinecap="round"/>
              <path d="M30 60 L20 40" stroke="#16A34A" strokeWidth="4" strokeLinecap="round"/>
              {/* Cart wheels */}
              <circle cx="90" cy="210" r="14" fill="#16A34A"/>
              <circle cx="90" cy="210" r="7" fill="white"/>
              <circle cx="190" cy="210" r="14" fill="#16A34A"/>
              <circle cx="190" cy="210" r="7" fill="white"/>
              {/* Tomato */}
              <circle cx="110" cy="85" r="22" fill="#ef4444"/>
              <path d="M100 68 Q110 58 120 68" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M110 64 L110 72" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Carrot */}
              <path d="M160 55 L175 90 L145 90 Z" fill="#f97316"/>
              <path d="M153 55 Q160 42 167 55" stroke="#16A34A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M160 50 L160 58" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
              {/* Apple */}
              <path d="M205 75 Q230 60 230 90 Q230 112 210 112 Q190 112 190 90 Q190 65 205 75Z" fill="#22c55e"/>
              <path d="M210 74 Q215 62 222 68" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round"/>
              {/* Broccoli */}
              <circle cx="90" cy="140" r="14" fill="#16A34A"/>
              <circle cx="75" cy="130" r="12" fill="#16A34A"/>
              <circle cx="105" cy="130" r="12" fill="#16A34A"/>
              <rect x="85" y="152" width="10" height="18" rx="2" fill="#15803d"/>
              {/* Basket lines */}
              <path d="M80 130 L200 130" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"/>
              <path d="M75 150 L205 150" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 leading-snug">
            FreshCart – Your One-Stop Shop<br />for Fresh Products
          </h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-xs">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs.
          </p>
        </div>

        {/* Feature stats */}
        <div className="flex items-center justify-center gap-8 w-full max-w-xs">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="bg-emerald-50 text-emerald-600 rounded-full p-2.5">
              <i className="fa-solid fa-truck text-lg" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Free Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="bg-blue-50 text-blue-600 rounded-full p-2.5">
              <i className="fa-solid fa-shield-halved text-lg" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="bg-purple-50 text-purple-600 rounded-full p-2.5">
              <i className="fa-regular fa-clock text-lg" />
            </div>
            <span className="text-xs font-semibold text-gray-700">24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="flex items-center justify-center p-8 bg-white shadow-sm overflow-y-auto">
        <div className="w-full max-w-md rounded-2xl shadow-xl p-8 lg:p-12 space-y-6">
          {/* Logo — always visible */}
          <div className="flex items-center justify-center">
            <FreshCartLogo className="h-8 w-auto" />
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* Social login buttons */}
          <SocialLoginButtons />

          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Or continue with email</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <LoginForm />

          <p className="text-center text-sm text-gray-500">
            New to FreshCart?{" "}
            <Link href="/register" className="text-main-color font-semibold hover:underline">
              Create an account
            </Link>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Lock className="size-3.5" />
              SSL Secured
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Users className="size-3.5" />
              50K+ Users
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
              4.9 Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
