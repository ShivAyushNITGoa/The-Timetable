import React, { useState } from 'react';

interface BrandIconProps {
  className?: string;
  size?: number;
  rounded?: boolean;
  usePng?: boolean;
}

/**
 * Authentic SVG Vector Icon for The GDevelopers brand
 */
export const BrandIconSvg: React.FC<{
  size?: number;
  className?: string;
  rounded?: boolean;
}> = ({ size = 32, className = '', rounded = true }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`inline-block shrink-0 select-none ${rounded ? 'rounded-lg' : ''} ${className}`}
      aria-label="The GDevelopers Icon"
    >
      <defs>
        <linearGradient id="tgdBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b0b91a" />
          <stop offset="100%" stopColor="#9da415" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="104" fill="url(#tgdBrandGrad)" />
      <path
        d="M 256 128 C 358.4 128, 384 192, 384 256 C 384 320, 358.4 384, 256 384 C 153.6 384, 128 320, 128 256 L 192 256 C 192 288, 204.8 320, 256 320 C 307.2 320, 320 288, 320 256 C 320 224, 307.2 192, 256 192 L 256 256 L 192 256 L 192 128 L 256 128 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

/**
 * The GDevelopers brand icon from authentic GitHub repository
 */
export const BrandIcon: React.FC<BrandIconProps> = ({
  className = 'w-8 h-8',
  size,
  rounded = true,
  usePng = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const sizeStyle = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  // Use crisp inline vector SVG by default to avoid browser caching issues or network latency
  if (!usePng) {
    return <BrandIconSvg size={size} className={className} rounded={rounded} />;
  }

  return (
    <img
      src={imgError ? '/icon.svg?v=2' : '/icon.png?v=2'}
      alt="The GDevelopers Icon"
      style={sizeStyle}
      className={`inline-block shrink-0 object-contain ${rounded ? 'rounded-lg' : ''} ${className}`}
      onError={() => {
        if (!imgError) {
          setImgError(true);
        }
      }}
      referrerPolicy="no-referrer"
    />
  );
};

interface BrandLogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'auto';
  subtitle?: string;
}

/**
 * The GDevelopers full brand logo from authentic GitHub repository
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  iconSize = 34,
  showText = true,
  subtitle,
}) => {
  if (!showText) {
    return <BrandIcon size={iconSize} className={className} />;
  }

  return (
    <div
      className={`inline-flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-2 select-none max-w-full ${className}`}
    >
      <BrandIconSvg size={iconSize} rounded={true} />
      <div className="flex items-center gap-1 text-slate-900 tracking-tight leading-none select-none font-bold text-base sm:text-lg">
        <span className="text-[#b0b91a]">The</span>
        <span className="text-slate-900 font-black">GDevelopers</span>
      </div>
      {subtitle && (
        <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-center max-w-full break-words shadow-2xs">
          {subtitle}
        </span>
      )}
    </div>
  );
};

