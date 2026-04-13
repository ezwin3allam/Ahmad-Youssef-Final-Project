"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import FreshCartLogo from "@/components/FreshCartLogo/FreshCartLogo";
import { useState } from "react";
import { toast } from "sonner";

const features = [
  { iconClass: "fa-solid fa-truck", label: "Free Shipping", desc: "On orders over 500 EGP" },
  { iconClass: "fa-solid fa-arrow-rotate-right fa-flip-horizontal", label: "Easy Returns", desc: "14-day return policy" },
  { iconClass: "fa-solid fa-shield-halved", label: "Secure Payment", desc: "100% secure checkout" },
  { iconClass: "fa-solid fa-headset", label: "24/7 Support", desc: "Contact us anytime" },
];

const shopLinks = [
  { href: "/products", label: "All Products" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
  { href: "/products", label: "Electronics" },
  { href: "/products", label: "Men's Fashion" },
  { href: "/products", label: "Women's Fashion" },
];

const accountLinks = [
  { href: "/", label: "My Account" },
  { href: "/", label: "Order History" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Shopping Cart" },
  { href: "/login", label: "Sign In" },
  { href: "/register", label: "Create Account" },
];

const supportLinks = [
  { href: "/", label: "Contact Us" },
  { href: "/", label: "Help Center" },
  { href: "/", label: "Shipping Info" },
  { href: "/", label: "Returns & Refunds" },
  { href: "/", label: "Track Order" },
];

const legalLinks = [
  { href: "/", label: "Privacy Policy" },
  { href: "/", label: "Terms of Service" },
  { href: "/", label: "Cookie Policy" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "/",
    svg: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "/",
    svg: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "/",
    svg: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "/",
    svg: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're subscribed! Welcome to FreshCart 🎉");
    setEmail("");
  }

  return (
    <footer className="mt-auto">
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-lg bg-main-color px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                <i className="fa-regular fa-envelope text-xs" />
                Newsletter
              </div>
              <p className="mb-4 text-sm text-gray-400">60,000+ subscribers</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Get the Freshest Updates{" "}
                <span className="text-main-color">Delivered Free</span>
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                Weekly recipes, seasonal offers &amp; exclusive member perks.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Fresh Picks Weekly", "Free Delivery Codes", "Members-Only Deals"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full">
                    <Check className="size-3 text-main-color shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main-color bg-white"
                />
                <button type="submit" className="bg-main-color hover:bg-main-color/90 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shrink-0">
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2">✨ Unsubscribe anytime. No spam, ever.</p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                Mobile app
              </p>
              <h4 className="text-lg font-bold mb-1">Shop Faster on Our App</h4>
              <p className="text-gray-400 text-sm mb-5">
                Get app-exclusive deals &amp; 15% off your first order.
              </p>
              <div className="space-y-3">
                <Link href="/" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3">
                  <svg className="size-5 shrink-0" fill="white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-400 leading-none">Download on</p>
                    <p className="text-sm font-semibold leading-tight">App Store</p>
                  </div>
                </Link>
                <Link href="/" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3">
                  <svg className="size-5 shrink-0" fill="white" viewBox="0 0 24 24">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.35-7.06-2.56-2.57-10.78 9.43zm-1.65-20.3A1.99 1.99 0 001 5v14c0 .73.39 1.36.96 1.72l.1.06 11.04-11.04-.1-.1L1.53 3.46zm19.64 8.34l-2.9-1.66-2.88 2.88 2.88 2.88 2.91-1.67c.83-.48.83-1.95-.01-2.43zm-17.27 10.8l10.71-9.38-2.56-2.56-8.15 11.94z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-400 leading-none">Get it on</p>
                    <p className="text-sm font-semibold leading-tight">Google Play</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="size-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-400 ml-1">4.9 · 100K+ downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ iconClass, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <i className={`${iconClass} text-main-color text-xl shrink-0`} />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-1">
              <div className="inline-flex items-center bg-white rounded-xl px-4 py-2.5 mb-5">
                <FreshCartLogo className="h-6 w-auto" />
              </div>
              <p className="text-sm leading-relaxed mb-5">
                FreshCart is your one-stop destination for quality products. From fashion to
                electronics, we bring you the best brands at competitive prices with a seamless
                shopping experience.
              </p>
              <ul className="space-y-2.5 text-sm mb-5">
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-phone text-main-color text-sm shrink-0" />
                  <span>+1 (800) 123-4567</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-regular fa-envelope text-main-color text-sm shrink-0" />
                  <span>support@freshcart.com</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-location-dot text-main-color text-sm shrink-0 mt-0.5" />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </li>
              </ul>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ svg, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="size-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-main-color transition-colors"
                  >
                    {svg}
                  </Link>
                ))}
              </div>
            </div>


            {[
              { title: "Shop", links: shopLinks },
              { title: "Account", links: accountLinks },
              { title: "Support", links: supportLinks },
              { title: "Legal", links: legalLinks },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-white font-semibold">{col.title}</h3>
                <ul className="space-y-2.5 mt-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              {["Visa", "Mastercard", "PayPal"].map((method) => (
                <span
                  key={method}
                  className="text-xs bg-white/10 border border-white/10 rounded px-2.5 py-1 text-gray-400"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
