import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

const GUEST_TOKEN_COOKIE = "guest-cart-token";

async function createGuestAccount(): Promise<string> {
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  const email = `guest_${id}@freshcart.guest`;
  const password = `Guest_${id}_Pass1!`;

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Guest",
      email,
      password,
      rePassword: password,
      phone: "01000000000",
    }),
  });

  const data = await res.json();
  if (data.token) return data.token;
  throw new Error("Failed to create guest account");
}

export async function userToken(): Promise<string | null> {
  const cookie = await cookies();

  const sessionToken =
    cookie.get("__Secure-next-auth.session-token")?.value ||
    cookie.get("next-auth.session-token")?.value;

  if (sessionToken) {
    const token = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET as string,
    });
    const freshCartToken = token?.freshCartToken;
    if (typeof freshCartToken === "string") return freshCartToken;
  }

  const guestToken = cookie.get(GUEST_TOKEN_COOKIE)?.value;
  if (guestToken) return guestToken;

  const newToken = await createGuestAccount();
  cookie.set(GUEST_TOKEN_COOKIE, newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return newToken;
}

export async function userId(): Promise<string | null> {
  const freshCartToken = await userToken();
  if (!freshCartToken) return null;
  try {
    const parts = freshCartToken.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8")
    ) as { id?: string };
    return typeof payload.id === "string" ? payload.id : null;
  } catch {
    return null;
  }
}
