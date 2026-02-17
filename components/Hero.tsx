import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="relative overflow-hidden bg-brand-dark min-h-[500px] flex items-center justify-center">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan to-brand-purple mb-6 neon-text leading-tight p-2">
                    {t.heroTitle}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 font-light">
                    {t.heroSubtitle}
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button onClick={() => document.getElementById('games-section')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-blue hover:to-brand-purple text-white font-bold tracking-wide transition-all transform hover:scale-105 shadow-lg shadow-brand-purple/25 border border-white/10">
                        {t.cta}
                    </button>
                </div>
            </div>
            
            {/* Stats / Trust Badges */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8 border-t border-white/5 pt-8">
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-brand-card rounded-lg mb-3 border border-brand-cyan/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#06b6d4" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">{t.fastSecure}</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">{t.fastSecureDesc}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-brand-card rounded-lg mb-3 border border-brand-purple/20">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a855f7" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">{t.trusted}</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">{t.trustedDesc}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-brand-card rounded-lg mb-3 border border-brand-blue/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3b82f6" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">{t.support}</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">{t.supportDesc}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Hero;
