"use client";

import * as React from "react";
import Link from "next/link";
import { Image } from "~/components/ui/Image";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

import { Button } from "~/components/ui/button";
import styles from "./header.module.css";
import SignInButton from "~/app/login/SignInButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function Header() {
  const { data: session, status } = useSession();
  console.log('Header session:', session);
  const isLoading = status === "loading";

  const navLinks = [
    { href: "/vision", label: "Vision" },
    { href: "/career-events", label: "Career Events" },
    { href: "/timeline", label: "Timeline" },
  { href: "/instafolio", label: "InstaFolio" },
  ];

  return (
  <header className="border-border/40 bg-[#0e0d0d] sticky top-0 z-50 w-full border-b">
    <div className="container flex h-16 max-w-screen-2xl items-center"> {/* Reduced header height */}
      <div className="hidden md:flex w-full items-center">
        <Link href="/" className="flex items-center pr-4 ml-8"> {/* Logo with left margin */}
          <Image src="/logo2.PNG" alt="Logo" width={48} height={48} />
          <span className="hidden font-extrabold text-xl sm:inline-block ml-2">SpectrumAI</span>
        </Link>
        {/* Navigation links */}
        <nav className="flex-1 flex items-center justify-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles["rainbow-link"] + " text-sm font-medium transition-colors px-2 py-1 rounded-md"}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* User/sign-in section */}
        <nav className="flex items-center ml-4 gap-2">
          {isLoading ? (
            <div className="bg-muted h-8 w-16 animate-pulse rounded-md" />
          ) : session ? (
            <>
              <span className={styles['avatar-container']}>
                {session.user?.image?.includes('lh3.googleusercontent.com') ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? 'User avatar'}
                    className={styles['avatar-img']}
                    width={32}
                    height={32}
                  />
                ) : session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "User avatar"}
                    className={"rounded-full "+styles['avatar-img']}

                  />
                ) : (
                  <User className="h-3 w-3" />
                )}
              </span>
              <span className="text-xs font-semibold text-[#b3e5fc]">{session.user.name ?? 'User'}</span>
              <button
                className="flex items-center justify-center p-1 rounded hover:bg-[#23272f] transition-colors"
                title="Logout"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4 text-[#ff8a65]" />
              </button>
            </>
          ) : (
            <SignInButton />
          )}
        </nav>
      </div>
      {/* ...existing code for mobile menu, etc... */}
    </div>
  </header>
  );
}
