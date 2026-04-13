export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}
