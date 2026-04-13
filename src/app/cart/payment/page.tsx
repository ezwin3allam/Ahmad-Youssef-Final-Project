import PaymentForm from "./PaymentForm";
import { ChevronRight, ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ cartId: string }>;
}) {
  const { cartId } = await searchParams;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-main-color transition-colors">Home</Link>
            <ChevronRight className="size-3.5" />
            <Link href="/cart" className="hover:text-main-color transition-colors">Cart</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-gray-800 font-medium">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-main-color/10 rounded-full size-14 flex items-center justify-center mx-auto mb-4">
              <Lock className="size-7 text-main-color" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your shipping details below</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <PaymentForm cartId={cartId} />
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-main-color" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="size-4 text-main-color" />
              <span>256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
