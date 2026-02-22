import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import { siteContent } from '../data';

interface FooterProps {
  onNavigate: (page: string, sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { hero, contact, socials } = siteContent;

  return (
    <footer className="bg-[#030303] pt-20 pb-8 border-t border-white/5 text-text-muted">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
           <span className="font-heading text-3xl text-gradient block cursor-pointer select-none" onClick={() => onNavigate('home')}>{hero.title}</span>
           <p className="text-sm leading-relaxed">Onde a gastronomia encontra a arte. Ingredientes selecionados e paixão em cada detalhe.</p>
           
           <div className="flex gap-4 pt-4">
             <a 
               href={socials.instagram}
               target="_blank" 
               rel="noreferrer" 
               className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300 group active:scale-95"
               aria-label="Instagram"
             >
               <i className="fab fa-instagram text-lg group-hover:scale-110 transition-transform"></i>
             </a>
             <a 
               href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`} 
               target="_blank" 
               rel="noreferrer" 
               className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300 group active:scale-95"
               aria-label="WhatsApp"
             >
               <i className="fab fa-whatsapp text-lg group-hover:scale-110 transition-transform"></i>
             </a>
           </div>
        </div>
        
        <div>
          <h3 className="text-gold-light text-lg font-heading mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-[1px] after:bg-gold">Links</h3>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors text-left py-1 block w-full">Início</button></li>
            <li><button onClick={() => onNavigate('menu')} className="hover:text-gold transition-colors text-left py-1 block w-full">Cardápio</button></li>
            <li><button onClick={() => onNavigate('home', 'about')} className="hover:text-gold transition-colors text-left py-1 block w-full">Sobre</button></li>
            <li><button onClick={() => onNavigate('home', 'contact')} className="hover:text-gold transition-colors text-left py-1 block w-full">Contato</button></li>
          </ul>
        </div>

        <div>
           <h3 className="text-gold-light text-lg font-heading mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-[1px] after:bg-gold">Legal</h3>
           <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('privacy')} className="hover:text-gold transition-colors text-left py-1 block w-full">Privacidade</button></li>
            <li><button onClick={() => onNavigate('terms')} className="hover:text-gold transition-colors text-left py-1 block w-full">Termos de Uso</button></li>
          </ul>
        </div>

        <div>
           <h3 className="text-gold-light text-lg font-heading mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-[1px] after:bg-gold">Pagamento</h3>
           <div className="flex gap-4 text-2xl">
             <i className="fab fa-cc-visa hover:text-gold transition-colors"></i>
             <i className="fab fa-cc-mastercard hover:text-gold transition-colors"></i>
             <i className="fas fa-qrcode hover:text-gold transition-colors"></i>
           </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-xs opacity-60">
        <p className="mb-2">&copy; 2025 {hero.title}. Todos os direitos reservados.</p>
        <p>Desenvolvido por <span className="text-gold hover:text-white transition-colors cursor-default">Jr. Abrantes</span></p>
      </div>
    </footer>
  );
};

export default Footer;