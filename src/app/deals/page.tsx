import Link from "next/link";

export default function DealsPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Deals</h1>
      <p className="text-gray-600 mb-6">Browse our latest promotions and discounts.</p>
      <Link href="/products" className="text-main-color font-medium hover:underline">
        View all products →
      </Link>
    </main>
  );
}
