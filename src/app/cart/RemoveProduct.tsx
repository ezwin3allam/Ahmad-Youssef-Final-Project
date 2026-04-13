"use client";

import { handleRemoveProduct } from "@/components/AddToCartButton/addToCart.action";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function RemoveProduct({ productId }: { productId: string }) {
  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    toast.promise(handleRemoveProduct(productId), {
      loading: "Removing...",
      success: "Item removed from cart",
      error: "Failed to remove item",
    });
  }

  return (
    <button
      onClick={handleRemove}
      className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-colors"
      aria-label="Remove from cart"
    >
      <Trash2 className="size-4" />
    </button>
  );
}
