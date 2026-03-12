"use client";

import { useEffect, useState } from "react";

type HeroImage = {
  src: string;
  fit?: "cover" | "contain";
};

type Props = {
  images: HeroImage[];
  interval?: number;
};

export function HeroCarousel({ images, interval = 5000 }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative h-full w-full" style={{ backgroundColor: "#f2f2f2" }}>
      {images.map((image, i) => (
        <img
          key={image.src}
          src={image.src}
          alt=""
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            image.fit === "contain" ? "object-contain p-4" : "object-cover"
          } ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
