import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/globals/Navbar";
import Footer from "@/components/globals/Footer";

export const metadata: Metadata = {
  title: "Torin",
  description: "One Platform. Infinite Tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
