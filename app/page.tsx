import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center relative min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
      <div className="hero-glow"></div>
      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="gradient-text">Launch Your Solana Token Instantly.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Torin lets you create your own token on the Solana blockchain in just a few clicks.
        </p>
        <Link href="/create">
          <Button className="btn-primary text-md px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
