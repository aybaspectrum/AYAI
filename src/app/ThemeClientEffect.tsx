"use client";
import { useEffect } from "react";

export default function ThemeClientEffect() {
  useEffect(() => {
    // Always set dark mode as default
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
    // If you want to support toggling, add logic here
  }, []);
  return null;
}
