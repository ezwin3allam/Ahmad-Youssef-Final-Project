"use server";

import { getApiBaseUrl } from "@/lib/api";

export async function sendForgotPasswordEmail(email: string) {
  const res = await fetch(
    `${getApiBaseUrl()}/api/v1/auth/forgotPasswords`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );
  return res.json();
}

export async function verifyResetCode(resetCode: string) {
  const res = await fetch(
    `${getApiBaseUrl()}/api/v1/auth/verifyResetCode`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resetCode }),
    }
  );
  return res.json();
}

export async function resetPassword(email: string, newPassword: string) {
  const res = await fetch(
    `${getApiBaseUrl()}/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    }
  );
  return res.json();
}
