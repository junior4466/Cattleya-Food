import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { formatPrice } from '../utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  deliveryFee: number;
  onConfirm: (order: Order) => Promise<void>;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, deliveryFee, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Order>({
    clientName: '',
    clientPhone: '',
    type: 'Delivery',
    address: '',
    paymentMethod: 'Pix',
    observations: '',
    coupon: ''
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const total = subtotal + (formData.type === 'Delivery' ? deliveryFee : 0);
  const discount = formData.coupon === 'BEMVINDO15' ? subtotal * 0.15 : 0;
  const finalTotal = total - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onConfirm({ ...formData });
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const paymentMethods = [
    { id: 'Pix', label: 'Pix' },
    { id: 'Cartão de Crédito', label: 'Cartão de Crédito' },
    { id: 'Cartão de Débito', label: 'Cartão de Débito' },
    { id: 'Dinheiro', label: 'Dinheiro' }
  ];

  return (
    <div className="fixed inset-0 z-[1200] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-bg-card border-t md:border border-gold/20 rounded-t-2xl md:rounded-xl shadow-2xl w-full md:w-full max-w-lg max-h-[90vh] flex flex-col animate-fade-up">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-bg-surface rounded-t-2xl md:rounded-t-xl shrink-0">
          <div>
            <h2 className="font-heading text-xl md:text-2xl text-gold">Finalizar Pedido</h2>
            <p className="text-xs text-text-muted mt-1">Preencha seus dados para concluir</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 md:p-6 space-y-6 custom-scrollbar flex-1">
          <form id="checkoutForm" onSubmit={handleSubmit} className="space-y-6">
            
            {/* User Data */}
            <div className="space-y-4">
              <h3 className="text-gold text-sm uppercase tracking-widest border-b border-white/5 pb-2 flex items-center gap-2">
                <i className="fas fa-user"></i> Seus Dados
              </h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-text-muted text-sm mb-2 font-medium">Nome Completo *</label>
                  <input 
                    required 
                    name="clientName" 
                    value={formData.clientName} 
                    onChange={handleInputChange} 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-base text-text-main focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all placeholder:text-white/20" 
                    placeholder="Ex: João Silva" 
                  />
                </div>
                <div>
                  <label className="block text-text-muted text-sm mb-2 font-medium">Telefone (WhatsApp) *</label>
                  <input 
                    required 
                    name="clientPhone" 
                    type="tel" 
                    value={formData.clientPhone} 
                    onChange={handleInputChange} 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-base text-text-main focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all placeholder:text-white/20" 
                    placeholder="(00) 00000-0000" 
                  />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="space-y-4">
              <h3 className="text-gold text-sm uppercase tracking-widest border-b border-white/5 pb-2 flex items-center gap-2">
                <i className="fas fa-truck"></i> Entrega
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${formData.type === 'Delivery' ? 'border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-white/10 text-text-muted hover:bg-white/5'}`}>
                  <input type="radio" name="type" value="Delivery" checked={formData.type === 'Delivery'} onChange={handleInputChange} className="hidden" />
                  <i className="fas fa-motorcycle text-xl mb-1"></i> 
                  <span className="font-bold text-sm">Entrega</span>
                </label>
                <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${formData.type === 'Retirada' ? 'border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-white/10 text-text-muted hover:bg-white/5'}`}>
                  <input type="radio" name="type" value="Retirada" checked={formData.type === 'Retirada'} onChange={handleInputChange} className="hidden" />
                  <i className="fas fa-shopping-bag text-xl mb-1"></i>
                  <span className="font-bold text-sm">Retirada</span>
                </label>
              </div>

              {formData.type === 'Delivery' && (
                <div className="animate-fade-up pt-2">
                  <label className="block text-text-muted text-sm mb-2 font-medium">Endereço Completo *</label>
                  <textarea 
                    required 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-base text-text-main focus:border-gold focus:outline-none min-h-[80px]" 
                    placeholder="Rua, Número, Bairro, Complemento..."
                  ></textarea>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="space-y-4">
              <h3 className="text-gold text-sm uppercase tracking-widest border-b border-white/5 pb-2 flex items-center gap-2">
                <i className="fas fa-wallet"></i> Pagamento
              </h3>
              
              <div className="relative">
                <select 
                  name="paymentMethod" 
                  value={formData.paymentMethod} 
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-base text-text-main focus:border-gold focus:outline-none appearance-none cursor-pointer"
                >
                  {paymentMethods.map(method => (
                    <option key={method.id} value={method.id} className="bg-[#1a1a1a] text-white py-2">
                      {method.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              
              <div className="mt-4">
                 <input 
                   name="coupon" 
                   value={formData.coupon} 
                   onChange={handleInputChange} 
                   placeholder="Possui cupom de desconto?" 
                   className="w-full bg-black/20 border border-dashed border-gold/30 rounded-lg p-3 text-sm text-gold placeholder:text-gold/40 focus:border-gold focus:outline-none text-center uppercase tracking-wide" 
                 />
              </div>
            </div>

            {/* Summary Block */}
            <div className="bg-bg-surface p-5 rounded-xl border border-white/5 space-y-3">
              <div className="flex justify-between text-sm text-text-muted">
                <span>Itens ({cart.length})</span> 
                <span>{formatPrice(subtotal)}</span>
              </div>
              {formData.type === 'Delivery' && (
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Taxa de entrega</span> 
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-400 font-medium">
                  <span>Desconto</span> 
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gold pt-3 border-t border-white/10 mt-3">
                <span>Total</span> 
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-bg-surface shrink-0 pb-8 md:pb-5">
           <button 
             type="submit" 
             form="checkoutForm"
             disabled={loading}
             className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold text-lg rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-green-900/30 hover:-translate-y-1 active:translate-y-0"
           >
             {loading ? <div className="loader"></div> : <i className="fab fa-whatsapp text-2xl"></i>}
             {loading ? 'Processando...' : 'Enviar Pedido'}
           </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;