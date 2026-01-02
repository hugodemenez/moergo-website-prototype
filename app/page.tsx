import { ComponentExample } from "@/components/component-example";
import { FeaturedProducts } from "@/components/featured-products";
import { ImageFeaturedProducts } from "@/components/image-featured-products";
import Image from "next/image";

export default function Page() {
  return (
    <main>
      <div className="w-screen max-w-screen-2xl relative left-1/2 -translate-x-1/2">
        <Image
          src="/hero.png"
          alt="Hero Image"
          width={1440}
          height={600}
          className="w-full h-auto"
        />
      </div>
      <FeaturedProducts />
      <section className="py-12 flex justify-between w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-stretch">
          <div className="space-y-6 min-h-[450px]">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Glove80 or Go60</h2>
              <h3 className="text-xl font-medium mb-6">
                Which one is better for you?
              </h3>
            </div>
            <div className="space-y-4 text-foreground max-w-xl">
              <p>
                There is no one correct answer for everyone, but the short
                answer is:
              </p>
              <p>Glove80 and Go60 have very different design goals:</p>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Glove80 is designed for ultimate ergonomics,</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Go60 is designed for ultimate travelling ergonomics.
                  </span>
                </li>
              </ul>
              <p>
                No matter which one(s) you choose, your choice is always backed
                by MoErgo.
              </p>
            </div>
          </div>
          <div className="relative w-full h-full hidden md:block">
            <Image
              src="/qa-section.png"
              alt="Glove80 and Go60 keyboards comparison"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <ImageFeaturedProducts />
    </main>
  );
}
