"use client";

import { Category } from "@/app/home.interface";
import Image from "next/image";
import Link from "next/link";

export default function CategorySlider({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/products?category=${encodeURIComponent(cat.name)}`}
          className="group flex flex-col items-center gap-2 rounded-lg bg-white p-4 text-center shadow-sm transition-all hover:shadow-md"
        >
          {/* Circular image */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-green-100 transition group-hover:bg-green-200">
            <Image
              src={cat.image}
              alt={cat.name}
              width={72}
              height={72}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Name */}
          <span className="line-clamp-1 text-sm font-medium text-gray-700 transition group-hover:text-main-color">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
