"use client";

import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserCart } from "@/components/AddToCartButton/addToCart.action";
import { useAppDispatch } from "@/store/hooks";
import { setCartCount, clearCart } from "@/store/slices/cartSlice";

export const CartContextCreated = createContext({
  count: 0,
  setCount: function (_count: number) {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserCart()
      .then((res) => {
        setCount(res.numOfCartItems);
        dispatch(setCartCount(res.numOfCartItems));
      })
      .catch(() => {
        setCount(0);
        dispatch(clearCart());
      });
  }, [session, dispatch]);

  return (
    <CartContextCreated value={{ count, setCount }}>
      {children}
    </CartContextCreated>
  );
}
