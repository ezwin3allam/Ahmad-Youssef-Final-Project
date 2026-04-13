import { getAllBrands } from "@/app/home.services";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero/PageHero";
export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <main className="bg-gray-50 min-h-screen">
      <PageHero
        breadcrumb="Brands"
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        iconClass="fa-solid fa-tag"
        variant="purple"
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-square bg-white overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="text-sm font-semibold text-gray-800 group-hover:text-violet-600 transition-colors">
                  {brand.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
