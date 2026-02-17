import React from 'react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
}

const Navbar: React.FC<NavbarProps> = ({ language }) => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-brand-dark/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 bg-gradient-to-tr from-brand-purple to-brand-blue rounded-lg flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="font-orbitron font-bold text-xl tracking-wider text-white">
              GAMETOP <span className="text-brand-purple">HUB</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Language toggle removed - Arabic only */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;