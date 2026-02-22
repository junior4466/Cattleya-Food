import React, { useState, useEffect, useRef } from 'react';
import { testimonials, siteContent } from '../data';

const SocialProof: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const { stats } = siteContent;

  // Responsive logic for items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic Carousel Logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerPage]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = testimonials.length - itemsPerPage;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = testimonials.length - itemsPerPage;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-24 bg-bg-surface relative border-t border-b border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] bg-[length:24px_24px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Statistics Bar - Modernized */}
        <div className="relative mb-16 md:mb-24 animate-fade-up max-w-5xl mx-auto">
           {/* Glow Effect behind the panel */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[80px] rounded-full pointer-events-none"></div>

           <div className="bg-bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 gap-8 sm:gap-0">
                 {stats.map((stat) => (
                   <div key={stat.id} className="flex flex-col items-center justify-center p-2 text-center group">
                      {/* Icon */}
                      <div className="mb-3 md:mb-4 relative">
                         <div className="absolute inset-0 bg-gold blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
                         <i className={`fas ${stat.icon} text-2xl text-gold/80 relative z-10 group-hover:-translate-y-1 transition-transform duration-300`}></i>
                      </div>
                      
                      {/* Value with Gradient Text */}
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fcf6ba] via-[#d4af37] to-[#aa771c] mb-2 md:mb-3 drop-shadow-sm leading-tight">
                         {stat.value}
                      </h3>
                      
                      {/* Label with styled separator */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="w-8 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-gold/50 transition-all duration-500"></span>
                        <p className="text-xs md:text-sm text-text-muted uppercase tracking-[0.25em] font-medium">
                           {stat.label}
                        </p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
           <span className="text-gold text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 md:mb-3 block">Depoimentos</span>
           <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-main">Excelência Reconhecida</h2>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group animate-fade-up" 
          style={{ animationDelay: '0.4s' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
            {/* Carousel Track */}
            <div className="overflow-hidden -mx-4 px-4 py-4"> {/* Negative margin to allow shadow overflow */}
               <div 
                 className="flex transition-transform duration-700 ease-in-out"
                 style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
               >
                 {testimonials.map((item) => (
                   <div 
                     key={item.id} 
                     className="px-2 md:px-3 shrink-0"
                     style={{ width: `${100 / itemsPerPage}%` }}
                   >
                     <div className="bg-bg-card border border-white/5 p-6 md:p-8 rounded-2xl relative hover:border-gold/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col shadow-lg">
                        {/* Quote Icon */}
                        <div className="absolute top-4 right-6 md:top-6 md:right-8 text-4xl md:text-6xl text-gold/10 font-serif leading-none transition-colors">
                          &rdquo;
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 text-gold text-xs mb-4 md:mb-6">
                           {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < Math.floor(item.rating) ? '' : 'text-gray-600'}`}></i>
                           ))}
                           <span className="ml-2 text-text-muted text-xs font-bold">{item.rating}</span>
                        </div>

                        {/* Content */}
                        <p className="font-body text-base md:text-lg text-text-muted leading-relaxed mb-6 md:mb-8 italic relative z-10 flex-1">
                          "{item.content}"
                        </p>

                        {/* Meta Data (Date & Location) */}
                        <div className="flex justify-between items-center text-[10px] text-text-muted/60 mb-4 border-b border-white/5 pb-4 uppercase tracking-wider font-bold">
                           <span><i className="far fa-calendar mr-1"></i> {item.date}</span>
                           <span><i className="fas fa-map-marker-alt mr-1"></i> {item.location}</span>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-3 md:gap-4">
                           <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gold/30"
                           />
                           <div>
                              <h4 className="font-heading text-white text-base md:text-lg leading-tight">{item.name}</h4>
                              <span className="text-[10px] md:text-xs text-gold uppercase tracking-wider font-bold">{item.role}</span>
                           </div>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Navigation Buttons (Desktop) */}
            <button 
              onClick={prevSlide}
              className="absolute top-1/2 -left-2 md:-left-6 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-bg-body border border-gold/20 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all shadow-xl opacity-100 md:opacity-0 group-hover:opacity-100 z-20"
            >
              <i className="fas fa-chevron-left text-xs md:text-base"></i>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute top-1/2 -right-2 md:-right-6 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-bg-body border border-gold/20 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all shadow-xl opacity-100 md:opacity-0 group-hover:opacity-100 z-20"
            >
              <i className="fas fa-chevron-right text-xs md:text-base"></i>
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
               {Array.from({ length: testimonials.length - itemsPerPage + 1 }).map((_, idx) => (
                 <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-white/20 hover:bg-gold/50'}`}
                 ></button>
               ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;