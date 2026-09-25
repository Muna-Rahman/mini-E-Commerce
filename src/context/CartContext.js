import React, { createContext, useContext, useState } from "react";

// Cart context. Keeps the list of cart items and the actions to change it.
// itemCount and subtotal are just calculated from `items` on every render -
// the cart is small so there's no real need to memoize it.

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addToCart(product) {
    setItems((current) => {
      const alreadyInCart = current.find((item) => item.id === product.id);

      if (alreadyInCart) {
        // already have this product, just bump the quantity instead of
        // adding a second row for the same item
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
      // if quantity hits 0, just drop it from the cart instead of
      // showing a "0" row
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
