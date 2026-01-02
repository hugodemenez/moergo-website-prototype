"use client"

import * as React from "react"
import Image from "next/image"
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group"

const SearchContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

function useSearch() {
  const context = React.useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider")
  }
  return context
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <SearchContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SearchContext.Provider>
  )
}

export function SearchBar() {
  const { isOpen, setIsOpen } = useSearch()
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Focus input when dialog opens
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure the dialog is fully rendered
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // Prevent body scroll when dialog is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop: Full search bar */}
      <div className="hidden md:block w-full max-w-md">
        <InputGroup className="w-full bg-white h-12">
          <InputGroupInput type="text" placeholder="Search products..." />
          <InputGroupAddon align="inline-end" className="p-0">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center m-1">
              <Image
                src="/lucide/search.svg"
                alt="Search"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Mobile: Full-screen search dialog */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog content */}
          <div className="relative flex flex-col flex-1 bg-background animate-in slide-in-from-top-2 fade-in-0">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Search</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search input */}
            <div className="p-4">
              <InputGroup className="w-full bg-white h-12">
                <InputGroupInput
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsOpen(false)
                    }
                  }}
                />
                <InputGroupAddon align="inline-end" className="p-0">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center m-1">
                    <Image
                      src="/lucide/search.svg"
                      alt="Search"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Search results area (can be expanded later) */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Placeholder for search results */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function MobileSearchButton() {
  const { setIsOpen } = useSearch()
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="md:hidden w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer"
      aria-label="Open search"
    >
      <Image
        src="/lucide/search.svg"
        alt="Search"
        width={24}
        height={24}
      />
    </button>
  )
}

