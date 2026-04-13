import { getAllCategories, getAllProducts } from "./home.services";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import ProductCard from "@/components/ProductCard/ProductCard";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import FeaturesBanner from "@/components/FeaturesBanner/FeaturesBanner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <main>
      <HomeSlider />
      <FeaturesBanner />

      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700" />
              <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Shop By <span className="text-main-color">Category</span>
              </h2>
            </div>
            <Link
              href="/categories"
              className="flex shrink-0 items-center gap-1 text-sm font-medium text-main-color hover:underline"
            >
              View All Categories
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <CategorySlider categories={categories} />
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white">
              <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10" />
              <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  <span>🔥</span>
                  <span>Deal of the Day</span>
                </div>
                <h3 className="mb-1 text-2xl font-bold md:text-3xl">Fresh Organic Fruits</h3>
                <p className="mb-4 text-sm text-white/80">Get up to 40% off on selected organic fruits</p>
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-3xl font-bold">40% OFF</span>
                  <span className="text-xs text-white/70">
                    Use code: <span className="font-bold text-white">ORGANIC40</span>
                  </span>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-gray-100"
                >
                  Shop Now
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 p-8 text-white">
              <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10" />
              <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  <span>✨</span>
                  <span>New Arrivals</span>
                </div>
                <h3 className="mb-1 text-2xl font-bold md:text-3xl">Exotic Vegetables</h3>
                <p className="mb-4 text-sm text-white/80">Discover our latest collection of premium vegetables</p>
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-3xl font-bold">25% OFF</span>
                  <span className="text-xs text-white/70">
                    Use code: <span className="font-bold text-white">FRESH25</span>
                  </span>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-orange-500 transition-colors hover:bg-gray-100"
                >
                  Explore Now
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700" />
              <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Featured <span className="text-main-color">Products</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="flex shrink-0 items-center gap-1 text-sm font-medium text-main-color hover:underline"
            >
              View All
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.slice(0, 40).map((prod) => (
              <ProductCard key={prod.id} prod={prod} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
