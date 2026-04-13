import Link from "next/link";

export default function PayAllProduct({ cartId }: { cartId: string }) {
  return (
    <Link
      href={`/cart/payment?cartId=${cartId}`}
      className="block w-full bg-main-color hover:bg-main-color/80 text-white text-center py-3 rounded-lg font-semibold transition-colors"
    >
      Proceed to Checkout
    </Link>
  );
}
