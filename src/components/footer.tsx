// SocialIconsBanner: a reusable row of social icons for both banner and footer
import { Image } from "./ui/Image";
function SocialIconsBanner() {
  return (
    <div className="flex items-center justify-center gap-6 py-4 bg-white">
      <a href="https://x.com/mannupaaji" target="_blank" rel="noopener noreferrer" aria-label="X">
        <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/x.svg" alt="X" width={36} height={36} className="inline-block" />
      </a>
      <a href="https://github.com/aybaspectrum/AYAI" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/github.svg" alt="GitHub" width={36} height={36} className="inline-block" />
      </a>
      <a href="https://www.linkedin.com/AYOUSUF" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/linkedin.svg" alt="LinkedIn" width={36} height={36} className="inline-block" />
      </a>
      <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/youtube.svg" alt="YouTube" width={36} height={36} className="inline-block" />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/facebook.svg" alt="Facebook" width={36} height={36} className="inline-block" />
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/instagram.svg" alt="Instagram" width={36} height={36} className="inline-block" />
      </a>
    </div>
  );
}
import * as React from "react";
// Using official colored SVGs from public CDNs for social icons
// Using official colored SVGs from public CDNs for social icons


export function Footer() {
  return (
    <>
      <SocialIconsBanner />
      <footer className="border-border/40 border-t bg-[#0e0d0d]">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-32 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Image src="/logo2.PNG" alt="Logo" width={128} height={128} className="pr-8" />
            <span className="hidden font-extrabold text-3xl sm:inline-block ml-4">SpectrumV.io</span>
          </div>
        </div>
      </footer>
    </>
  );
}
