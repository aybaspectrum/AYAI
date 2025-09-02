"use client";

import { motion } from "motion/react";
import { cn } from "~/lib/utils";

interface SpectrumLogoProps {
  size?: number;
  variant?: "default" | "loading" | "navigation" | "brand";
  className?: string;
  animated?: boolean;
}

export function SpectrumLogo({
  size = 32,
  variant = "default",
  className = "",
  animated = false,
}: SpectrumLogoProps) {
  const logoClasses = cn(
    "spectrum-logo",
    `spectrum-logo--${variant}`,
    className,
  );

  const LogoSVG = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={logoClasses}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Upper Pyramid */}
      <g className="pyramid-upper">
        {/* Main pyramid shape */}
        <path
          d="M16 4 L6 16 L26 16 Z"
          fill="currentColor"
          className="pyramid-fill"
        />

        {/* Three V shapes for Vision, Value, Vigour */}
        <g
          className="v-shapes"
          stroke="var(--bg-primary)"
          strokeWidth="1.5"
          fill="none"
        >
          {/* V for Vision (left) */}
          <path d="M10 10 L12 14 L14 10" className="v-vision" />
          {/* V for Value (center) */}
          <path d="M14 10 L16 14 L18 10" className="v-value" />
          {/* V for Vigour (right) */}
          <path d="M18 10 L20 14 L22 10" className="v-vigour" />
        </g>
      </g>

      {/* Lower Pyramid (inverted) */}
      <g className="pyramid-lower">
        {/* Main pyramid shape */}
        <path
          d="M16 28 L6 16 L26 16 Z"
          fill="currentColor"
          className="pyramid-fill"
        />

        {/* Three V shapes (inverted) */}
        <g
          className="v-shapes-inverted"
          stroke="var(--bg-primary)"
          strokeWidth="1.5"
          fill="none"
        >
          {/* Inverted V for Vision */}
          <path d="M10 22 L12 18 L14 22" className="v-vision-inv" />
          {/* Inverted V for Value */}
          <path d="M14 22 L16 18 L18 22" className="v-value-inv" />
          {/* Inverted V for Vigour */}
          <path d="M18 22 L20 18 L22 22" className="v-vigour-inv" />
        </g>
      </g>
    </svg>
  );

  if (animated && variant === "loading") {
    return (
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="inline-block"
      >
        <LogoSVG />
      </motion.div>
    );
  }

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.15 }}
        className="inline-block"
      >
        <LogoSVG />
      </motion.div>
    );
  }

  return <LogoSVG />;
}

// Logo variants for different use cases
export const NavigationLogo = (props: Omit<SpectrumLogoProps, "variant">) => (
  <SpectrumLogo {...props} variant="navigation" size={24} />
);

export const BrandLogo = (props: Omit<SpectrumLogoProps, "variant">) => (
  <SpectrumLogo {...props} variant="brand" size={40} />
);

export const LoadingLogo = (
  props: Omit<SpectrumLogoProps, "variant" | "animated">,
) => <SpectrumLogo {...props} variant="loading" size={48} animated />;

// CSS-in-JS styles for the logo variants
export const logoStyles = `
  .spectrum-logo {
    color: currentColor;
    transition: color var(--duration-fast) ease;
  }
  
  .spectrum-logo--navigation {
    color: var(--text-secondary);
  }
  
  .spectrum-logo--navigation:hover {
    color: var(--text-primary);
  }
  
  .spectrum-logo--brand {
    color: var(--text-primary);
  }
  
  .spectrum-logo--loading {
    color: var(--accent-primary);
  }
  
  .spectrum-logo .pyramid-fill {
    transition: fill var(--duration-fast) ease;
  }
  
  .spectrum-logo:hover .pyramid-fill {
    fill: var(--accent-primary);
  }
  
  .spectrum-logo--loading .pyramid-fill {
    fill: var(--accent-primary);
  }
`;
