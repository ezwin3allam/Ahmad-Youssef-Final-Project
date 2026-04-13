import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About FreshCart</h1>
      <p className="text-gray-600 mb-6">
        Fresh from farm to your table. This page is a placeholder for your about content.
      </p>
      <Link href="/" className="text-main-color font-medium hover:underline">
        ← Back to Home
      </Link>
    </main>
  );
}
