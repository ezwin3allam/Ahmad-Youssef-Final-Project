import { getAllCategories } from "@/app/home.services";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero/PageHero";
import { Layers } from "lucide-react";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="bg-gray-50 min-h-screen">
      <PageHero
        breadcrumb="Categories"
        title="All Categories"
        subtitle="Browse our wide range of product categories"
        icon={Layers}
        variant="green"
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-main-color transition-all duration-300 group"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 text-center">
                <span className="text-sm font-bold text-gray-800 group-hover:text-main-color transition-colors">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
