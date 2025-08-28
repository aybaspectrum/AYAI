"use client";

import { SessionProvider } from "next-auth/react";
import ThemeClientEffect from "./ThemeClientEffect";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeClientEffect />
      {children}
    </SessionProvider>
  );
}
