import Link from "next/link";
import { ShoppingCart, Home, ArrowLeft } from "lucide-react";
import GoBackButton from "./GoBackButton";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-gradient-to-br from-green-50/60 to-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative silhouettes */}
      <svg className="absolute top-[12%] left-[5%] size-16 text-main-color/10" viewBox="0 0 64 64" fill="currentColor">
        <path d="M32 4c-2 0-4 1-5 3-4-1-8 1-9 5s1 8 5 9c-1 4 1 8 5 9 1.5.4 3 .4 4 0 4-1 6-5 5-9 4-1 6-5 5-9s-5-6-9-5c-1-2-3-3-5-3h4z" />
        <path d="M31 4V34" strokeWidth="2" stroke="currentColor" fill="none" />
      </svg>
      <svg className="absolute bottom-[18%] left-[6%] size-12 text-main-color/10 rotate-12" viewBox="0 0 48 48" fill="currentColor">
        <ellipse cx="16" cy="30" rx="12" ry="16" />
        <path d="M16 14 C16 6 24 2 28 8" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="absolute top-[30%] left-[18%] size-8 text-main-color/8" viewBox="0 0 32 32" fill="currentColor">
        <circle cx="16" cy="16" r="12" />
      </svg>

      <svg className="absolute top-[15%] right-[8%] size-14 text-main-color/8 -rotate-12" viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 44c-2 0-4-2-4-4V20c0-8 4-16 4-16s4 8 4 16v20c0 2-2 4-4 4z" />
        <path d="M24 28c-6-4-14-2-14 4" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" />
        <path d="M24 22c6-4 12-1 12 4" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="absolute bottom-[15%] right-[5%] size-16 text-main-color/10 rotate-6" viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 44c-2 0-4-2-4-4V20c0-8 4-16 4-16s4 8 4 16v20c0 2-2 4-4 4z" />
        <path d="M24 30c-8-4-14 0-12 6" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
        <path d="M24 22c8-4 14 0 12 6" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="absolute bottom-[35%] right-[18%] size-6 text-main-color/8" viewBox="0 0 32 32" fill="currentColor">
        <circle cx="16" cy="16" r="10" />
      </svg>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl px-10 py-14 max-w-lg w-full text-center relative z-10">
        {/* Icon with 404 badge */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="bg-green-50 rounded-2xl p-7">
            <ShoppingCart className="size-20 text-main-color" />
          </div>
          <span className="absolute -top-3 -right-3 bg-main-color text-white text-sm font-bold rounded-full size-12 flex items-center justify-center shadow-lg">
            404
          </span>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <span className="size-2.5 rounded-full bg-main-color/40" />
          <span className="size-4 rounded-full border-2 border-main-color/50" />
          <span className="size-2.5 rounded-full bg-main-color/40" />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Oops! Nothing Here</h1>
        <p className="text-gray-500 text-base mb-10 leading-relaxed max-w-sm mx-auto">
          Looks like this page went out of stock! Don&apos;t worry,
          there&apos;s plenty more fresh content to explore.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 bg-main-color hover:bg-main-color/90 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors w-full sm:w-auto justify-center"
          >
            <Home className="size-4" />
            Go to Homepage
          </Link>
          <GoBackButton />
        </div>
      </div>

      {/* Popular destinations */}
      <div className="mt-10 text-center relative z-10">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
          Popular Destinations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            { label: "All Products", href: "/products" },
            { label: "Categories", href: "/categories" },
            { label: "Today's Deals", href: "/deals" },
            { label: "Contact Us", href: "/" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-main-color border border-main-color/30 hover:bg-main-color hover:text-white px-5 py-2 rounded-full transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
