import Image from "next/image";
import { SearchBar, SearchProvider, MobileSearchButton } from "./search-bar";

export function Navbar() {
  return (
    <SearchProvider>
      <nav className="flex items-center gap-4 sticky top-0 z-50 justify-between py-4">
        <div className="flex items-center gap-4" id="left">
          <div
            className={`
                    flex justify-center items-center
                    px-3 py-2
                    gap-[71px]
                    w-[120.45px] h-12
                    bg-white rounded-lg
                  `}
          >
            <Image src="/moergo-logo.svg" alt="Logo" width={100} height={100} />
          </div>
          <SearchBar />
        </div>
        <div className="flex items-center gap-2">
          <MobileSearchButton />
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer">
            <Image src="/lucide/user.svg" alt="User" width={24} height={24} />
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer">
            <Image
              src="/lucide/shopping-basket.svg"
              alt="Shopping Basket"
              width={24}
              height={24}
            />
          </button>
        </div>
      </nav>
    </SearchProvider>
  );
}
