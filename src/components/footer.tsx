import * as React from "react";
import { SpectrumLogo } from "~/components/ui/spectrum-logo";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <SpectrumLogo className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Spectrumv.io
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/mannupaaji"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </a>
          <a
            href="https://github.com/aybaspectrum/AYAI"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </a>
        </div>
      </div>
    </footer>
  );
}
