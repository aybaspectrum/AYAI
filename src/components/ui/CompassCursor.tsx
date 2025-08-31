"use client";

// Feature flag to enable/disable the custom cursor
const ENABLE_COMPASS_CURSOR = false;
import styles from "./compass-cursor.module.css";
import { DraftingCompass } from "lucide-react";
import { useEffect, useRef } from "react";

export function CompassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  if (!ENABLE_COMPASS_CURSOR) return null;

  return (
    <div ref={cursorRef} className={styles["compass-cursor"]}>
      <DraftingCompass size={32} color="#a259ff" strokeWidth={2.2} />
    </div>
  );
}
