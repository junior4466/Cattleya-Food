export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  prepTime: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  clientName: string;
  clientPhone: string;
  type: 'Delivery' | 'Retirada';
  address?: string;
  paymentMethod: string;
  observations?: string;
  coupon?: string;
}

export interface Chef {
  id: number;
  name: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  date: string;
  location: string;
}

// Novos tipos para estrutura moldável
export interface StatItem {
    id: number;
    label: string;
    value: string;
    icon: string;
}

export interface NavItem {
  label: string;
  page: string;
  section?: string;
  description: string; // Texto do resumo
  image?: string;      // Imagem do resumo
}

export interface SiteContent {
    hero: {
        title: string;
        subtitle: string;
        backgroundImage: string;
    };
    about: {
        badgeText: string;
        badgeSubtext: string;
        titlePart1: string;
        titleHighlight: string;
        titlePart2: string;
        description: string;
        mainImage: string;
        features: { icon: string; title: string; subtitle: string }[];
    };
    contact: {
        address: string;
        cityState: string;
        details: string;
        phoneDisplay: string;
    };
    socials: {
        instagram: string;
    };
    stats: StatItem[];
    navigation: NavItem[];
}