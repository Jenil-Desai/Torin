import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground flex items-center">
              Torin
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/create">
              <Button variant={"ghost"} className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
                Go to Create Token
              </Button>
            </Link>
            <Button className="p-2 rounded-xl text-base bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
