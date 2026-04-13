import { getUserOrders } from "./orders.services";
import { Order } from "./orders.interface";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Package, CheckCircle2, Truck, CreditCard, Banknote, Clock } from "lucide-react";

function OrderStatusBadge({ isPaid, isDelivered }: { isPaid: boolean; isDelivered: boolean }) {
  if (isDelivered) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
        <CheckCircle2 className="size-3.5" /> Delivered
      </span>
    );
  }
  if (isPaid) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
        <Truck className="size-3.5" /> Paid · In Transit
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
      <Clock className="size-3.5" /> Pending
    </span>
  );
}

function OrderCard({ order }: { order: Order }) {
  const date = new Date(order.createdAt).toLocaleDateString("en-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Order ID</p>
            <p className="text-sm font-mono font-semibold text-gray-800">
              #{(order._id || order.id || "").slice(-8).toUpperCase()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Date</p>
            <p className="text-sm font-medium text-gray-700">{date}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Payment</p>
            <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
              {order.paymentMethodType === "cash" ? (
                <><Banknote className="size-3.5 text-green-600" /> Cash on Delivery</>
              ) : (
                <><CreditCard className="size-3.5 text-blue-600" /> Card</>
              )}
            </p>
          </div>
        </div>
        <OrderStatusBadge isPaid={order.isPaid} isDelivered={order.isDelivered} />
      </div>


      <div className="divide-y divide-gray-50">
        {order.cartItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4 px-6 py-4">
            <Link
              href={`/productDetails/${item.product._id || item.product.id}`}
              className="shrink-0"
            >
              <div className="relative size-16 rounded-xl overflow-hidden border border-gray-100 bg-white">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/productDetails/${item.product._id || item.product.id}`}>
                <p className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-main-color transition-colors">
                  {item.product.title}
                </p>
              </Link>
              <p className="text-xs text-gray-400 mt-0.5">{item.product.category?.name}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-gray-800">{item.price} EGP</p>
              <p className="text-xs text-gray-400">× {item.count}</p>
            </div>
          </div>
        ))}
      </div>


      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          {order.cartItems.length} item{order.cartItems.length !== 1 ? "s" : ""} ·{" "}
          {order.shippingAddress.city}
        </p>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-lg font-bold text-main-color">{order.totalOrderPrice} EGP</p>
        </div>
      </div>
    </div>
  );
}

export default async function OrdersPage() {
  let orders: Order[] = [];

  try {
    orders = await getUserOrders();
  } catch {
    orders = [];
  }

  return (
    <main className="bg-gray-50 min-h-screen">

      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-main-color transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">My Orders</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-main-color/10 rounded-xl p-2.5">
              <Package className="size-6 text-main-color" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-500 mt-0.5 text-sm">
                {orders.length} order{orders.length !== 1 ? "s" : ""} placed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl border border-gray-100 p-16 max-w-lg mx-auto">
              <div className="bg-gray-50 rounded-full size-24 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="size-12 text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-8">
                Once you place an order, it will appear here.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-main-color hover:bg-main-color/90 text-white px-10 py-3 rounded-xl font-semibold transition-colors"
              >
                <ShoppingBag className="size-4" />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
