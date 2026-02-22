import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Header.module.css';
import { CartItem } from '../../types';
import { WHATSAPP_NUMBER } from '../../constants';
import { siteContent } from '../../data';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  currentPage: string;
  onNavigate: (page: string, sectionId?: string) => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ cart, onOpenCart, currentPage, onNavigate, onMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Scroll listener for backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      onMenuToggle && onMenuToggle(true);
    } else {
      document.body.style.overflow = 'unset';
      onMenuToggle && onMenuToggle(false);
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
      onMenuToggle && onMenuToggle(false);
    };
  }, [isMobileMenuOpen, onMenuToggle]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: 'Início', page: 'home', section: undefined, description: 'Bem-vindo à nossa experiência gastronômica.' },
    { label: 'Cardápio', page: 'menu', section: undefined, description: 'Explore nossos pratos artesanais e sabores únicos.' },
    { label: 'Sobre', page: 'home', section: 'about', description: 'Conheça nossa história e paixão pela culinária.' },
    { label: 'Contato', page: 'home', section: 'contact', description: 'Fale conosco e faça sua reserva.' },
  ];

  const handleNavigation = (page: string, section?: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(page, section);
  };

  const handleOpenCart = () => {
    setIsMobileMenuOpen(false);
    onOpenCart();
  };

  const isActive = (page: string, section?: string) => {
    if (currentPage !== page) return false;
    if (section && window.location.hash !== `#${section}`) return false;
    if (!section && window.location.hash) return false;
    return true;
  };

  return (
    <header 
      className={`${styles.headerRoot} ${isScrolled ? styles.headerScrolled : ''}`}
      aria-label="Main navigation"
      style={{ zIndex: isMobileMenuOpen ? 1001 : undefined }}
    >
      <div className={styles.container}>
        {/* Logo Section */}
        <div 
          className={styles.logo} 
          onClick={() => handleNavigation('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavigation('home')}
          aria-label="Go to homepage"
        >
          <span className={styles.logoIcon}>
            <i className="fas fa-utensils" aria-hidden="true"></i>
          </span>
          <span className={styles.logoText}>Cattleya Food</span>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.navDesktop} aria-label="Desktop navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                <button
                  onClick={() => handleNavigation(item.page, item.section)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`${styles.navLink} ${isActive(item.page, item.section) ? styles.navLinkActive : ''}`}
                  aria-current={isActive(item.page, item.section) ? 'page' : undefined}
                >
                  {item.label}
                </button>
                
                {/* Hover Description Tooltip */}
                <div className={`${styles.navTooltip} ${hoveredItem === item.label ? styles.navTooltipVisible : ''}`}>
                  <div className={styles.tooltipInner}>
                    <span className={styles.tooltipTitle}>{item.label}</span>
                    <span className={styles.tooltipDivider}></span>
                    <span className={styles.tooltipDescription}>{item.description}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions (Cart + Mobile Toggle) */}
        <div className={styles.actions}>
          <button 
            className={styles.cartButton}
            onClick={handleOpenCart}
            aria-label={`Open cart, ${totalItems} items`}
          >
            <i className="fas fa-shopping-bag" aria-hidden="true"></i>
            {totalItems > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button 
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Rendered via Portal */}
      {createPortal(
        <div 
          id="mobile-menu"
          className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav aria-label="Mobile navigation" className={styles.mobileNavContainer}>
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.label} className={styles.mobileNavLinkItem}>
                  <button
                    onClick={() => handleNavigation(item.page, item.section)}
                    className={`${styles.mobileNavLink} ${isActive(item.page, item.section) ? styles.mobileNavLinkActive : ''}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.mobileSocials}>
              <span className={styles.mobileSocialTitle}>Siga-nos</span>
              <div className={styles.mobileSocialIcons}>
                <a 
                  href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className={styles.mobileSocialIcon}
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a 
                  href={siteContent.socials.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className={styles.mobileSocialIcon}
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <div className={styles.mobileFooter}>
              Desenvolvido por <span className={styles.developerName}>Jr. Abrantes</span>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;
