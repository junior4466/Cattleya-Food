import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../utils';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:border-gold/30 transition-all duration-500 group h-full">
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-black/50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          loading="lazy"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/80 backdrop-blur-md text-gold px-3 py-1.5 text-[10px] md:text-xs uppercase tracking-widest border border-gold/20 rounded-full shadow-lg font-bold z-10">
          {product.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 md:p-5 lg:p-6 flex flex-col flex-1 bg-gradient-to-b from-bg-card to-bg-surface">
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="font-heading text-xl text-text-main leading-tight group-hover:text-gold transition-colors line-clamp-2">{product.name}</h3>
          <span className="font-bold text-gold whitespace-nowrap text-lg md:text-xl drop-shadow-md">{formatPrice(product.price)}</span>
        </div>
        
        <p className="text-text-muted text-sm md:text-sm lg:text-base leading-relaxed mb-6 flex-1 line-clamp-3 md:line-clamp-none opacity-80">{product.description}</p>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-5 border-t border-white/5 mt-auto gap-4 md:gap-3 lg:gap-0">
          <span className="text-text-muted text-xs md:text-xs lg:text-sm flex items-center gap-2 w-full md:w-auto opacity-70">
            <i className="far fa-clock text-gold"></i> {product.prepTime}
          </span>
          
          <button 
            onClick={() => onAdd(product)}
            className="
              w-full md:w-auto 
              h-12 md:h-10 lg:h-auto
              min-h-[40px] lg:min-h-[48px]
              px-6 lg:px-8 py-2 lg:py-3 
              rounded-full 
              bg-white/5 border border-white/10 
              text-sm lg:text-sm font-bold uppercase tracking-wider 
              text-text-main 
              hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] 
              active:scale-[0.98] active:bg-gold-dim
              transition-all duration-300 
              flex items-center justify-center gap-2 lg:gap-3
            "
          >
            <i className="fas fa-plus text-xs lg:text-sm"></i> 
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;