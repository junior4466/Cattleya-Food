import React from 'react';
import { CATEGORIES } from '../constants';

interface FilterBarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeCategory, onSelectCategory }) => {

  return (
    <div className="sticky top-[70px] z-40 py-4 -mx-4 px-4 md:mx-0 md:px-0 transition-all duration-300">
        {/* Glassmorphism Background Strip */}
        <div className="absolute inset-0 bg-bg-body/95 backdrop-blur-xl border-b border-white/5 md:rounded-2xl md:border md:top-2 md:bottom-2 md:bg-bg-surface/90 shadow-2xl"></div>

        <div className="relative container mx-auto">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 py-2 px-1 items-center">
            {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`
                    relative group flex items-center justify-center gap-2 md:gap-3 
                    px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl border transition-all duration-500 ease-out
                    select-none overflow-hidden flex-grow md:flex-grow-0
                    ${isActive 
                        ? 'border-gold/50 text-black shadow-[0_0_25px_rgba(212,175,55,0.3)] scale-[1.02]' 
                        : 'bg-black/40 border-white/5 text-text-muted hover:border-gold/30 hover:text-white hover:bg-white/5'
                    }
                    `}
                >
                    {/* Active Background - Gold Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    {/* Inactive Hover Effect - Subtle sheen */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out ${isActive ? 'hidden' : 'block'}`}></div>

                    {/* Content */}
                    <i className={`fas ${cat.icon} text-xs md:text-base relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 text-gold group-hover:text-white'}`}></i>
                    <span className={`text-xs md:text-base uppercase tracking-widest relative z-10 ${isActive ? 'font-bold' : 'font-medium'}`}>
                        {cat.label}
                    </span>
                </button>
                );
            })}
            </div>
        </div>
    </div>
  );
};

export default FilterBar;