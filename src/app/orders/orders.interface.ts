export interface OrderProduct {
  count: number;
  _id: string;
  product: {
    _id: string;
    id: string;
    title: string;
    imageCover: string;
    category: { _id: string; name: string };
    brand: { _id: string; name: string };
  };
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  _id: string;
  id?: string;
  user: { _id: string; name: string; email: string };
  cartItems: OrderProduct[];
  shippingAddress: ShippingAddress;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
}

export type OrdersResponse = Order[];
