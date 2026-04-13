import { getUserWishlist } from "@/components/AddToWishlistButton/addToWishlist.action";
import { getProductsByIds } from "@/app/home.services";
import { ProductData } from "@/app/home.interface";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton/AddToWishlistButton";
import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function WishlistPage() {
  type WishlistItem = { _id?: string; id?: string };
  let wishlistIds: string[] = [];

  try {
    const wishlist = await getUserWishlist();
    wishlistIds = wishlist?.map((item: WishlistItem) => item._id || item.id || "").filter(Boolean) ?? [];
  } catch {
    wishlistIds = [];
  }

  if (wishlistIds.length === 0) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-10">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-main-color transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-800 font-medium">Wishlist</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-500 mt-1 text-sm">Your wishlist is empty</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl border border-gray-100 p-16 max-w-lg mx-auto">
            <div className="bg-red-50 rounded-full size-24 flex items-center justify-center mx-auto mb-6">
              <Heart className="size-12 text-red-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">
              Browse products and save your favorites here
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-main-color hover:bg-main-color/90 text-white px-10 py-3 rounded-xl font-semibold transition-colors"
            >
              <ShoppingBag className="size-4" />
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const wishlistProducts = await getProductsByIds(wishlistIds);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-main-color transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Wishlist</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-500 mt-1 text-sm">{wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{wishlistProducts.length} items saved</p>
          <Link href="/products" className="text-sm text-main-color font-semibold hover:underline">
            Continue Shopping
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

          <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Product</span>
            <span>Price</span>
            <span>Action</span>
            <span></span>
          </div>


          {wishlistProducts.map((prod: ProductData) => (
            <div
              key={prod.id || prod._id}
              className="grid grid-cols-[1fr_auto] md:grid-cols-[3fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
            >

              <div className="flex items-center gap-4">
                <Link href={`/productDetails/${prod.id || prod._id}`} className="shrink-0">
                  <div className="relative size-16 rounded-xl overflow-hidden bg-white border border-gray-100">
                    <Image
                      src={prod.imageCover}
                      alt={prod.title}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                </Link>
                <div>
                  <Link href={`/productDetails/${prod.id || prod._id}`}>
                    <p className="font-semibold text-sm text-gray-900 line-clamp-2 hover:text-main-color transition-colors">
                      {prod.title}
                    </p>
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{prod.category?.name}</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3 ${i < Math.floor(prod.ratingsAverage) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-none"}`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">{prod.ratingsAverage}</span>
                  </div>

                  <div className="md:hidden mt-1">
                    <span className="font-bold text-main-color text-sm">
                      {prod.priceAfterDiscount ?? prod.price} EGP
                    </span>
                    {prod.priceAfterDiscount && (
                      <span className="text-xs text-gray-400 line-through ml-1">{prod.price}</span>
                    )}
                  </div>
                </div>
              </div>


              <div className="hidden md:block">
                <span className="font-bold text-main-color">
                  {prod.priceAfterDiscount ?? prod.price} EGP
                </span>
                {prod.priceAfterDiscount && (
                  <p className="text-xs text-gray-400 line-through">{prod.price}</p>
                )}
              </div>


              <div className="hidden md:block">
                <AddToCartButton id={prod.id || prod._id}>Add to Cart</AddToCartButton>
              </div>


              <AddToWishlistButton
                id={prod.id || prod._id}
                initialWishlisted={true}
                className="relative size-9 shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
