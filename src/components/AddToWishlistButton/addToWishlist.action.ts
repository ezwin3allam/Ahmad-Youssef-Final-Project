"use server";

import { userToken } from "@/app/myUtil";
import { fetchJsonOrThrow, getApiBaseUrl } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productIdSchema = z.string().trim().min(1);

export async function addProductToWishlist(productId: string) {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }
  const parsedProductId = productIdSchema.parse(productId);

  const data = await fetchJsonOrThrow(
    `${getApiBaseUrl()}/api/v1/wishlist`,
    {
      method: "POST",
      headers: {
        token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: parsedProductId }),
    }
  );
  revalidatePath("/wishlist");
  return data;
}

export async function removeProductFromWishlist(productId: string) {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }
  const parsedProductId = productIdSchema.parse(productId);

  const data = await fetchJsonOrThrow(
    `${getApiBaseUrl()}/api/v1/wishlist/${parsedProductId}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );
  revalidatePath("/wishlist");
  return data;
}

export async function getUserWishlist() {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }

  const data = await fetchJsonOrThrow<{ data: { _id: string; id: string }[] }>(
    `${getApiBaseUrl()}/api/v1/wishlist`,
    {
      method: "GET",
      headers: { token },
      cache: "no-store",
    }
  );
  return data.data as { _id: string; id: string }[];
}
