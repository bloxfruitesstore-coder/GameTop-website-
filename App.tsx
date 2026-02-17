import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameCard from './components/GameCard';
import TopUpModal from './components/TopUpModal';
import GeminiChat from './components/GeminiChat';
import Footer from './components/Footer';
import { GAMES, TRANSLATIONS } from './constants';
import { Game, Language } from './types';

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  // Default and only language is Arabic
  const [language] = useState<Language>('ar');
  const [sortOption, setSortOption] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const t = TRANSLATIONS[language];

  const filteredAndSortedGames = useMemo(() => {
    let gamesCopy = [...GAMES];

    // 1. Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      gamesCopy = gamesCopy.filter(game => 
        game.name.toLowerCase().includes(query)
      );
    }

    // 2. Sort
    switch (sortOption) {
      case 'name-asc':
        return gamesCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return gamesCopy.sort((a, b) => b.name.localeCompare(a.name));
      case 'packages':
        return gamesCopy.sort((a, b) => b.packages.length - a.packages.length);
      default:
        return gamesCopy;
    }
  }, [sortOption, searchQuery]);

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-purple selection:text-white dir-rtl" dir="rtl">
      <Navbar language={language} />
      
      <main>
        <Hero language={language} />

        <div id="games-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="h-8 w-1 bg-brand-cyan rounded-full"></div>
              <h2 className="text-3xl font-orbitron font-bold text-white font-cairo">{t.featuredGames}</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative group w-full sm:w-64">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 group-focus-within:text-brand-purple transition-colors">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="w-full bg-brand-card/50 border border-white/5 text-white text-sm rounded-lg pr-10 pl-4 py-2 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple placeholder-gray-500 transition-all font-cairo"
                    />
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3 bg-brand-card/50 px-4 py-2 rounded-lg border border-white/5">
                  <span className="text-sm text-gray-400 whitespace-nowrap font-cairo">{t.sortBy}:</span>
                  <select 
                    value={sortOption} 
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer w-full sm:w-auto font-cairo"
                  >
                    <option value="default" className="bg-brand-card text-gray-200">{t.sortDefault}</option>
                    <option value="name-asc" className="bg-brand-card text-gray-200">{t.sortNameAsc}</option>
                    <option value="name-desc" className="bg-brand-card text-gray-200">{t.sortNameDesc}</option>
                    <option value="packages" className="bg-brand-card text-gray-200">{t.sortPackages}</option>
                  </select>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedGames.length > 0 ? (
                filteredAndSortedGames.map((game) => (
                    <GameCard 
                        key={game.id} 
                        game={game} 
                        onSelect={setSelectedGame} 
                    />
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 bg-brand-card/20 rounded-xl border border-white/5 border-dashed">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                    <p className="text-lg font-medium font-cairo">{t.noGamesFound} "{searchQuery}"</p>
                </div>
            )}
          </div>
        </div>
      </main>

      <Footer language={language} />
      
      <TopUpModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
        language={language}
      />

      <GeminiChat language={language} />
    </div>
  );
}

export default App;