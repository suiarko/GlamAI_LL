"use client";

import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>GlamAI Look Lab</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} GlamAI Look Lab. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

