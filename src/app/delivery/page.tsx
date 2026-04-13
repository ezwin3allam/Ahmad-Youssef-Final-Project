import Link from "next/link";

export default function DeliveryPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Delivery Info</h1>
      <p className="text-gray-600 mb-6">
        Same day delivery available where applicable. This page is a placeholder for shipping and delivery details.
      </p>
      <Link href="/" className="text-main-color font-medium hover:underline">
        ← Back to Home
      </Link>
    </main>
  );
}
