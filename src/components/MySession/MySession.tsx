"use client";

import CartContextProvider from "@/app/context/CartContextProvider/CartContextProvider";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "@/store/StoreProvider";
import SessionSync from "@/store/SessionSync";

export default function MySession({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <SessionProvider>
        <SessionSync />
        <CartContextProvider>{children}</CartContextProvider>
      </SessionProvider>
    </StoreProvider>
  );
}
