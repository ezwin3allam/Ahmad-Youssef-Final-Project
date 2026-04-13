import { userToken, userId } from "@/app/myUtil";
import { fetchJsonOrThrow, getApiBaseUrl } from "@/lib/api";
import { Order, OrdersResponse } from "./orders.interface";

export async function getUserOrders(): Promise<Order[]> {
  const token = await userToken();
  const uid = await userId();

  if (!token || !uid) {
    throw new Error("Unauthorized request.");
  }

  const data = await fetchJsonOrThrow<OrdersResponse>(
    `${getApiBaseUrl()}/api/v1/orders/user/${uid}`,
    {
      headers: { token },
      cache: "no-store",
    }
  );

  return Array.isArray(data) ? data : [];
}
