import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`} 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[1000] group flex items-center justify-end cursor-pointer"
      aria-label="Fale conosco no WhatsApp"
    >
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-2 rounded-lg font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg whitespace-nowrap pointer-events-none transform translate-x-2 group-hover:translate-x-0 hidden sm:block">
         Faça seu pedido
         <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></span>
      </span>

      {/* Button */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl shadow-[0_0_20px_rgba(37,211,102,0.4)] border-2 border-white/20 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300">
         {/* Ping animation ring */}
         <span className="absolute inset-0 rounded-full border border-[#25D366] opacity-0 animate-[ping_2s_linear_infinite]"></span>
         <i className="fab fa-whatsapp filter drop-shadow"></i>
      </div>
    </a>
  );
};

export default WhatsAppButton;
