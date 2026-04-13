"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "./addToWishlist.action";
import { cn } from "@/lib/utils";

export default function AddToWishlistButton({
  id,
  initialWishlisted = false,
  className,
}: {
  id: string;
  initialWishlisted?: boolean;
  className?: string;
}) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);

  async function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();

    if (wishlisted) {
      toast.promise(removeProductFromWishlist(id), {
        loading: "Removing from wishlist...",
        success: () => {
          setWishlisted(false);
          return "Removed from wishlist";
        },
        error: "Failed to update wishlist",
      });
    } else {
      toast.promise(addProductToWishlist(id), {
        loading: "Adding to wishlist...",
        success: () => {
          setWishlisted(true);
          return "Added to wishlist!";
        },
        error: "Failed to update wishlist",
      });
    }
  }

  return (
    <button
      onClick={handleWishlist}
      className={cn(
        "h-8 w-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-50 hover:text-red-500 transition-colors shadow-sm",
        !className && "absolute top-2 end-2 z-30",
        className
      )}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <i className={cn("text-sm transition-colors", wishlisted ? "fa-solid fa-heart text-red-500" : "fa-regular fa-heart text-gray-600")} />
    </button>
  );
}
