import React, { useState } from 'react';

interface BrandIconProps {
  className?: string;
  size?: number;
  rounded?: boolean;
  usePng?: boolean;
}

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

  return (
    <img
      src={imgError || usePng ? '/icon.png' : '/icon.svg'}
      alt="The GDevelopers Icon"
      style={sizeStyle}
      className={`inline-block shrink-0 object-contain ${rounded ? 'rounded-xl' : ''} ${className}`}
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
  const [logoError, setLogoError] = useState(false);

  if (!showText) {
    return <BrandIcon size={iconSize} className={className} />;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={logoError ? '/logo.png' : '/logo.svg'}
        alt="The GDevelopers"
        style={{ height: `${iconSize}px`, width: 'auto' }}
        className="object-contain shrink-0 max-w-[200px]"
        onError={() => {
          if (!logoError) {
            setLogoError(true);
          }
        }}
        referrerPolicy="no-referrer"
      />
      {subtitle && (
        <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 shrink-0">
          {subtitle}
        </span>
      )}
    </div>
  );
};

