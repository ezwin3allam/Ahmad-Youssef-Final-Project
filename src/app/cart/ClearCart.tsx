"use client";

import { clearCart } from "@/components/AddToCartButton/addToCart.action";
import { toast } from "sonner";

export default function ClearCart() {
  async function handleClear() {
    toast.promise(clearCart(), {
      loading: "Clearing cart...",
      success: "Cart cleared",
      error: "Failed to clear cart",
    });
  }

  return (
    <button
      onClick={handleClear}
      className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
    >
      🗑 Clear all items
    </button>
  );
}
