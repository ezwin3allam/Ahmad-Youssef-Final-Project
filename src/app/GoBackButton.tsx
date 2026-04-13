"use client";

import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
  return (
    <button
      onClick={() => history.back()}
      className="flex items-center gap-2.5 border border-gray-200 hover:border-main-color text-gray-700 hover:text-main-color px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors w-full sm:w-auto justify-center cursor-pointer"
    >
      <ArrowLeft className="size-4" />
      Go Back
    </button>
  );
}
