import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoErgo - Ergonomic Keyboards | Glove80 & Go60",
  description: "Discover MoErgo's innovative ergonomic keyboards. The Glove80 for ultimate ergonomics and the Go60 for ultimate traveling ergonomics. Experience the future of comfortable typing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container mx-auto px-2 md:px-0">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
