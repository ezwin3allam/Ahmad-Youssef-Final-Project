import { ProductData } from "@/app/home.interface";
import { Star, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton/AddToWishlistButton";

export default function ProductCard({ prod }: { prod: ProductData }) {
  const { category, imageCover, id, price, ratingsAverage, ratingsQuantity, title, priceAfterDiscount } = prod;

  const discountPercent = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : null;

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:shadow-md">

      <div className="relative h-60 overflow-hidden bg-gray-50">
        <Link href={`/productDetails/${id}`} className="relative block h-full">
          <Image
            fill
            src={imageCover}
            alt={title}
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
          />
        </Link>

        {discountPercent && (
          <span className="absolute left-2 top-2 z-10 rounded-md bg-red-500 px-1.5 py-0.5 text-[11px] font-bold text-white">
            -{discountPercent}%
          </span>
        )}

        <div className="absolute right-3 top-3 z-10 flex flex-col space-y-2">
          <AddToWishlistButton id={id} className="relative" />
          <button
            title="Compare"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-gray-50 hover:text-main-color text-gray-500"
          >
            <i className="fa-solid fa-arrow-rotate-right fa-flip-horizontal text-xs" />
          </button>
          <Link
            href={`/productDetails/${id}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-gray-50 hover:text-main-color text-gray-500"
            title="Quick View"
          >
            <Eye className="size-[15px]" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <p className="mb-0.5 text-[11px] text-gray-400 uppercase tracking-wide">{category.name}</p>

        <Link href={`/productDetails/${id}`}>
          <h3 className="mb-1.5 line-clamp-2 text-sm font-medium text-gray-800 transition-colors hover:text-main-color leading-snug">
            {title}
          </h3>
        </Link>

        <div className="mb-2.5 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-3 ${i < Math.floor(ratingsAverage) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-none"}`}
            />
          ))}
          <span className="ml-1 text-[11px] text-gray-400">
            ({ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between gap-1">
          <div className="leading-tight">
            {priceAfterDiscount ? (
              <>
                <span className="font-bold text-main-color text-sm">{priceAfterDiscount} EGP</span>
                <span className="ml-1.5 text-xs text-gray-400 line-through">{price} EGP</span>
              </>
            ) : (
              <span className="font-bold text-gray-800 text-sm">{price} EGP</span>
            )}
          </div>
          <AddToCartButton id={id}>+</AddToCartButton>
        </div>
      </div>
    </div>
  );
}
