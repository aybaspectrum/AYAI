import * as React from "react";
import { SpectrumLogo } from "~/components/ui/spectrum-logo";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border/40 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <SpectrumLogo className="h-6 w-6" />
          <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
            Spectrumv.io
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/mannupaaji"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter className="text-muted-foreground hover:text-foreground h-5 w-5 transition-colors" />
          </a>
          <a
            href="https://github.com/aybaspectrum/AYAI"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="text-muted-foreground hover:text-foreground h-5 w-5 transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/AYOUSUF"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="text-muted-foreground hover:text-foreground h-5 w-5 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
