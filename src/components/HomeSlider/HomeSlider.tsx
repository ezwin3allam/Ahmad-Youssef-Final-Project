"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80",
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    primaryCta: { href: "/products", label: "Shop Now", textClass: "text-main-color" },
    secondaryCta: { href: "/products", label: "View Deals" },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&q=80",
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    primaryCta: { href: "/products", label: "Shop Now", textClass: "text-main-color" },
    secondaryCta: { href: "/products", label: "Learn More" },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=1400&q=80",
    title: "Fast & Free Delivery",
    subtitle: "On orders over 500 EGP",
    primaryCta: { href: "/products", label: "Order Now", textClass: "text-main-color" },
    secondaryCta: { href: "/products", label: "Delivery Info" },
  },
];

export default function HomeSlider() {
  return (
    <div className="relative w-full">
      <button
        type="button"
        className="home-slider-prev absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-main-color shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:text-green-600 md:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        className="home-slider-next absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-main-color shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:text-green-600 md:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5" />
      </button>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{ prevEl: ".home-slider-prev", nextEl: ".home-slider-next" }}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="home-hero-swiper w-full h-[400px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex h-[400px] w-full items-center justify-center bg-gray-900 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/90 to-green-400/50" />
              <div className="relative z-10 flex h-full w-full items-center px-4 py-20 md:px-8">
                <div className="container mx-auto">
                  <div className="max-w-xl text-white">
                    <h2 className="mb-4 max-w-96 text-3xl font-bold leading-tight text-white">
                      {slide.title}
                    </h2>
                    <p className="mb-6 text-base text-white">{slide.subtitle}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={slide.primaryCta.href}
                        className={`inline-block rounded-lg border-2 border-white/50 bg-white px-6 py-2 text-sm font-semibold transition-transform hover:scale-105 ${slide.primaryCta.textClass}`}
                      >
                        {slide.primaryCta.label}
                      </Link>
                      <Link
                        href={slide.secondaryCta.href}
                        className="inline-block rounded-lg border-2 border-white/50 bg-transparent px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
