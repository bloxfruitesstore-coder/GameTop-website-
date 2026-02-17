import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  return (
    <footer className="bg-brand-dark border-t border-white/5 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
             <div className="w-6 h-6 bg-gradient-to-tr from-brand-purple to-brand-blue rounded flex items-center justify-center">
              <span className="font-bold text-xs text-white">G</span>
            </div>
            <span className="font-orbitron font-bold text-lg text-white">GAMETOP HUB</span>
        </div>
        <div className="flex justify-center gap-6 mb-6 text-sm text-gray-400">
            <a href="#" className="hover:text-brand-cyan transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">Contact</a>
        </div>
        <p className="text-gray-600 text-xs">
          {t.footerText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
