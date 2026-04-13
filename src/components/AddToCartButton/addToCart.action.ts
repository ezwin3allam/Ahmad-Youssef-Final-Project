"use server";

import { userToken } from "@/app/myUtil";
import { fetchJsonOrThrow, getApiBaseUrl } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productPayloadSchema = z.object({
  productId: z.string().trim().min(1),
});

const productIdSchema = z.string().trim().min(1);
const countPayloadSchema = z.object({
  count: z.number().int().min(1),
});

interface CartResponse {
  data: { totalCartPrice: number; products: unknown[] };
  cartId: string;
  numOfCartItems: number;
}

export async function addProductToCart(product: { productId: string }) {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }
  const parsedProduct = productPayloadSchema.parse(product);

  const data = await fetchJsonOrThrow<{ totalCartPrice: number; numOfCartItems: number }>(
    `${getApiBaseUrl()}/api/v2/cart`,
    {
      method: "POST",
      headers: {
        token,
        "content-type": "application/json",
      },
      body: JSON.stringify(parsedProduct),
    }
  );
  revalidatePath("/cart");
  return { totalCartPrice: data.totalCartPrice, numOfCartItems: data.numOfCartItems };
}

export async function getUserCart() {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }

  const resData = await fetchJsonOrThrow<CartResponse>(
    `${getApiBaseUrl()}/api/v2/cart`,
    {
      method: "GET",
      headers: { token },
      cache: "no-store",
    }
  );

  const { data: { totalCartPrice, products }, cartId, numOfCartItems } = resData;
  return { data: { totalCartPrice, products }, cartId, numOfCartItems };
}

export async function handleChangeCount(
  productId: string,
  data: { count: number }
) {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }

  const parsedProductId = productIdSchema.parse(productId);
  const parsedData = countPayloadSchema.parse(data);

  await fetchJsonOrThrow(
    `${getApiBaseUrl()}/api/v2/cart/${parsedProductId}`,
    {
      method: "PUT",
      headers: {
        token,
        "content-type": "application/json",
      },
      body: JSON.stringify(parsedData),
    }
  );
  revalidatePath("/cart");
}

export async function handleRemoveProduct(productId: string) {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }
  const parsedProductId = productIdSchema.parse(productId);

  await fetchJsonOrThrow(
    `${getApiBaseUrl()}/api/v2/cart/${parsedProductId}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );
  revalidatePath("/cart");
}

export async function clearCart() {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }

  await fetchJsonOrThrow(
    `${getApiBaseUrl()}/api/v2/cart`,
    {
      method: "DELETE",
      headers: { token },
    }
  );
  revalidatePath("/cart");
}

const couponSchema = z.object({ couponName: z.string().trim().min(1) });

export async function applyCouponToCart(couponName: string) {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }
  const parsed = couponSchema.parse({ couponName });

  const data = await fetchJsonOrThrow<{
    status: string;
    numOfCartItems: number;
    data: { totalCartPrice: number; totalAfterDiscount?: number };
  }>(
    `${getApiBaseUrl()}/api/v2/cart/applyCoupon`,
    {
      method: "PUT",
      headers: { token, "content-type": "application/json" },
      body: JSON.stringify(parsed),
    }
  );
  revalidatePath("/cart");
  return data;
}
