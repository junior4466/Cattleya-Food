import React from 'react';
import { siteContent } from '../data';

interface HeroProps {
  onViewMenu: () => void;
  onViewHighlights: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewMenu, onViewHighlights }) => {
  const { title, subtitle, backgroundImage } = siteContent.hero;

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center animate-[zoomSlow_25s_infinite_alternate]"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle,rgba(0,0,0,0.2)_0%,rgba(5,5,5,0.9)_100%)]"></div>
      
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center justify-center h-full pt-20 md:pt-0">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 text-gradient opacity-0 animate-fade-up px-2 text-center leading-tight" style={{ animationDelay: '0.2s' }}>
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-2xl font-body italic text-text-main mb-8 sm:mb-10 max-w-2xl opacity-0 animate-fade-up px-4 text-center" style={{ animationDelay: '0.5s' }}>
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up w-full sm:w-auto px-8 sm:px-0 items-center" style={{ animationDelay: '0.8s' }}>
          <button 
            onClick={onViewHighlights}
            className="w-full sm:w-auto min-w-[200px] px-8 py-4 bg-gradient-to-br from-gold to-gold-dim text-black font-bold uppercase tracking-widest text-sm rounded hover:scale-105 transition-transform shadow-[0_5px_20px_rgba(212,175,55,0.3)]"
          >
            Ver Destaques
          </button>
          <button 
            onClick={onViewMenu}
            className="w-full sm:w-auto min-w-[200px] px-8 py-4 bg-transparent border border-gold text-gold font-bold uppercase tracking-widest text-sm rounded hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all"
          >
            Cardápio Completo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;