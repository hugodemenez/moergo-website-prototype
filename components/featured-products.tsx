"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Go60",
    image: "/go60-shopping-card.png",
    description:
      "The Go60 is a compact, ergonomic keyboard with a 60% layout. It is designed for productivity and gaming.",
    price: 260.95,
    colors: ["white", "black"],
  },
  {
    id: 2,
    name: "Glove80",
    image: "/glove80-shopping-card.png",
    description:
      "The Glove80 is a compact, ergonomic keyboard with a 80% layout. It is designed for productivity and gaming.",
    price: 343.95,
    colors: ["white", "black", "gray"],
  },
];

const colorMap: Record<string, string> = {
  white: "#FFFFFF",
  black: "#000000",
  gray: "#808080",
};

export function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollability();
    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.querySelector("div[data-card]")?.clientWidth || 0;
    const gap = 16; // gap-4 = 1rem = 16px
    const scrollAmount = cardWidth + gap;
    
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-12">
      <div className="flex items-baseline gap-2 mb-8">
        <h2 className="text-2xl font-semibold">Our keyboards</h2>
        <a className="text-sm hover:underline cursor-pointer underline uppercase">View all</a>
      </div>
      
      {/* Mobile Carousel */}
      <div className="relative sm:hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              data-card
              className="shrink-0 w-[280px] snap-start"
            >
              <Card className="overflow-hidden bg-transparent p-0 rounded-none w-full h-full">
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-3 space-y-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <span className="text-sm font-semibold">
                      From €{product.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Colors</span>
                      <div className="flex gap-1.5">
                        {product.colors.map((color) => (
                          <div
                            key={color}
                            className="w-4 h-4 rounded-full border border-border cursor-pointer hover:scale-110 transition-all duration-300"
                            style={{ backgroundColor: colorMap[color] }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="pt-1">
                      <Button
                        variant="outline"
                        className="border-foreground bg-background hover:bg-muted cursor-pointer text-xs px-3 py-1.5 w-full"
                      >
                        Order now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg hover:bg-background transition-colors"
            aria-label="Scroll left"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg hover:bg-background transition-colors"
            aria-label="Scroll right"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden bg-transparent p-0 rounded-none">
            <div className="relative w-full aspect-4/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 lg:p-6 space-y-2">
              <div className="flex flex-row items-center justify-between gap-2">
                <h3 className="text-lg lg:text-xl font-semibold text-foreground">
                  {product.name}
                </h3>
                <span className="text-base lg:text-lg font-semibold">
                  From €{product.price.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <div className="flex flex-row items-center justify-between gap-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Colors</span>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-5 h-5 rounded-full border border-border cursor-pointer hover:scale-110 transition-all duration-300"
                        style={{ backgroundColor: colorMap[color] }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="outline"
                    className="border-foreground bg-background hover:bg-muted cursor-pointer text-sm px-4 py-2"
                  >
                    Order now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
