"use client";

import Link from "next/link";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import FreshCartLogo from "@/components/FreshCartLogo/FreshCartLogo";
import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { signOut } from "next-auth/react";

// TODO: fetch from api instead of hardcoding
const categories = [
  { label: "Electronics", href: "/products?category=Electronics" },
  { label: "Women's Fashion", href: "/products?category=Women%27s+Fashion" },
  { label: "Men's Fashion", href: "/products?category=Men%27s+Fashion" },
  { label: "Beauty & Health", href: "/products?category=Beauty+%26+Health" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
];

export default function Navbar() {
  const count = useAppSelector((state) => state.cart.count);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(`/products?search=${encodeURIComponent(q)}`);
  }

  function handleCatEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCategoriesOpen(true);
  }

  function handleCatLeave() {
    closeTimer.current = setTimeout(() => setCategoriesOpen(false), 150);
  }

  return (
    <>
      <div className="hidden md:block bg-white text-gray-600 text-xs border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-truck text-main-color text-[10px]" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-gift text-main-color text-[10px]" />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <i className="fa-solid fa-phone text-[10px]" />
              +1 (800) 123-4567
            </a>
            <a href="mailto:support@freshcart.com" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <i className="fa-regular fa-envelope text-[10px]" />
              support@freshcart.com
            </a>
            {!isAuthenticated && (
              <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
                <Link href="/login" className="hover:text-gray-900 transition-colors flex items-center gap-1">
                  <i className="fa-regular fa-user text-[10px]" />
                  Sign In
                </Link>
                <span className="text-gray-400">|</span>
                <Link href="/register" className="hover:text-gray-900 transition-colors flex items-center gap-1">
                  <i className="fa-solid fa-user-plus text-[10px]" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <header className="bg-white sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0">
          <FreshCartLogo className="h-7 w-auto" />
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-5 py-3 pr-12 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-color/20 transition-shadow"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex size-8 shrink-0 items-center justify-center rounded-full bg-main-color text-white transition-colors hover:bg-main-color/90"
              aria-label="Search"
            >
              <Search className="size-4" />
            </button>
          </div>
        </form>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-main-color" : "text-gray-700 hover:text-main-color"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div
            className="relative"
            onMouseEnter={handleCatEnter}
            onMouseLeave={handleCatLeave}
          >
            <button className="flex items-center gap-0.5 text-sm font-medium text-gray-700 hover:text-main-color transition-colors">
              Categories
              <ChevronDown className={`size-3.5 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`} />
            </button>

            {categoriesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45" />
                <Link
                  href="/categories"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-main-color hover:bg-green-50 transition-colors"
                  onClick={() => setCategoriesOpen(false)}
                >
                  All Categories →
                </Link>
                <div className="border-t border-gray-100 my-1" />
                {categories.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-main-color transition-colors"
                    onClick={() => setCategoriesOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/brands"
            className={`flex items-center gap-0.5 text-sm font-medium transition-colors ${
              pathname === "/brands" ? "text-main-color" : "text-gray-700 hover:text-main-color"
            }`}
          >
            Brands
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-gray-600 border-r pr-3 mr-1">
            <i className="fa-solid fa-headset text-main-color text-lg" />
            <div className="leading-tight">
              <p className="text-xs text-gray-400">Support</p>
              <p className="text-xs font-semibold">24/7 Help</p>
            </div>
          </div>

          <Link href="/wishlist" className="text-gray-600 hover:text-main-color transition-colors" aria-label="Wishlist">
            <i className="fa-regular fa-heart text-lg" />
          </Link>

          <Link href="/cart" className="relative text-gray-600 hover:text-main-color transition-colors" aria-label="Cart">
            <i className="fa-solid fa-cart-shopping text-lg" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-main-color text-white text-xs rounded-full size-4 flex items-center justify-center font-bold">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/orders"
                className="text-sm font-medium text-gray-700 hover:text-main-color transition-colors"
              >
                My Orders
              </Link>
              <span className="text-sm text-gray-600 font-medium">
                Hi, {user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-gray-700 hover:text-main-color text-sm font-medium transition-colors"
              >
                <i className="fa-regular fa-user" />
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 bg-main-color hover:bg-main-color/90 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                <i className="fa-solid fa-user-plus" />
                Sign Up
              </Link>
            </div>
          )}

          <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-gray-700 hover:text-main-color transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              href="/orders"
              className="block text-sm font-medium text-gray-700 hover:text-main-color transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              My Orders
            </Link>
          )}
          <div className="border-t border-gray-100 pt-2">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Categories</p>
            <Link
              href="/categories"
              className="block text-sm font-semibold text-main-color hover:text-main-color transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              All Categories
            </Link>
            {categories.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block text-sm text-gray-700 hover:text-main-color transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
      </header>
    </>
  );
}
