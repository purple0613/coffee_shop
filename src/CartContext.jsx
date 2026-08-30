import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    const addToCart = (coffee) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === coffee.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === coffee.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...coffee, quantity: 1 }];
        });
    };

    const removeFromCart = (coffeeId) => {
        setItems((prev) => prev.filter((i) => i.id !== coffeeId));
    };

    const updateQuantity = (coffeeId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(coffeeId);
            return;
        }
        setItems((prev) =>
            prev.map((i) => (i.id === coffeeId ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce(
        (sum, i) => sum + parseFloat(i.price) * i.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
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
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}