"use client";

import { useContext } from "react";
import { addProductToCart } from "./addToCart.action";
import { toast } from "sonner";
import { CartContextCreated } from "@/app/context/CartContextProvider/CartContextProvider";
import { cn } from "@/lib/utils";

export default function AddToCartButton({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  const { setCount } = useContext(CartContextCreated);

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();

    toast.promise(addProductToCart({ productId: id }), {
      loading: "Adding to cart...",
      success: (data) => {
        setCount(data.numOfCartItems);
        return "Added to cart!";
      },
      error: "Failed to add to cart",
    });
  }

  const isCompact = children === "+";

  return (
    <button
      onClick={handleAddToCart}
      className={cn(
        isCompact
          ? "bg-main-color hover:bg-main-color/90 text-white rounded-full size-9 flex items-center justify-center text-xl font-bold transition-colors shrink-0"
          : "w-full bg-main-color hover:bg-main-color/90 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm",
        className
      )}
    >
      {children}
    </button>
  );
}
