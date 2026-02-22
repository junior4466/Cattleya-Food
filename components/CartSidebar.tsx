import React from 'react';
import { CartItem } from '../types';
import { formatPrice } from '../utils';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
  onCheckout: () => void;
  deliveryFee: number;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, onClose, cart, onUpdateQty, onRemove, onClear, onCheckout, deliveryFee 
}) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (cart.length > 0 ? deliveryFee : 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[1100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar - Used h-[100dvh] for mobile browsers to account for address bars */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-full md:w-[450px] bg-bg-surface border-l border-gold/10 z-[1101] transform transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header - shrink-0 prevents it from collapsing */}
        <div className="p-5 md:p-6 border-b border-white/5 flex justify-between items-center bg-bg-card shrink-0 shadow-lg z-10">
          <h2 className="font-heading text-2xl text-gold flex items-center gap-3">
            <i className="fas fa-shopping-bag"></i> Meu Carrinho
          </h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:text-gold hover:bg-white/5 transition-all">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Scrollable Content - flex-1 takes available space */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-50">
              <i className="fas fa-shopping-cart text-5xl mb-4 text-gold/30"></i>
              <p className="text-lg">Seu carrinho está vazio</p>
              <button onClick={onClose} className="mt-4 text-sm text-gold hover:underline">Voltar ao cardápio</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-white/5 p-3 md:p-4 rounded-xl border border-white/5 hover:border-gold/20 hover:bg-white/10 transition-all group">
                <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start gap-2">
                      <h4 className="font-heading text-text-main leading-tight line-clamp-2 text-base md:text-lg">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all" aria-label="Remover item"><i className="fas fa-trash-alt text-sm"></i></button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-2">
                    <div className="text-gold font-bold text-sm md:text-base">{formatPrice(item.price * item.quantity)}</div>
                    
                    <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/10">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-xs text-text-muted hover:text-gold hover:bg-white/5 rounded active:scale-90 transition-all" aria-label="Diminuir quantidade"><i className="fas fa-minus"></i></button>
                      <span className="text-sm font-bold w-6 text-center tabular-nums">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-xs text-text-muted hover:text-gold hover:bg-white/5 rounded active:scale-90 transition-all" aria-label="Aumentar quantidade"><i className="fas fa-plus"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - shrink-0 ensures it stays at bottom */}
        {cart.length > 0 && (
          <div className="p-5 md:p-6 bg-bg-card border-t border-white/5 space-y-3 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-text-muted">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                <span>Taxa de entrega</span>
                <span>{formatPrice(deliveryFee)}</span>
                </div>
            </div>
            
            <div className="flex justify-between text-gold font-bold text-xl pt-4 border-t border-white/10">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <div className="grid grid-cols-[1fr_2fr] gap-3 mt-4">
              <button onClick={onClear} className="py-4 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 hover:border-red-500/50 transition-colors text-base uppercase tracking-wide font-medium">
                Limpar
              </button>
              <button onClick={onCheckout} className="py-4 bg-gradient-to-r from-gold to-gold-dim text-black font-bold rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all text-base uppercase tracking-wide flex items-center justify-center gap-2">
                <span>Finalizar Pedido</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;