"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { setUser, clearUser } from "./slices/authSlice";

export default function SessionSync() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUser({
          name: session.user.name ?? null,
          email: session.user.email ?? null,
          image: session.user.image ?? null,
          token:
            (session.user as { freshCartToken?: string | null }).freshCartToken ?? null,
          provider:
            (session.user as { provider?: string }).provider ?? "credentials",
        })
      );
    } else {
      dispatch(clearUser());
    }
  }, [session, dispatch]);

  return null;
}
