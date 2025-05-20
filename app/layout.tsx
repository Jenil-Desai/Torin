import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/globals/Navbar";
import Footer from "@/components/globals/Footer";
import Provider from "@/components/layouts/Providers";

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
        <Provider>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
