"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

import { Button } from "~/components/ui/button";
import SignInButton from "~/app/login/SignInButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const navLinks = [
    { href: "/vision", label: "Vision" },
    { href: "/career-events", label: "Career Events" },
    { href: "/timeline", label: "Timeline" },
    { href: "/upload", label: "Upload" },
    { href: "/instafolio", label: "Insta Folio" },
  ];

  return (
  <header className="border-border/40 bg-[#0e0d0d] sticky top-0 z-50 w-full border-b">
      <div className="container flex h-32 max-w-screen-2xl items-center"> {/* Match header logo size */}
        <div className="hidden md:flex w-full items-center">
          <Link href="/" className="flex items-center pr-12"> {/* Add right padding to logo */}
            <Image src="/logo2.png" alt="Logo" width={128} height={128} />
            <span className="hidden font-extrabold text-3xl sm:inline-block ml-4">SpectrumAI</span>
          </Link>
          <nav className="flex-1 flex justify-center items-center gap-10 text-lg"> {/* Center nav links */}
            {session &&
              navLinks.map((link) => (
                <div key={link.href} className="flex flex-col items-center">
                  <span className="h-1 w-8 rounded-t bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 mb-1" />
                  <Link
                    href={link.href}
                    className="hover:text-foreground/80 text-foreground/60 transition-colors"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {isLoading ? (
              <div className="bg-muted h-8 w-16 animate-pulse rounded-md" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative h-8 w-8 rounded-full"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name ?? "User avatar"}
                        className="rounded-full"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem disabled>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {session.user.name}
                      </p>
                      <p className="text-muted-foreground text-xs leading-none">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SignInButton />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
