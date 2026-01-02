"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Hotspot {
  id: string;
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  productId: string;
  productName: string;
  description: string;
  textPosition?: "left" | "right"; // Position of text relative to circle
}

interface ImageFeaturedProductsProps {
  hotspots?: Hotspot[];
}

const defaultHotspots: Hotspot[] = [
  {
    id: "1",
    x: 25, // Left keyboard half - adjust based on actual image
    y: 50,
    productId: "go60",
    productName: "Go60",
    description: "Minimal split keyboard for easy travels",
    textPosition: "left",
  },
  {
    id: "2",
    x: 65, // Right keyboard half - adjust based on actual image
    y: 50,
    productId: "desk-mount",
    productName: "Desk Mount",
    description: "Easily mount your Go60 to your desk in vertical position for better ergonomic",
    textPosition: "right",
  },
];

export function ImageFeaturedProducts({
  hotspots = defaultHotspots,
}: ImageFeaturedProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const updateImageSize = () => {
      if (containerRef.current) {
        const img = containerRef.current.querySelector("img");
        if (img) {
          setImageSize({
            width: img.offsetWidth,
            height: img.offsetHeight,
          });
        }
      }
    };

    updateImageSize();
    window.addEventListener("resize", updateImageSize);
    // Use a small delay to ensure image is loaded
    const timer = setTimeout(updateImageSize, 100);
    
    // Trigger fade-in animation
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      window.removeEventListener("resize", updateImageSize);
      clearTimeout(timer);
      clearTimeout(fadeInTimer);
    };
  }, []);

  return (
    <div className="relative w-full py-12">
      <div
        ref={containerRef}
        className="relative w-full max-w-screen-2xl mx-auto"
      >
        <div className="relative w-full">
          <Image
            src="/featured-product.png"
            alt="Featured Products"
            width={1440}
            height={800}
            className="w-full h-auto"
            priority
          />
          {/* Hotspot buttons positioned absolutely */}
          {hotspots.map((hotspot, index) => {
            const textPosition = hotspot.textPosition || "right";
            const isLeft = textPosition === "left";
            const isActive = activeHotspot === hotspot.id;
            
            return (
              <div
                key={hotspot.id}
                className={`absolute group cursor-pointer transition-opacity duration-500 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div 
                  className="relative flex items-center gap-3 cursor-pointer"
                  onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}
                >
                  {/* Text label */}
                  {isLeft && (
                    <span className="text-white text-sm md:text-base font-medium group-hover:underline whitespace-nowrap cursor-pointer">
                      {hotspot.productName}
                    </span>
                  )}
                  
                  {/* Circle button */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 bg-transparent cursor-pointer">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white" />
                  </div>
                  
                  {/* Text label */}
                  {!isLeft && (
                    <span className="text-white text-sm md:text-base font-medium group-hover:underline whitespace-nowrap cursor-pointer">
                      {hotspot.productName}
                    </span>
                  )}
                  
                  {/* Description - absolutely positioned with backdrop blur card */}
                  {isActive && (
                    <div 
                      className={`absolute text-white text-xs md:text-sm max-w-[200px] md:max-w-[250px] transition-opacity duration-300 backdrop-blur-sm bg-white/10 rounded-lg px-3 py-2 border border-white/20 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        top: "100%",
                        marginTop: "8px",
                        ...(isLeft 
                          ? { right: 0, textAlign: "right" }
                          : { left: 0, textAlign: "left" }
                        ),
                      }}
                    >
                      {hotspot.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

