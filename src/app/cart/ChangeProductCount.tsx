"use client";

import { handleChangeCount } from "@/components/AddToCartButton/addToCart.action";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";

export default function ChangeProductCount({
  productId,
  count,
}: {
  productId: string;
  count: number;
}) {
  async function handleDecrement(e: React.MouseEvent) {
    e.preventDefault();
    if (count <= 1) return;
    toast.promise(handleChangeCount(productId, { count: count - 1 }), {
      loading: "Updating...",
      success: "Cart updated",
      error: "Failed to update cart",
    });
  }

  async function handleIncrement(e: React.MouseEvent) {
    e.preventDefault();
    toast.promise(handleChangeCount(productId, { count: count + 1 }), {
      loading: "Updating...",
      success: "Cart updated",
      error: "Failed to update cart",
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrement}
        className="size-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
        disabled={count <= 1}
      >
        <Minus className="size-3" />
      </button>
      <span className="w-8 text-center font-medium">{count}</span>
      <button
        onClick={handleIncrement}
        className="size-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <Plus className="size-3" />
      </button>
    </div>
  );
}
