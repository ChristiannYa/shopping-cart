import type { Metadata } from "next";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen pb-4">
          <StoreProvider>
            <NextAuthProvider>
              <main className="flex-grow">{children}</main>
              <Footer />
            </NextAuthProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
