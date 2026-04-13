import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="text-main-color size-12" />
    </div>
  );
}
