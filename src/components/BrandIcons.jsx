import React from "react";

/**
 * BrandIcons — Custom SVG icon library inspired by Kardeşler Kebap & Pide brand identity.
 */

// Helper to resolve icon dimensions
function getIconDimensions(size, width, height, defaultSize = 24) {
  const w = width || size || defaultSize;
  const h = height || size || defaultSize;
  return { width: w, height: h };
}

// 1. OttomanSeal — Authentic circular seal ornament
export function OttomanSeal({ className = "text-[#9C7A3F]", size = 24, width, height, ...props }) {
  const dims = getIconDimensions(size, width, height, 24);
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={dims.width} 
      height={dims.height} 
      className={`shrink-0 inline-block ${className}`} 
      aria-hidden="true" 
      {...props}
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
      <path
        d="M50 20 L58 38 L78 38 L62 50 L68 68 L50 56 L32 68 L38 50 L22 38 L42 38 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// 2. KebabSkewer — Charcoal grill skewer symbol replacing generic flame icon
export function KebabSkewer({ className = "text-[#4E5F4C]", size = 20, width, height, ...props }) {
  const dims = getIconDimensions(size, width, height, 20);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={dims.width} 
      height={dims.height} 
      className={`shrink-0 inline-block ${className}`} 
      aria-hidden="true" 
      {...props}
    >
      <path
        d="M3 21l3-3m0 0l2-2m-2 2l-2-2m4 2l1.5 1.5M12 7l-2 2m0 0L8 7m2 2l2 2M8 7L6.5 5.5M17 2l-2 2m0 0l-2-2m2 2l2 2m-2-2l1.5-1.5M12 12l2-2m2 2l2-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="7" y="15" width="4" height="4" rx="1" fill="currentColor" />
      <rect x="11" y="10" width="4" height="4" rx="1" fill="currentColor" />
      <rect x="15" y="5" width="4" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

// 3. StoneOven — Wood-fired stone oven symbol for Pide & Lahmacun
export function StoneOven({ className = "text-[#9C7A3F]", size = 20, width, height, ...props }) {
  const dims = getIconDimensions(size, width, height, 20);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={dims.width} 
      height={dims.height} 
      className={`shrink-0 inline-block ${className}`} 
      aria-hidden="true" 
      {...props}
    >
      <path
        d="M3 19v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M7 19v-4a5 5 0 0 1 10 0v4" fill="currentColor" opacity="0.3" />
      <path d="M12 14v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 4. OttomanStar — 8-point Ottoman star for rating & accents
export function OttomanStar({ className = "text-[#9C7A3F]", size = 16, width, height, ...props }) {
  const dims = getIconDimensions(size, width, height, 16);
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={dims.width} 
      height={dims.height} 
      className={`shrink-0 inline-block ${className}`} 
      aria-hidden="true" 
      {...props}
    >
      <path
        d="M12 2l2.4 5.6L20 10l-4.4 4.4L17 20l-5-3.2L7 20l1.4-5.6L4 10l5.6-2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
