"use client";

import { useState, useTransition } from "react";
import { Tag, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { applyCouponToCart } from "@/components/AddToCartButton/addToCart.action";

export default function PromoCode() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleApply() {
    const trimmed = code.trim();
    if (!trimmed) return;

    startTransition(async () => {
      try {
        const res = await applyCouponToCart(trimmed);
        const discountedTotal = res.data?.totalAfterDiscount ?? res.data?.totalCartPrice;
        toast.success(
          `Coupon applied! New total: ${discountedTotal} EGP`
        );
        setApplied(true);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Invalid promo code";
        toast.error(msg);
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Tag className="size-4 text-main-color" />
        Promo Code
      </h3>

      {applied ? (
        <div className="flex items-center gap-2 text-green-600 text-sm font-semibold py-2">
          <CheckCircle2 className="size-5" />
          Coupon &ldquo;{code}&rdquo; applied successfully!
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Enter promo code"
            disabled={isPending}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main-color disabled:opacity-50"
          />
          <button
            onClick={handleApply}
            disabled={isPending || !code.trim()}
            className="bg-main-color text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-main-color/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Applying…" : "Apply"}
          </button>
        </div>
      )}
    </div>
  );
}
