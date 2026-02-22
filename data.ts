import { Product, Chef, Testimonial, SiteContent } from './types';
import { WHATSAPP_NUMBER } from './constants';

// ========== GALERIA DE IMAGENS (CENTRALIZADA) ==========
// Edite aqui para alterar as imagens do site facilmente
export const SITE_IMAGES = {
    HERO_BG: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
    ABOUT_MAIN: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    
    NAV: {
        HOME: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80",
        MENU: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
        ABOUT: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=400&q=80",
        CONTACT: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80"
    },

    PRODUCTS: {
        // Entradas
        FOIE_GRAS: '/images/Foie Gras com Vinho do Porto.png',
        TARTAR: '/images/Tartar de Salmão e Avocado.png',
        BRUSCHETTA: '/images/Bruschetta de Cogumelos.png',
        CAMARAO: '/images/Camarão com Melado.png',
        
        // Principais
        RISOTTO: '/images/Risotto de Funghi Porcini.png',
        MAGRET: '/images/Magret de Pato.png',
        WELLINGTON: '/images/Filé Mignon Wellington.png',
        BACALHAU: '/images/Bacalhau Confitado.png',
        OSSOBUCO: '/images/Ossobuco ao Vinho Tinto.png',
        ROBALO: '/images/Robalo Grelhado.png',

        // Sobremesas
        CREME_BRULEE: '/images/Crème Brûlée.png',
        FONDANT: '/images/Fondant de Chocolate.png',
        TARTE_TATIN: '/images/Tarte Tatin de Maçã.png',
        SOUFLE: '/images/Souflê de Chocolate.png',
        CHEESECAKE: '/images/Cheesecake Vermelho.png',

        // Bebidas
        COCA: '/images/Coca-Cola.png',
        GUARANA: '/images/Guaraná Antarctica.png',
        SUCO_LARANJA: '/images/Suco de Laranja.png',
        VINHO: '/images/Vinho Tinto (Taça).png'
    },

    CHEFS: [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/men/86.jpg',
        'https://randomuser.me/api/portraits/women/65.jpg',
        'https://randomuser.me/api/portraits/men/41.jpg',
        'https://randomuser.me/api/portraits/men/22.jpg',
    ],

    TESTIMONIALS: [
        'https://randomuser.me/api/portraits/men/54.jpg',
        'https://randomuser.me/api/portraits/women/68.jpg',
        'https://randomuser.me/api/portraits/men/91.jpg',
        'https://randomuser.me/api/portraits/women/33.jpg',
        'https://randomuser.me/api/portraits/men/45.jpg',
        'https://randomuser.me/api/portraits/women/90.jpg'
    ]
};

// ========== CONFIGURAÇÃO GERAL DO SITE (CMS) ==========
export const siteContent: SiteContent = {
    hero: {
        title: "Cattleya Food",
        subtitle: "Excelência gastronômica em cada experiência",
        backgroundImage: SITE_IMAGES.HERO_BG
    },
    about: {
        badgeText: "Excelência",
        badgeSubtext: "Desde 2025",
        titlePart1: "Onde a",
        titleHighlight: "tradição",
        titlePart2: "encontra a arte moderna.",
        description: "O Cattleya Food nasceu do desejo de transcender o comum. Não servimos apenas comida; orquestramos momentos. Nossa cozinha é um laboratório de sabores onde ingredientes locais selecionados encontram técnicas internacionais.",
        mainImage: SITE_IMAGES.ABOUT_MAIN,
        features: [
            { icon: "fas fa-seedling", title: "Ingredientes Frescos", subtitle: "Seleção diária." },
            { icon: "fas fa-trophy", title: "Alta Gastronomia", subtitle: "Chefs premiados." },
            { icon: "fas fa-wine-glass-alt", title: "Carta de Vinhos", subtitle: "Rótulos exclusivos." },
            { icon: "fas fa-star", title: "Experiência VIP", subtitle: "Atendimento único." }
        ]
    },
    contact: {
        address: "Aquiraz, Ceará",
        cityState: "Região metropolitana de Fortaleza",
        details: "Disponível para entrega e retirada.",
        phoneDisplay: "(88) 98119-5074"
    },
    socials: {
        instagram: "https://www.instagram.com"
    },
    stats: [
        { id: 1, label: 'Pedidos Entregues', value: '+5.000', icon: 'fa-box-open' },
        { id: 2, label: 'Taxa de Aprovação', value: '98%', icon: 'fa-heart' },
        { id: 3, label: 'Avaliação Média', value: '4.9/5', icon: 'fa-star' },
    ],
    navigation: [
        { 
            label: "Início", 
            page: "home", 
            description: "Bem-vindo ao ápice da gastronomia. Comece sua jornada aqui.",
            image: SITE_IMAGES.NAV.HOME
        },
        { 
            label: "Cardápio", 
            page: "menu", 
            description: "Explore pratos exclusivos, das entradas às sobremesas artesanais.",
            image: SITE_IMAGES.NAV.MENU
        },
        { 
            label: "Sobre", 
            page: "home", 
            section: "about",
            description: "Conheça nossa história, nossos chefs e a filosofia da nossa cozinha.",
            image: SITE_IMAGES.NAV.ABOUT
        },
        { 
            label: "Contato", 
            page: "home", 
            section: "contact",
            description: "Faça sua reserva, peça delivery ou visite nosso espaço físico.",
            image: SITE_IMAGES.NAV.CONTACT
        }
    ]
};

