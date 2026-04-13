"use server";

import { userToken } from "@/app/myUtil";
import { fetchJsonOrThrow, getApiBaseUrl, getAppBaseUrl } from "@/lib/api";
import { z } from "zod";

const shippingAddressSchema = z.object({
  details: z.string().trim().min(3),
  phone: z.string().trim().min(6),
  city: z.string().trim().min(2),
});

const cartIdSchema = z.string().trim().min(1);

interface CashPaymentResponse {
  status: string;
  message?: string;
}

interface OnlinePaymentResponse {
  status?: string;
  session?: { url?: string };
  message?: string;
}

export async function cashPayment(
  cartId: string,
  shippingAddress: { details: string; phone: string; city: string }
): Promise<CashPaymentResponse> {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }

  const parsedCartId = cartIdSchema.parse(cartId);
  const parsedAddress = shippingAddressSchema.parse(shippingAddress);

  return fetchJsonOrThrow<CashPaymentResponse>(
    `${getApiBaseUrl()}/api/v1/orders/${parsedCartId}`,
    {
      method: "POST",
      headers: {
        token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: parsedAddress }),
    }
  );
}

export async function onlinePayment(
  cartId: string,
  shippingAddress: { details: string; phone: string; city: string }
): Promise<OnlinePaymentResponse> {
  const token = await userToken();
  if (!token) {
    throw new Error("Unauthorized request.");
  }

  const parsedCartId = cartIdSchema.parse(cartId);
  const parsedAddress = shippingAddressSchema.parse(shippingAddress);

  return fetchJsonOrThrow<OnlinePaymentResponse>(
    `${getApiBaseUrl()}/api/v1/orders/checkout-session/${parsedCartId}?url=${encodeURIComponent(getAppBaseUrl())}`,
    {
      method: "POST",
      headers: {
        token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: parsedAddress }),
    }
  );
}
