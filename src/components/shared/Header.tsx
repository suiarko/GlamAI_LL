"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="h-6 w-6 text-primary" />
          <span>GlamAI Look Lab</span>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/#features" className="text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="/#examples" className="text-muted-foreground transition-colors hover:text-foreground">
            Examples
          </Link>
          <Link href="/#pricing" className="text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
        </nav>
        <div className="ml-auto md:ml-6">
          <Link href="/login">
            <Button variant="outline">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