export const products: Product[] = [
    // ========== ENTRADAS ==========
    { id: 1, name: 'Foie Gras com Vinho do Porto', description: 'Foie gras artesanal servido com redução de vinho do porto e torradas crocantes.', price: 89.90, category: 'entradas', image: '/images/Foie Gras com Vinho do Porto.png', featured: true, prepTime: '15min' },
    { id: 2, name: 'Tartar de Salmão e Avocado', description: 'Salmão fresco em cubos marinado com azeite de oliva, limão siciliano e avocado cremoso.', price: 72.90, category: 'entradas', image: '/images/Tartar de Salmão e Avocado.png', featured: false, prepTime: '12min' },
    { id: 10, name: 'Bruschetta de Cogumelos', description: 'Pão rústico tostado com cogumelos salteados, alho, ervas finas e parmesão.', price: 48.90, category: 'entradas', image: '/images/Bruschetta de Cogumelos.png', featured: false, prepTime: '10min' },
    { id: 11, name: 'Camarão com Melado', description: 'Camarões crocantes servidos com redução de melado de agrião e limão.', price: 62.90, category: 'entradas', image: '/images/Camarão com Melado.png', featured: false, prepTime: '15min' },

    // ========== PRINCIPAIS ==========
    { id: 3, name: 'Risotto de Funghi Porcini', description: 'Risotto cremoso preparado com cogumelos porcini importados e parmesão reggiano.', price: 95.90, category: 'principais', image: '/images/Risotto de Funghi Porcini.png', featured: true, prepTime: '25min' },
    { id: 4, name: 'Magret de Pato', description: 'Peito de pato grelhado com molho agridoce de frutas vermelhas e purê de batata trufado.', price: 129.90, category: 'principais', image: '/images/Magret de Pato.png', featured: true, prepTime: '30min' },
    { id: 5, name: 'Filé Mignon Wellington', description: 'Filé mignon envolto em massa folhada com duxelles de cogumelos e foie gras.', price: 144.90, category: 'principais', image: '/images/Filé Mignon Wellington.png', featured: true, prepTime: '40min' },
    { id: 6, name: 'Bacalhau Confitado', description: 'Lombo de bacalhau confitado em azeite português servido com purê de grão-de-bico.', price: 114.90, category: 'principais', image: '/images/Bacalhau Confitado.png', featured: true, prepTime: '30min' },
    { id: 12, name: 'Ossobuco ao Vinho Tinto', description: 'Ossobuco cozido lentamente ao molho de vinho tinto com legumes e risoto de açafrão.', price: 139.90, category: 'principais', image: '/images/Ossobuco ao Vinho Tinto.png', featured: false, prepTime: '45min' },
    { id: 13, name: 'Robalo Grelhado', description: 'Filé de robalo grelhado, purê de mandioquinha e farofa de castanhas.', price: 109.90, category: 'principais', image: '/images/Robalo Grelhado.png', featured: false, prepTime: '25min' },

    // ========== SOBREMESAS ==========
    { id: 7, name: 'Crème Brûlée', description: 'Clássico francês com creme de baunilha de Madagascar e crosta caramelizada.', price: 41.90, category: 'sobremesas', image: '/images/Crème Brûlée.png', featured: true, prepTime: '10min' },
    { id: 8, name: 'Fondant de Chocolate', description: 'Bolo de chocolate belga com centro líquido servido com sorvete de baunilha.', price: 49.90, category: 'sobremesas', image: '/images/Fondant de Chocolate.png', featured: true, prepTime: '15min' },
    { id: 9, name: 'Tarte Tatin de Maçã', description: 'Tradicional torta francesa de maçãs caramelizadas com massa folhada crocante.', price: 44.90, category: 'sobremesas', image: '/images/Tarte Tatin de Maçã.png', featured: true, prepTime: '15min' },
    { id: 14, name: 'Souflê de Chocolate', description: 'Souflê de chocolate meio amargo servido com calda de frutas vermelhas.', price: 52.90, category: 'sobremesas', image: '/images/Souflê de Chocolate.png', featured: false, prepTime: '20min' },
    { id: 15, name: 'Cheesecake Vermelho', description: 'Cheesecake cremoso com calda de frutas vermelhas e base de biscoito.', price: 46.90, category: 'sobremesas', image: '/images/Cheesecake Vermelho.png', featured: false, prepTime: '10min' },

    // ========== BEBIDAS ==========
    { id: 16, name: 'Coca-Cola', description: 'Refrigerante Coca-Cola 350ml.', price: 8.90, category: 'bebidas', image: '/images/Coca-Cola.png', featured: false, prepTime: 'Pronto' },
    { id: 17, name: 'Coca-Cola Zero', description: 'Refrigerante Coca-Cola Zero 350ml.', price: 8.90, category: 'bebidas', image: '/images/Coca-Cola Zero.png', featured: false, prepTime: 'Pronto' },
    { id: 18, name: 'Guaraná Antarctica', description: 'Refrigerante Guaraná Antarctica 350ml.', price: 7.90, category: 'bebidas', image: '/images/Guaraná Antarctica.png', featured: false, prepTime: 'Pronto' },
    { id: 19, name: 'Guaraná Zero', description: 'Refrigerante Guaraná Antarctica Zero 350ml.', price: 7.90, category: 'bebidas', image: '/images/Guaraná Zero.png', featured: false, prepTime: 'Pronto' },
    { id: 20, name: 'Suco de Laranja', description: 'Suco natural de laranja 400ml.', price: 12.90, category: 'bebidas', image: '/images/Suco de Laranja.png', featured: false, prepTime: '5min' },
    { id: 29, name: 'Vinho Tinto (Taça)', description: 'Taça de vinho tinto da casa.', price: 22.90, category: 'bebidas', image: '/images/Vinho Tinto (Taça).png', featured: false, prepTime: 'Pronto' },
];

// ========== EQUIPE (CHEFS) ==========
export const chefs: Chef[] = [
    { id: 1, name: 'Chef Executivo', image: SITE_IMAGES.CHEFS[0] },
    { id: 2, name: 'Sous Chef', image: SITE_IMAGES.CHEFS[1] },
    { id: 3, name: 'Pâtissier', image: SITE_IMAGES.CHEFS[2] },
    { id: 4, name: 'Chef de Partie', image: SITE_IMAGES.CHEFS[3] },
    { id: 5, name: 'Chef Garde Manger', image: SITE_IMAGES.CHEFS[4] },
    { id: 6, name: 'Sommelier', image: SITE_IMAGES.CHEFS[5] },
];

// ========== DEPOIMENTOS (PROVA SOCIAL) ==========
export const testimonials: Testimonial[] = [
  { 
    id: 1, 
    name: 'Dr. Ricardo Fontes', 
    role: 'Cardiologista', 
    content: 'Uma sinfonia de sabores. O Filé Wellington é, sem dúvida, o melhor que já provei na região. Atendimento impecável e ambiente sofisticado.',
    rating: 5,
    image: SITE_IMAGES.TESTIMONIALS[0],
    date: '12 Out 2025',
    location: 'Fortaleza, CE'
  },
  { 
    id: 2, 
    name: 'Sofia Vasconcelos', 
    role: 'Arquiteta', 
    content: 'A experiência de pedir em casa foi tão luxuosa quanto ir ao restaurante. A apresentação dos pratos chegou perfeita. O Cattleya define o padrão de excelência.',
    rating: 5,
    image: SITE_IMAGES.TESTIMONIALS[1],
    date: '05 Nov 2025',
    location: 'Aquiraz, CE'
  },
  { 
    id: 3, 
    name: 'Henrique e Patrícia', 
    role: 'Empresários', 
    content: 'Nossa escolha favorita para jantares especiais. Cada detalhe, desde a carta de vinhos até a sobremesa, é pensado para encantar. Recomendamos de olhos fechados.',
    rating: 5,
    image: SITE_IMAGES.TESTIMONIALS[2],
    date: '20 Dez 2025',
    location: 'Eusébio, CE'
  },
  {
    id: 4, 
    name: 'Dra. Helena Sampaio', 
    role: 'Advogada', 
    content: 'A harmonização proposta pelo Chef foi impecável. Os ingredientes frescos fazem toda a diferença no paladar. Uma verdadeira joia gastronômica.',
    rating: 5,
    image: SITE_IMAGES.TESTIMONIALS[3],
    date: '15 Jan 2025',
    location: 'Fortaleza, CE'
  },
  {
    id: 5, 
    name: 'André Albuquerque', 
    role: 'CEO de uma Multinacional', 
    content: 'Sempre peço para reuniões executivas e o feedback é unânime: a melhor comida da cidade. Pontualidade e apresentação nota 10.',
    rating: 5,
    image: SITE_IMAGES.TESTIMONIALS[4],
    date: '28 Jan 2025',
    location: 'Porto das Dunas, CE'
  },
  {
    id: 6, 
    name: 'Beatriz Lins', 
    role: 'Influenciadora Digital', 
    content: 'A técnica do Magret de Pato é impressionante. Suculento e com a pele perfeitamente crocante. Inspiração pura!',
    rating: 4.9,
    image: SITE_IMAGES.TESTIMONIALS[5],
    date: '10 Fev 2025',
    location: 'Aquiraz, CE'
  }
];