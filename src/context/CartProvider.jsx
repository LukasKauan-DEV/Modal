// contexts/CartContext.js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Adiciona item ao carrinho
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Verifica estoque antes de incrementar
        if (existingItem.quantity >= product.estoque) {
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Adiciona novo item se houver estoque
        if (product.estoque > 0) {
          return [...prevItems, { ...product, quantity: 1 }];
        }
        return prevItems;
      }
    });
  };

  // Remove item do carrinho
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Atualiza quantidade de um item
  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Limpa o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcula o total de itens
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calcula o valor total
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.preco * item.quantity), 
    0
  );

  return (
    <CartContext.Provider 
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};