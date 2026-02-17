import React, { useState } from 'react';
import { Game, TopUpPackage, Language } from '../types';
import { TRANSLATIONS, WHATSAPP_NUMBER } from '../constants';

interface TopUpModalProps {
  game: Game | null;
  onClose: () => void;
  language: Language;
}

const TopUpModal: React.FC<TopUpModalProps> = ({ game, onClose, language }) => {
  const [selectedPackage, setSelectedPackage] = useState<TopUpPackage | null>(null);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [gmail, setGmail] = useState('');
  // Player ID removed
  const [customGameName, setCustomGameName] = useState('');
  
  const t = TRANSLATIONS[language];

  if (!game) return null;

  const handlePlaceOrder = () => {
    if (!selectedPackage) return;
    
    // Construct WhatsApp Message
    const text = `
*طلب شحن جديد (حساب)* 🎮
------------------
*اللعبة:* ${game.id === 'other' && customGameName ? customGameName : game.name}
*العرض:* ${selectedPackage.amount}
*السعر:* ${selectedPackage.price} ${selectedPackage.currency}
------------------
*تفاصيل الحساب:*
*البريد:* ${gmail}
*الدولة:* ${country}
*المدينة:* ${city}
------------------
أرجو تنفيذ الطلب!
    `.trim();

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    window.open(url, '_blank');
  };

  // Check if form is valid (ID check removed)
  const isFormValid = selectedPackage && country && city && gmail && (game.id !== 'other' || customGameName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-brand-card w-full max-w-4xl rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        
        {/* Left Side: Image & Info */}
        <div className="w-full md:w-1/3 relative h-48 md:h-auto">
          <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent md:bg-gradient-to-l"></div>
          <div className="absolute bottom-4 right-4 md:top-8 md:right-6">
            <h2 className="text-3xl font-orbitron font-bold text-white neon-text font-cairo">{game.name}</h2>
            <p className="text-gray-300 text-sm mt-1 max-w-[200px] font-cairo">{game.description}</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto bg-brand-dark/50">
          <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="space-y-6">
            {/* Account Info Notice */}
            <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <p className="text-sm text-blue-200 font-cairo">{t.accountOffer}</p>
            </div>

            {/* Step 1: User Details */}
            <div>
                <h3 className="text-lg font-bold text-brand-cyan mb-2 flex items-center gap-2 font-cairo">
                    <span className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center text-xs">1</span>
                    {t.enterDetails}
                </h3>
                <div className="space-y-3 font-cairo">
                    {/* Custom Game Name for 'Other' */}
                    {game.id === 'other' && (
                         <input 
                            type="text" 
                            value={customGameName}
                            onChange={(e) => setCustomGameName(e.target.value)}
                            placeholder={t.gameNamePlaceholder}
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                        />
                    )}

                    {/* ID Input Removed */}

                    <input 
                        type="text" 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder={t.countryPlaceholder}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    />
                    <input 
                        type="text" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={t.cityPlaceholder}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    />
                    <input 
                        type="email" 
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                        placeholder={t.gmailPlaceholder}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    />
                </div>
            </div>

            {/* Step 2: Select Package */}
            <div>
                <h3 className="text-lg font-bold text-brand-purple mb-2 flex items-center gap-2 font-cairo">
                     <span className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center text-xs">2</span>
                    {t.selectPackage}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {game.packages.map((pkg) => (
                        <div 
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`
                                relative p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center text-center group
                                ${selectedPackage?.id === pkg.id 
                                    ? 'bg-brand-purple/20 border-brand-purple shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                }
                            `}
                        >
                            {/* Account Badge */}
                            <div className="absolute top-2 left-2 bg-brand-blue/20 text-brand-blue text-[10px] px-1.5 py-0.5 rounded border border-brand-blue/30 font-cairo">
                                {t.accountOfferBadge}
                            </div>

                            <span className="font-bold text-white text-lg font-cairo mt-4">{pkg.amount}</span>
                            {pkg.bonus && <span className="text-xs text-green-400 font-medium font-cairo">{pkg.bonus}</span>}
                            <span className="mt-2 text-sm text-gray-400 group-hover:text-white font-cairo">{t.price}: {pkg.price} {pkg.currency}</span>
                            
                            {selectedPackage?.id === pkg.id && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-brand-purple rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Action */}
            <div className="pt-4">
                <button 
                    disabled={!isFormValid}
                    onClick={handlePlaceOrder}
                    className={`
                        w-full py-4 rounded-xl font-bold text-lg tracking-wider flex items-center justify-center gap-2 transition-all font-cairo
                        ${!isFormValid
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-lg shadow-green-500/20 transform hover:scale-[1.02]'
                        }
                    `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                         <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    {t.placeOrder}
                </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopUpModal;