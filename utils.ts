export function formatPrice(price: number): string {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

export const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem('cattleya_cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveCartToStorage = (cart: any[]) => {
  localStorage.setItem('cattleya_cart', JSON.stringify(cart));
};