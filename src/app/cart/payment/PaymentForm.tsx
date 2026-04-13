"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { cashPayment, onlinePayment } from "./payment.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Building2, Banknote, CreditCard } from "lucide-react";

const paymentSchema = zod.object({
  details: zod.string().min(1, "Address details are required"),
  phone: zod
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Must be an Egyptian phone number"),
  city: zod.string().min(1, "City is required"),
});

type PaymentFormData = zod.infer<typeof paymentSchema>;

export default function PaymentForm({ cartId }: { cartId: string }) {
  const router = useRouter();

  const { handleSubmit, control } = useForm<PaymentFormData>({
    defaultValues: { details: "", phone: "", city: "" },
    resolver: zodResolver(paymentSchema),
  });

  async function handleCashPayment(data: PaymentFormData) {
    toast.promise(cashPayment(cartId, data), {
      loading: "Placing your order...",
      success: (res) => {
        if (res.status === "success") {
          router.push("/orders");
          return "Order placed successfully! 🎉";
        }
        throw new Error(res.message || "Order failed");
      },
      error: (err) => err.message || "Failed to place order",
    });
  }

  async function handleOnlinePayment(data: PaymentFormData) {
    toast.promise(onlinePayment(cartId, data), {
      loading: "Redirecting to payment...",
      success: (res) => {
        if (res.session?.url) {
          window.location.href = res.session.url;
          return "Redirecting...";
        }
        throw new Error("Payment session failed");
      },
      error: "Failed to create payment session",
    });
  }

  return (
    <form className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">Shipping Information</h2>
        <div className="space-y-4">
          <Controller
            name="details"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Address Details</FieldLabel>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Street, building number..."
                    className="pl-10 focus-visible:ring-main-color"
                  />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="01XXXXXXXXX"
                    type="tel"
                    className="pl-10 focus-visible:ring-main-color"
                  />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Cairo, Alexandria..."
                    className="pl-10 focus-visible:ring-main-color"
                  />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Payment Method</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleSubmit(handleCashPayment)}
            className="flex items-center justify-center gap-2 bg-main-color hover:bg-main-color/90 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            <Banknote className="size-4" />
            Cash on Delivery
          </button>
          <button
            type="button"
            onClick={handleSubmit(handleOnlinePayment)}
            className="flex items-center justify-center gap-2 border-2 border-main-color text-main-color hover:bg-main-color hover:text-white py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            <CreditCard className="size-4" />
            Pay Online
          </button>
        </div>
      </div>
    </form>
  );
}
