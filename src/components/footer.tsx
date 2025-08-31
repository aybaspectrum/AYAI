"use client";
// SocialIconsBanner: a reusable row of social icons for both banner and footer
import { Image } from "./ui/Image";
function SocialIconsBanner() {
  return (
  <div className="flex items-center justify-center gap-3 py-2 bg-white">
      <a href="https://x.com/mannupaaji" target="_blank" rel="noopener noreferrer" aria-label="X">
  <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/x.svg" alt="X" width={20} height={20} className="inline-block" />
      </a>
      <a href="https://github.com/aybaspectrum/AYAI" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
  <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/github.svg" alt="GitHub" width={20} height={20} className="inline-block" />
      </a>
      <a href="https://www.linkedin.com/AYOUSUF" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
  <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/linkedin.svg" alt="LinkedIn" width={20} height={20} className="inline-block" />
      </a>
      <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
  <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/youtube.svg" alt="YouTube" width={20} height={20} className="inline-block" />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
  <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/facebook.svg" alt="Facebook" width={20} height={20} className="inline-block" />
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
  <Image src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/instagram.svg" alt="Instagram" width={20} height={20} className="inline-block" />
      </a>
    </div>
  );
}
import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
// Using official colored SVGs from public CDNs for social icons
// Using official colored SVGs from public CDNs for social icons

export function Footer() {
  const { data: session } = useSession();
  return (
    <>
      <footer className="border-border/40 border-t bg-[#0e0d0d]">
        <div className="container flex flex-col items-center justify-between gap-2 py-4 md:h-16 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-2 px-4 md:flex-row md:gap-1 md:px-0">
            <span className="hidden font-extrabold text-base sm:inline-block ml-2">SpectrumV.io</span>
          </div>
          {session && (
            <div className="flex items-center gap-2 ml-auto">
              {/* Avatar removed as requested */}
              <button
                className="flex items-center justify-center p-1 rounded hover:bg-[#23272f] transition-colors"
                title="Logout"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4 text-[#ff8a65]" />
              </button>
            </div>
          )}
        </div>
      </footer>
      <SocialIconsBanner />
    </>
  );
}
