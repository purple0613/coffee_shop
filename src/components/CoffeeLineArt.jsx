import React from 'react';

// Single-color minimalist line-art outline for Purr-fect Espresso Romano
export function EspressoRomanoArt({ size = 48, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`coffee-line-art ${className}`}
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Delicate Steam Wisps */}
      <path d="M28 14c-1.5-2.5 1-4.5 0-7" strokeWidth="1.4" opacity="0.8" />
      <path d="M35 15c-1.5-2.5 1-4.5 0-7" strokeWidth="1.4" opacity="0.8" />

      {/* Demitasse Cup Body */}
      <path d="M18 28h28v14c0 7.7-6.3 14-14 14s-14-6.3-14-14V28z" />
      
      {/* Cup Rim Ellipse */}
      <ellipse cx="32" cy="28" rx="14" ry="3" />

      {/* Crema & Espresso Liquid Lines */}
      <path d="M19.5 33c3.5 1.5 21.5 1.5 25 0" strokeDasharray="1 2.5" />
      <path d="M20 37c3.5 1.5 20.5 1.5 24 0" />

      {/* Small Demitasse Handle */}
      <path d="M46 31c3.5 0 6 2.2 6 5.5s-2.5 5.5-6 5.5" />

      {/* Saucer */}
      <path d="M10 56c5 3 39 3 44 0" />
      <line x1="14" y1="56" x2="50" y2="56" strokeWidth="1.2" />

      {/* Curly Lemon Peel Twist on Rim */}
      <path d="M16 26c-3-2-2-6 2-7s6 2 4 6c-1 2-4 3-6 1" strokeWidth="1.6" />
    </svg>
  );
}

// Single-color minimalist line-art outline for Honey Lavender Calico Cold Brew
export function ColdBrewArt({ size = 48, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`coffee-line-art ${className}`}
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Glass Straw */}
      <path d="M38 6l-6 16" strokeWidth="2" />
      
      {/* Tall Highball Glass Outline */}
      <path d="M20 16h24l-3 41c-.2 2.2-2 4-4.2 4H27.2c-2.2 0-4-1.8-4.2-4L20 16z" />
      <ellipse cx="32" cy="16" rx="12" ry="2.5" />

      {/* Cold Foam Layer on Top */}
      <path d="M20.6 24c3 1 20 1 22.8 0" strokeDasharray="1 2" />
      
      {/* Floating Ice Cubes */}
      <rect x="25" y="27" width="6" height="6" rx="1" transform="rotate(12 25 27)" strokeWidth="1.4" />
      <rect x="33" y="35" width="6" height="6" rx="1" transform="rotate(-15 33 35)" strokeWidth="1.4" />
      <rect x="26" y="44" width="5.5" height="5.5" rx="1" transform="rotate(8 26 44)" strokeWidth="1.4" />

      {/* Bottom Honey Layer Line */}
      <path d="M23.5 53c2 .8 15 .8 17 0" />

      {/* Tiny Lavender Sprig Outline on rim */}
      <path d="M43 14c2-4 5-6 7-7" strokeWidth="1.2" />
      <circle cx="48" cy="8" r="1.2" />
      <circle cx="50" cy="10" r="1.2" />
    </svg>
  );
}

// Single-color minimalist line-art outline for Golden Caramel Meowcchiato
export function MeowcchiatoArt({ size = 48, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`coffee-line-art ${className}`}
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Gentle Steam */}
      <path d="M30 11c-1-2 1-4 0-6" strokeWidth="1.4" opacity="0.8" />
      <path d="M36 12c-1-2 1-4 0-6" strokeWidth="1.4" opacity="0.8" />

      {/* Glass Mug Body with Foot */}
      <path d="M20 20h24v26c0 6.6-5.4 12-12 12s-12-5.4-12-12V20z" />
      <ellipse cx="32" cy="20" rx="12" ry="2.5" />

      {/* Mug Handle */}
      <path d="M44 26c4.5 0 7.5 3 7.5 7.5S48.5 41 44 41" />

      {/* Mug Base / Foot */}
      <path d="M26 58h12" strokeWidth="2.2" />

      {/* 3 Visible Layers */}
      {/* 1. Top Thick Microfoam Layer */}
      <path d="M20.5 28c3 1 20 1 23 0" />
      {/* 2. Middle Espresso Layer */}
      <path d="M20.8 38c3 1 19.5 1 22.4 0" strokeDasharray="1.5 2.5" />
      {/* 3. Bottom Vanilla Milk */}
      <path d="M22 47c2.5.8 17.5.8 20 0" />

      {/* Criss-Cross Caramel Drizzle Lines on Foam */}
      <path d="M26 19l12 2M27 21l10-2" strokeWidth="1.2" />
      
      {/* Cute Little Cat Ears Froth Outline */}
      <path d="M27 18l2-4 2 3M33 17l2-3 2 4" strokeWidth="1.2" />
    </svg>
  );
}

// Helper to render appropriate line art based on coffee ID
export function CoffeeIcon({ id, size = 48, className = "" }) {
  switch (id) {
    case 'purr-fect-espresso-romano':
      return <EspressoRomanoArt size={size} className={className} />;
    case 'honey-lavender-calico-cold-brew':
      return <ColdBrewArt size={size} className={className} />;
    case 'golden-caramel-meowcchiato':
      return <MeowcchiatoArt size={size} className={className} />;
    default:
      return <EspressoRomanoArt size={size} className={className} />;
  }
}
