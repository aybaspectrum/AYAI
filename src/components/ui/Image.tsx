import * as React from "react";
import NextImage from "next/image";
import type { ImageProps } from "next/image";

/**
 * Wrapper for next/image to allow easy drop-in replacement for <img>.
 * Forwards all props and adds default styling.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ alt, ...props }, ref) => (
    <NextImage ref={ref} alt={alt} {...props} />
  )
);
Image.displayName = "Image";
