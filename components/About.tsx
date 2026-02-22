import React from 'react';
import { chefs, siteContent } from '../data';

const About: React.FC = () => {
  const displayChefs = chefs.slice(0, 3);
  const remainingCount = chefs.length > 3 ? chefs.length - 3 : 0;
  const totalCountLabel = remainingCount > 0 ? `+${remainingCount + 12}` : '+15';
  
  const { about } = siteContent;

  return (
    <section id="about" className="py-16 md:py-28 bg-bg-body relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="grid md:grid-cols-2 gap-10 md:gap-10 lg:gap-20 items-center">
            {/* Image Column */}
            <div className="relative order-2 md:order-1 animate-fade-up mt-8 md:mt-0">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] md:aspect-square max-w-md mx-auto md:max-w-full">
                    <img 
                        src={about.mainImage} 
                        alt="Interior do restaurante" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border border-gold/20 rounded-2xl -z-10 hidden md:block"></div>
                <div className="absolute -top-6 -left-6 w-2/3 h-2/3 bg-gold/5 rounded-2xl -z-10 hidden md:block blur-xl"></div>
            </div>

            {/* Content Column */}
            <div className="order-1 md:order-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="mb-6 text-left">
                    <span className="text-gold text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 block">
                        <i className="fas fa-certificate mr-2"></i>
                        {about.badgeText} • {about.badgeSubtext}
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-text-main leading-tight mb-4 md:mb-6">
                        {about.titlePart1} <span className="text-gold italic">{about.titleHighlight}</span> {about.titlePart2}
                    </h2>
                    <p className="font-body text-lg md:text-xl text-text-muted leading-relaxed mb-8">
                        {about.description}
                    </p>
                </div>

                {/* Features Grid - Standard Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    {about.features.map((feature, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                                <i className={`${feature.icon} text-lg`}></i>
                            </div>
                            <div>
                                <h4 className="font-heading text-lg text-white mb-1">{feature.title}</h4>
                                <p className="text-xs text-text-muted opacity-70 uppercase tracking-wider">{feature.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team / Signature */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-white/10 justify-center md:justify-start">
                    <div className="flex -space-x-3">
                        {displayChefs.map((chef) => (
                            <img 
                                key={chef.id}
                                className="w-12 h-12 rounded-full border-2 border-bg-body object-cover" 
                                src={chef.image} 
                                alt={chef.name}
                                title={chef.name}
                            />
                        ))}
                        <div className="w-12 h-12 rounded-full border-2 border-bg-body bg-gold flex items-center justify-center text-xs text-black font-bold">
                            {totalCountLabel}
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="font-heading text-xl text-white">Nossa Equipe</p>
                        <p className="text-xs text-gold uppercase tracking-widest">Chefs & Sommeliers</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;