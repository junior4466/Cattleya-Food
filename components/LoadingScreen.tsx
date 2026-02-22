import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const quotes = [
      "A arte de cozinhar é a arte de amar.",
      "Sabores que contam histórias.",
      "Excelência em cada detalhe.",
      "Preparando sua experiência..."
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_rgba(5,5,5,1)_70%)] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Mark */}
        <div className="mb-8 opacity-0 animate-[fadeUp_1s_ease-out_forwards]">
            <div className="w-16 h-16 border border-gold/30 rotate-45 flex items-center justify-center">
                <div className="w-12 h-12 border border-gold/60 flex items-center justify-center">
                    <i className="fas fa-utensils text-gold text-xl -rotate-45"></i>
                </div>
            </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-heading text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold-dim tracking-tighter opacity-0 animate-[fadeUp_1s_ease-out_0.3s_forwards] mb-2">
          Cattleya
        </h1>
        
        {/* Subtitle */}
        <p className="text-gold/60 font-body text-lg italic tracking-widest opacity-0 animate-[fadeUp_1s_ease-out_0.5s_forwards]">
          Alta Gastronomia
        </p>

        {/* Separator Line */}
        <div className="w-12 h-[1px] bg-gold/30 my-8 opacity-0 animate-[fadeUp_1s_ease-out_0.7s_forwards]"></div>

        {/* Dynamic Quote */}
        <p className="text-text-muted/60 font-body text-sm tracking-wide mb-12 h-6 opacity-0 animate-[fadeUp_1s_ease-out_0.9s_forwards]">
          {quote}
        </p>

        {/* Minimalist Progress Section */}
        <div className="w-64 md:w-96 flex flex-col items-center gap-4 opacity-0 animate-[fadeUp_1s_ease-out_1.1s_forwards]">
            {/* Percentage Number */}
            <span className="font-heading text-4xl text-gold tabular-nums">
                {progress}
                <span className="text-base align-top ml-1 opacity-50">%</span>
            </span>

            {/* Progress Line */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-gold to-transparent w-full transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(${progress - 100}%)` }}
                ></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
