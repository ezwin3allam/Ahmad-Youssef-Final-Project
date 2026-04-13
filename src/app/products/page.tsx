export const dynamic = "force-dynamic";

import { getAllBrands, getAllCategories, getProducts } from "@/app/home.services";
import ProductCard from "@/components/ProductCard/ProductCard";
import PageHero from "@/components/PageHero/PageHero";
import { Package } from "lucide-react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; brand?: string }>;
}) {
  const { search, category, brand } = await searchParams;
  const [categories, brands] = await Promise.all([
    category ? getAllCategories() : Promise.resolve([]),
    brand ? getAllBrands() : Promise.resolve([]),
  ]);

  const categoryId = category
    ? categories.find((c) => c.name.toLowerCase() === category.toLowerCase())?._id
    : undefined;
  const brandId = brand
    ? brands.find((b) => b.name.toLowerCase() === brand.toLowerCase())?._id
    : undefined;

  const products = await getProducts({
    keyword: search,
    categoryId,
    brandId,
    limit: 48,
  });

  const heroTitle = search
    ? `Results for "${search}"`
    : category
    ? category
    : brand
    ? brand
    : "All Products";

  const heroBreadcrumb = search
    ? `Search: "${search}"`
    : category
    ? `Category: ${category}`
    : brand
    ? `Brand: ${brand}`
    : "All Products";

  const heroSubtitle = search
    ? `${products.length} result${products.length !== 1 ? "s" : ""} for "${search}"`
    : category
    ? `${products.length} product${products.length !== 1 ? "s" : ""} in ${category}`
    : brand
    ? `${products.length} product${products.length !== 1 ? "s" : ""} from ${brand}`
    : "Explore our complete product collection";

  return (
    <main className="bg-gray-50 min-h-screen">
      <PageHero
        breadcrumb={heroBreadcrumb}
        title={heroTitle}
        subtitle={heroSubtitle}
        icon={Package}
        variant="green"
      />

      <div className="container mx-auto px-4 py-8">
        <p className="text-sm text-gray-500 mb-6">
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
          {(search || category || brand) && (
            <span>
              {" "}for{" "}
              <span className="font-medium text-gray-800">
                &ldquo;{search || category || brand}&rdquo;
              </span>
            </span>
          )}
        </p>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl border border-gray-100 p-16 max-w-md mx-auto">
              <Package className="size-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">No products found</h2>
              <p className="text-gray-500 text-sm">
                No results for &ldquo;{search || category || brand}&rdquo;. Try a different search.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((prod) => (
              <ProductCard key={prod.id} prod={prod} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
