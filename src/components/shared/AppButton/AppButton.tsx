"use client";

import { Button } from "@/components/ui/button";

export default function AppButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button {...props}>{children}</Button>;
}
