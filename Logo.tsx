import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  lightText?: boolean;
}

export default function Logo({ className = '', showText = false, lightText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className || 'h-10 md:h-12'}`}>
      {/* 
        Pour utiliser votre propre image, décommentez la ligne ci-dessous 
        et commentez le SVG. Assurez-vous d'avoir uploadé 'LOGO NOYA TCH-03.png' dans le dossier 'public'.
      */}
      <img src="/LOGO NOYA TCH-03.png" alt="Infinite Core Logo" className="h-full max-h-[140px] w-auto object-contain max-w-full" onError={(e) => {
        // Fallback to SVG if image is not found
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }} />
      
      {/* Fallback SVG Logo (similar to the provided image structure) */}
      <svg className="h-full max-h-[140px] w-auto hidden" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Infinity network structure */}
        <path d="M25 30 C 25 10, 45 10, 50 30 C 55 50, 75 50, 75 30 C 75 10, 55 10, 50 30 C 45 50, 25 50, 25 30 Z" stroke="#2B547E" strokeWidth="1.5" fill="none" />
        <path d="M15 30 C 15 5, 48 5, 50 30 C 52 55, 85 55, 85 30 C 85 5, 52 5, 50 30 C 48 55, 15 55, 15 30 Z" stroke="#2B547E" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M35 30 C 35 20, 42 20, 50 30 C 58 40, 65 40, 65 30 C 65 20, 58 20, 50 30 C 42 40, 35 40, 35 30 Z" stroke="#2B547E" strokeWidth="1" fill="none" opacity="0.6" />
        
        {/* Nodes */}
        <circle cx="25" cy="30" r="3" fill="#2B547E" />
        <circle cx="75" cy="30" r="3" fill="#2B547E" />
        <circle cx="15" cy="30" r="2.5" fill="#2B547E" />
        <circle cx="85" cy="30" r="2.5" fill="#2B547E" />
        <circle cx="35" cy="20" r="2.5" fill="#8B6B5D" />
        <circle cx="65" cy="40" r="2.5" fill="#8B6B5D" />
        <circle cx="35" cy="40" r="2.5" fill="#8B6B5D" />
        <circle cx="65" cy="20" r="2.5" fill="#8B6B5D" />
        
        {/* Central Core */}
        <circle cx="50" cy="30" r="6" fill="#2B547E" />
        <circle cx="50" cy="30" r="3" fill="#D98A2C" filter="blur(1px)" />
      </svg>

      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`text-3xl font-bold leading-none tracking-tight ${lightText ? 'text-white' : 'text-[#D98A2C]'}`}>
            Infinite
          </span>
          <span className={`text-xl font-light leading-none tracking-widest ${lightText ? 'text-gray-300' : 'text-[#2B547E]'}`}>
            CORE
          </span>
        </div>
      )}
    </div>
  );
}
