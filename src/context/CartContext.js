import React, { createContext, useContext, useState } from "react";

// a simple cart context that keeps track of the items in the cart and exposes functions to add, remove, and update them.

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addToCart(product) {
    setItems((current) => {
      const alreadyInCart = current.find((item) => item.id === product.id);

      if (alreadyInCart) {
        // if the product is already in the cart, just increase its quantity by 1
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ];
    });
  }

  function increase(id) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrease(id) {
    setItems((current) => {
      const updated = current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      // filter out any items that have a quantity of 0, so they don't show up in the cart anymore
      return updated.filter((item) => item.quantity > 0);
    });
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  let itemCount = 0;
  let subtotal = 0;
  for (const item of items) {
    itemCount += item.quantity;
    subtotal += item.price * item.quantity;
  }

  const value = {
    items,
    addToCart,
    increase,
    decrease,
    removeItem,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
