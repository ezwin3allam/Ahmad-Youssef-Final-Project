"use server";

import { getApiBaseUrl } from "@/lib/api";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) {
  const res = await fetch(
    `${getApiBaseUrl()}/api/v1/auth/signup`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}
