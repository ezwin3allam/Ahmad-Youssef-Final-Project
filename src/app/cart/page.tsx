import { getUserCart } from "@/components/AddToCartButton/addToCart.action";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChangeProductCount from "./ChangeProductCount";
import RemoveProduct from "./RemoveProduct";
import ClearCart from "./ClearCart";
import PayAllProduct from "./PayAllProduct";
import PromoCode from "./PromoCode";

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category?: { name: string };
  };
}

export default async function CartPage() {
  let cartData = null;

  try {
    cartData = await getUserCart();
  } catch {
    cartData = null;
  }

  if (!cartData || !cartData.data.products?.length) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 pt-8 mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-main-color transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Shopping Cart</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="bg-main-color text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <ShoppingCart className="size-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <p className="text-gray-500 mt-1 text-sm">Your cart is empty</p>
        </div>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl border border-gray-100 p-16 max-w-lg mx-auto">
            <div className="bg-gray-50 rounded-full size-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="size-12 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t added anything to your cart yet
            </p>
            <Link
              href="/products"
              className="inline-block bg-main-color hover:bg-main-color/90 text-white px-10 py-3 rounded-xl font-semibold transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { data: { products, totalCartPrice }, cartId, numOfCartItems } = cartData;

  return (
    <main className="bg-gray-50 min-h-screen">

      <div className="container mx-auto px-4 pt-8 pb-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-main-color transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Shopping Cart</span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="bg-main-color text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <ShoppingCart className="size-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
        <p className="text-gray-500 mt-1 text-sm">
          You have <span className="font-semibold text-gray-800">{numOfCartItems} item{numOfCartItems !== 1 ? "s" : ""}</span> in your cart
        </p>
      </div>

      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {(products as CartItem[]).map((item, idx) => (
                <div
                  key={item._id}
                  className={`flex items-center gap-6 p-4 ${idx !== 0 ? "border-t border-gray-100" : ""}`}
                >

                  <div className="relative size-20 shrink-0 rounded-xl overflow-hidden border border-gray-100">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>


                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 line-clamp-2">
                      {item.product.title}
                    </p>
                    <span className="inline-block mt-1 text-xs bg-main-color/10 text-main-color font-medium px-2 py-0.5 rounded-full">
                      {item.product.category?.name}
                    </span>
                    <p className="mt-1 text-sm font-bold text-main-color">{item.price} EGP</p>
                  </div>


                  <ChangeProductCount
                    productId={item.product._id}
                    count={item.count}
                  />


                  <div className="text-right shrink-0 w-20">
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="font-bold text-gray-800 text-sm">{item.price * item.count} EGP</p>
                  </div>


                  <RemoveProduct productId={item.product._id} />
                </div>
              ))}
            </div>


            <div className="flex items-center justify-between">
              <Link
                href="/products"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-main-color transition-colors"
              >
                ← Continue Shopping
              </Link>
              <ClearCart />
            </div>
          </div>


          <div className="space-y-4 sticky top-4">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

              <div className="bg-gray-900 px-6 py-4">
                <h2 className="text-lg font-bold text-white">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({numOfCartItems} item{numOfCartItems !== 1 ? "s" : ""})</span>
                    <span className="font-medium text-gray-800">{totalCartPrice} EGP</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-orange-500 font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-base">
                  <span className="text-gray-900">Estimated Total</span>
                  <span className="text-main-color text-lg">{totalCartPrice} EGP</span>
                </div>

                <PayAllProduct cartId={cartId} />

                <div className="text-center text-xs text-gray-500 space-y-1.5">
                  <p className="flex items-center justify-center gap-1.5">
                    <span className="text-main-color">✓</span> Your cart items will be saved
                  </p>
                  <p className="flex items-center justify-center gap-1.5">
                    <span className="text-main-color">✓</span> Track your orders easily
                  </p>
                  <p className="flex items-center justify-center gap-1.5">
                    <span className="text-main-color">✓</span> Access exclusive member deals
                  </p>
                </div>
              </div>
            </div>

            <PromoCode />
          </div>
        </div>
      </div>
    </main>
  );
}
