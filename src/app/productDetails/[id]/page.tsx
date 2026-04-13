import { getSpecificProduct, getProducts } from "@/app/home.services";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton/AddToWishlistButton";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Star, Truck, RotateCcw, ShieldCheck, ChevronRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const OBJECT_ID_RE = /^[a-f0-9]{24}$/i;

const deliveryFeatures = [
  { icon: Truck, label: "Free Delivery", desc: "On orders over 500 EGP" },
  { icon: RotateCcw, label: "30 Days Return", desc: "Easy return policy" },
  { icon: ShieldCheck, label: "Secure Payment", desc: "100% protected" },
];

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!OBJECT_ID_RE.test(id)) {
    notFound();
  }

  const product = await getSpecificProduct(id);

  const {
    title,
    description,
    imageCover,
    images,
    price,
    priceAfterDiscount,
    ratingsAverage,
    ratingsQuantity,
    category,
    brand,
    quantity,
    sold,
  } = product;

  const discountPercent = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : null;

  const relatedProducts = await getProducts({
    categoryId: category._id,
    limit: 8,
  });
  const related = relatedProducts.filter((p) => p.id !== id).slice(0, 5);

  return (
    <main className="bg-gray-50 min-h-screen">

      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-main-color transition-colors">Home</Link>
            <ChevronRight className="size-3.5" />
            <Link href="/products" className="hover:text-main-color transition-colors">Shop</Link>
            <ChevronRight className="size-3.5" />
            <Link href="/categories" className="hover:text-main-color transition-colors">{category.name}</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-gray-800 font-medium line-clamp-1 max-w-48">{title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100">
              <Image
                src={imageCover}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
              {discountPercent && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                  -{discountPercent}%
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 hover:border-main-color transition-colors cursor-pointer bg-white">
                    <Image src={img} alt={`${title} ${i + 1}`} fill sizes="12vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>


          <div className="space-y-5">

            <div className="flex items-center gap-2">
              <span className="text-xs bg-main-color/10 text-main-color font-semibold px-3 py-1 rounded-full">
                {category.name}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-3 py-1 rounded-full">
                {brand.name}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 leading-snug">{title}</h1>


            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < Math.floor(ratingsAverage) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-none"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{ratingsAverage}</span>
              <span className="text-sm text-gray-400">({ratingsQuantity} reviews)</span>
              {sold && <span className="text-sm text-gray-400">• {sold} sold</span>}
            </div>


            <div className="flex items-end gap-3 py-2 border-y border-gray-100">
              {priceAfterDiscount ? (
                <>
                  <span className="text-4xl font-bold text-main-color">{priceAfterDiscount} EGP</span>
                  <span className="text-xl text-gray-400 line-through mb-1">{price} EGP</span>
                  <span className="text-sm bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-lg mb-1">
                    Save {discountPercent}%
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-main-color">{price} EGP</span>
              )}
            </div>


            <p className="text-sm text-gray-500">
              Availability:{" "}
              <span className={`font-semibold ${quantity > 0 ? "text-green-600" : "text-red-500"}`}>
                {quantity > 0 ? `In Stock (${quantity} units)` : "Out of Stock"}
              </span>
            </p>


            <div className="flex gap-3">
              <div className="flex-1">
                <AddToCartButton id={product.id}>Add To Cart</AddToCartButton>
              </div>
              <div className="border border-gray-200 rounded-xl p-2.5">
                <AddToWishlistButton id={product.id} />
              </div>
            </div>


            <div className="grid grid-cols-3 gap-3 pt-2">
              {deliveryFeatures.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center bg-gray-50 rounded-xl p-3">
                  <Icon className="size-5 text-main-color" />
                  <p className="text-xs font-semibold text-gray-700">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="mt-12 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4 flex gap-6">
            <button className="text-sm font-semibold text-main-color border-b-2 border-main-color pb-1">
              Product Details
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 pb-1">
              Reviews ({ratingsQuantity})
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 pb-1">
              Shipping & Returns
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">About this Product</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Product Information</h3>
                <dl className="space-y-2 text-sm">
                  {[
                    { label: "Category", value: category.name },
                    { label: "Brand", value: brand.name },
                    { label: "In Stock", value: `${quantity} units` },
                    { label: "Sold", value: sold ? `${sold} units` : "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-2">
                      <dt className="text-gray-400 w-24 shrink-0">{label}</dt>
                      <dd className="text-gray-700 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {["Premium Quality Product", "100% Authentic Guarantee", "Fast & Secure Packaging", "Quality Tested"].map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <Check className="size-4 text-main-color shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-8 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700" />
              <h2 className="text-2xl font-bold text-gray-800">
                You May <span className="text-main-color">Also Like</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} prod={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
