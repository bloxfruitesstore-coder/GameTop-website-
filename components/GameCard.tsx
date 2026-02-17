import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div 
      className="group relative bg-brand-card rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-brand-purple/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-purple/10"
      onClick={() => onSelect(game)}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={game.image} 
          alt={game.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-80"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-2xl font-orbitron font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">
            {game.name}
        </h3>
        <button className="mt-2 w-full py-2 bg-white/10 backdrop-blur-md rounded-lg text-sm font-semibold text-white border border-white/20 group-hover:bg-brand-purple group-hover:border-brand-purple transition-all flex items-center justify-center gap-2">
            <span>Top Up Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
        </button>
      </div>
    </div>
  );
};

export default GameCard;
