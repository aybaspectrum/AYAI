"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

import { Button } from "~/components/ui/button";
import { SpectrumLogo } from "~/components/ui/spectrum-logo";
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
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <SpectrumLogo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">SpectrumAI</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {session &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-foreground/80 text-foreground/60 transition-colors"
                >
                  {link.label}
                </Link>
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
