import React from 'react';

// Custom Cat Paw Print Icon
export function CatPawIcon({ size = 20, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central main pad */}
      <path d="M12 10.5C9.5 10.5 7.5 12.8 7.5 15.5c0 2.2 1.8 4 4.5 4s4.5-1.8 4.5-4c0-2.7-2-5-4.5-5z" opacity="0.9" />
      {/* Toe beans */}
      <ellipse cx="6.5" cy="9" rx="1.8" ry="2.4" transform="rotate(-20 6.5 9)" />
      <ellipse cx="10.2" cy="6.2" rx="1.8" ry="2.5" transform="rotate(-6 10.2 6.2)" />
      <ellipse cx="13.8" cy="6.2" rx="1.8" ry="2.5" transform="rotate(6 13.8 6.2)" />
      <ellipse cx="17.5" cy="9" rx="1.8" ry="2.4" transform="rotate(20 17.5 9)" />
    </svg>
  );
}

// Hand-drawn Cat Sleeping on Coffee Mug Illustration (High Contrast Palette)
export function CatCoffeeIllustration({ size = 70 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Warm Steam Wisps */}
      <path d="M35 14c-2-3 2-6 0-9" stroke="#E5B86E" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
      <path d="M43 16c-2-3 2-6 0-9" stroke="#D9A85C" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
      
      {/* Coffee Cup Body */}
      <path d="M22 36h36v20c0 9-7 16-16 16h-4c-9 0-16-7-16-16V36z" fill="#462C1E" stroke="#E5B86E" strokeWidth="2.2" strokeLinejoin="round" />
      
      {/* Cup Handle */}
      <path d="M58 42c5 0 9 3 9 7s-4 7-9 7" stroke="#E5B86E" strokeWidth="2.2" strokeLinecap="round" />
      
      {/* Saucer */}
      <ellipse cx="40" cy="73" rx="26" ry="4" fill="#351D12" stroke="#E5B86E" strokeWidth="1.8" />
      
      {/* Coffee Liquid */}
      <ellipse cx="40" cy="38" rx="16" ry="3.5" fill="#D9A85C" opacity="0.95" />
      
      {/* Curled Sleeping Cat on rim */}
      {/* Cat Body */}
      <path d="M26 36c0-6 5-11 12-11 8 0 14 5 14 11" fill="#E5B86E" stroke="#2C1810" strokeWidth="1.8" />
      {/* Cat Head */}
      <circle cx="28" cy="31" r="7" fill="#F5E6D3" stroke="#2C1810" strokeWidth="1.8" />
      {/* Cat Ears */}
      <polygon points="23,26 21,19 28,24" fill="#D9A85C" stroke="#2C1810" strokeWidth="1.6" />
      <polygon points="30,24 35,19 34,26" fill="#D9A85C" stroke="#2C1810" strokeWidth="1.6" />
      {/* Sleeping Eyes (curved lines) */}
      <path d="M24 31c1 1 2 1 3 0" stroke="#2C1810" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M28 31c1 1 2 1 3 0" stroke="#2C1810" strokeWidth="1.6" strokeLinecap="round" />
      {/* Cute Whiskers */}
      <line x1="20" y1="31" x2="15" y2="30" stroke="#2C1810" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="20" y1="33" x2="15" y2="34" stroke="#2C1810" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="33" y1="31" x2="38" y2="30" stroke="#2C1810" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="33" y1="33" x2="38" y2="34" stroke="#2C1810" strokeWidth="1.4" strokeLinecap="round" />
      {/* Cat Tail curled */}
      <path d="M52 36c4 0 6-3 6-6s-2-5-5-5" stroke="#E5B86E" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

// Hand-drawn ornamental divider with cat paw
export function RusticDivider({ children }) {
  return (
    <div className="rustic-divider">
      {children || <CatPawIcon size={16} className="text-amber" />}
    </div>
  );
}

export default function LandingView({ onEnterMenu }) {
  return (
    <div className="booklet-cover-container">
      <div className="booklet-cover">
        {/* Honey Amber Bookmark Ribbon */}
        <div className="cover-ribbon" title="Menu Bookmark"></div>

        {/* Double Inner Framing Border */}
        <div className="cover-inner-border"></div>

        {/* Café Badge */}
        <div className="cover-cafe-badge">
          Artisanal Cat Café • Est. 2024
        </div>

        {/* Main Heading: Paws and Coffee */}
        <h1 className="cover-main-heading">
          Paws and Coffee
        </h1>

        <div className="cover-title-sub">
          Purrs, Specialty Brews & Recipes
        </div>

        {/* Cat & Coffee Cup Illustration */}
        <div className="cat-cafe-emblem">
          <div className="cat-illustration-box">
            <CatCoffeeIllustration size={72} />
          </div>
        </div>

        {/* Ornamental Divider */}
        <RusticDivider />

        {/* Warm Cat Cafe Quote */}
        <p className="cover-quote">
          &ldquo;Warm amber sunlight, freshly steamed milk, and the gentle purr of our resident café cats.&rdquo;
        </p>

        {/* Open Booklet Action Button (Warm rounded, NOT pill-shaped) */}
        <button 
          id="enter-menu-button"
          className="btn-open-booklet"
          onClick={onEnterMenu}
          aria-label="Open Paws and Coffee Menu Booklet"
        >
          <CatPawIcon size={18} />
          <span>Open Menu Booklet</span>
          <span style={{ fontSize: '1.1rem' }}>→</span>
        </button>

        <div className="cover-footer-note">
          Cat Lounge Open • Walk-ins & Reservations Welcome
        </div>
      </div>
    </div>
  );
}
