import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero';
import About from './components/About';
import SocialProof from './components/SocialProof';
import ProductCard from './components/ProductCard';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import LoadingScreen from './components/LoadingScreen';
import WhatsAppButton from './components/WhatsAppButton';
import { products, siteContent } from './data';
import { Product, CartItem, Order } from './types';
import { loadCartFromStorage, saveCartToStorage, formatPrice } from './utils';
import { GOOGLE_SCRIPT_URL, WHATSAPP_NUMBER, DELIVERY_FEE } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { contact } = siteContent;

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Small delay after 100%
          return 100;
        }
        // Random increment for realistic feel
        const increment = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  if (loading) {
    return <LoadingScreen progress={progress} />;
  }

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Checkout Logic
  const handleOrderConfirm = async (order: Order) => {
    const itemsText = cart.map(i => `${i.quantity}x ${i.name}`).join(', ');
    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    const discount = order.coupon === 'BEMVINDO15' ? subtotal * 0.15 : 0;
    const total = subtotal + (order.type === 'Delivery' ? DELIVERY_FEE : 0) - discount;

    const payload = {
      action: 'insert',
      type: order.type,
      clientName: order.clientName,
      clientPhone: order.clientPhone,
      deliveryAddress: order.address || 'Retirada',
      observations: order.observations,
      items: itemsText,
      subtotal,
      deliveryFee: order.type === 'Delivery' ? DELIVERY_FEE : 0,
      total,
      paymentMethod: order.paymentMethod,
    };

    try {
      if(GOOGLE_SCRIPT_URL) {
         await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(payload)
         });
      }

      // WhatsApp Message
      let msg = `*Novo Pedido - ${siteContent.hero.title}*\n\n`;
      msg += `*Cliente:* ${order.clientName}\n`;
      msg += `*Telefone:* ${order.clientPhone}\n`;
      msg += `*Tipo:* ${order.type}\n`;
      if (order.type === 'Delivery') msg += `*Endereço:* ${order.address}\n`;
      msg += `\n*Pedido:*\n${cart.map(i => `${i.quantity}x ${i.name}`).join('\n')}`;
      if(order.observations) msg += `\n*Obs:* ${order.observations}`;
      if(discount > 0) msg += `\n\nDesconto: -${formatPrice(discount)}`;
      msg += `\n\n*Total: ${formatPrice(total)}*`;
      msg += `\nPagamento: ${order.paymentMethod}`;

      window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`, '_blank');
      
      clearCart();
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
    } catch (error) {
      alert('Erro ao enviar pedido. Tente novamente.');
    }
  };

  // Helper to normalize text (remove accents and lower case)
  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  // Rendering
  const filteredProducts = products.filter(p => {
    const matchesCat = activeCategory === 'todos' || p.category === activeCategory;
    
    // If no search term, just filter by category
    if (!searchTerm) return matchesCat;

    // Normalize strings for accurate searching (e.g. "limao" finds "Limão")
    const term = normalizeText(searchTerm);
    const name = normalizeText(p.name);
    const desc = normalizeText(p.description);
    
    const matchesSearch = name.includes(term) || desc.includes(term);
    
    return matchesCat && matchesSearch;
  });

  const featuredProducts = products.filter(p => [1, 3, 7, 4, 11, 8].includes(p.id));

  // Improved Navigation Handler
  const handleNavigate = (page: string, sectionId?: string) => {
    // If we are changing pages
    if (page !== currentPage) {
      setCurrentPage(page);
      // Wait for React to render the new page
      setTimeout(() => {
        if (sectionId) {
          scrollToSection(sectionId);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we are on the same page, just scroll
      if (sectionId) {
        scrollToSection(sectionId);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg-body text-text-main font-body selection:bg-gold selection:text-black">
      <Header 
        cart={cart} 
        onOpenCart={() => setIsCartOpen(true)} 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onMenuToggle={setIsMobileMenuOpen}
      />

      <main>
        {currentPage === 'home' && (
          <>
            <Hero 
              onViewMenu={() => handleNavigate('menu')} 
              onViewHighlights={() => handleNavigate('home', 'menu')} // 'menu' id in home is the highlights section
            />
            <About />
            
            {/* Social Proof / Testimonials Section */}
            <SocialProof />
            
            <section id="menu" className="py-20 container mx-auto px-4">
              <h2 className="font-heading text-4xl text-center text-gold mb-2">Destaques da Casa</h2>
              <p className="text-center text-text-muted mb-12">Pratos elaborados com ingredientes premium</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                 <button 
                  onClick={() => handleNavigate('menu')} 
                  className="px-8 py-3 border border-gold text-gold rounded hover:bg-gold hover:text-black transition-all uppercase tracking-widest text-sm font-bold"
                 >
                   Ver Cardápio Completo
                 </button>
              </div>
            </section>

            <section id="contact" className="py-24 relative overflow-hidden">
               {/* Abstract Background */}
               <div className="absolute inset-0 bg-bg-body">
                   <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] bg-[length:32px_32px]"></div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
               </div>

               <div className="container mx-auto px-4 relative z-10">
                   {/* Header */}
                   <div className="text-center mb-16 animate-fade-up">
                        <span className="text-gold text-sm font-bold uppercase tracking-[0.2em] mb-3 block">Visite-nos</span>
                        <h2 className="font-heading text-4xl md:text-5xl text-text-main">Localização & Contato</h2>
                   </div>

                   {/* The "Card" */}
                   <div className="max-w-5xl mx-auto bg-bg-card/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-up">
                       <div className="grid md:grid-cols-2 relative">
                           {/* Vertical Divider for Desktop */}
                           <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent"></div>

                           {/* Address Section */}
                           <div className="p-10 md:p-16 flex flex-col items-center text-center group hover:bg-white/5 transition-colors duration-500 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-gold/50 transition-all duration-500 bg-bg-surface shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                                    <i className="fas fa-map-marker-alt text-3xl text-gold"></i>
                                </div>
                                
                                <h3 className="font-heading text-2xl text-white mb-2">Endereço</h3>
                                <p className="text-text-muted mb-6 text-sm uppercase tracking-widest">Onde estamos</p>
                                
                                <div className="text-3xl md:text-4xl font-heading text-gold font-bold relative z-10">
                                   {contact.address}
                                </div>
                                <p className="mt-4 text-text-muted/60 text-sm max-w-xs leading-relaxed">
                                   {contact.cityState} <br/>{contact.details}
                                </p>
                           </div>

                           {/* Phone Section */}
                           <div className="p-10 md:p-16 flex flex-col items-center text-center group hover:bg-white/5 transition-colors duration-500 relative overflow-hidden border-t md:border-t-0 border-white/5">
                                
                                <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-gold/50 transition-all duration-500 bg-bg-surface shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                                    <i className="fas fa-phone-alt text-3xl text-gold"></i>
                                </div>
                                
                                <h3 className="font-heading text-2xl text-white mb-2">Telefone</h3>
                                <p className="text-text-muted mb-6 text-sm uppercase tracking-widest">Fale Conosco</p>
                                
                                <a href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-3xl md:text-4xl font-heading text-gold font-bold hover:text-white transition-colors duration-300 relative z-10">
                                   {contact.phoneDisplay}
                                </a>
                                
                                <a href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="mt-6 px-8 py-3 border border-gold/30 rounded-full text-gold text-sm font-bold uppercase tracking-wider hover:bg-gold hover:text-black transition-all">
                                   Iniciar Conversa
                                </a>
                           </div>
                       </div>
                   </div>
               </div>
            </section>
          </>
        )}

        {currentPage === 'menu' && (
          <div className="pt-24 md:pt-32 pb-20 container mx-auto px-4 min-h-screen">
             <div className="text-center mb-8 animate-fade-up">
               <h1 className="font-heading text-4xl md:text-5xl text-gold mb-2">Nosso Cardápio</h1>
               <p className="text-text-muted text-base">Explore sabores inesquecíveis</p>
             </div>

             {/* Search Bar */}
             <div className="max-w-xl mx-auto mb-6 relative group z-10">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/20 to-gold-dim/20 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center bg-bg-card border border-white/10 rounded-full shadow-2xl">
                    <i className="fas fa-search absolute left-5 text-gold text-lg"></i>
                    <input 
                        type="text" 
                        placeholder="O que você deseja comer hoje?" 
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            if (e.target.value.trim() !== '' && activeCategory !== 'todos') {
                                setActiveCategory('todos');
                            }
                        }}
                        className="w-full bg-transparent border-none py-4 pl-14 pr-12 text-base text-text-main focus:ring-0 placeholder:text-text-muted/50"
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-4 text-text-muted hover:text-gold transition-colors">
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>
             </div>

             <FilterBar activeCategory={activeCategory} onSelectCategory={(id) => { setActiveCategory(id); window.scrollTo({top: 0, behavior: 'smooth'}); }} />

             <div className="mt-8 min-h-[400px]">
                {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-text-muted opacity-60 animate-fade-up border border-dashed border-white/10 rounded-3xl bg-white/5 mx-auto max-w-2xl">
                    <div className="w-20 h-20 rounded-full bg-black/30 flex items-center justify-center mb-6">
                        <i className="fas fa-utensils text-4xl text-gold/50"></i>
                    </div>
                    <h3 className="text-2xl font-heading text-text-main mb-2">Nenhum prato encontrado</h3>
                    <p className="text-lg">Tente buscar por outro termo ou categoria.</p>
                    <button 
                        onClick={() => { setSearchTerm(''); setActiveCategory('todos'); }}
                        className="mt-6 px-6 py-2 border border-gold/50 text-gold rounded-full hover:bg-gold hover:text-black transition-all"
                    >
                        Limpar Filtros
                    </button>
                </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-up pb-10">
                    {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} onAdd={addToCart} />
                    ))}
                </div>
                )}
             </div>
          </div>
        )}

        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <TermsOfUse />}
      </main>

      <Footer onNavigate={handleNavigate} />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQty={updateQuantity}
        onRemove={removeItem}
        onClear={clearCart}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
        deliveryFee={DELIVERY_FEE}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart}
        deliveryFee={DELIVERY_FEE}
        onConfirm={handleOrderConfirm}
      />
      
      {!isMobileMenuOpen && <WhatsAppButton />}

    </div>
  );
};

export default App;