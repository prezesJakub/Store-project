import React, {createContext, useState} from "react";

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) => 
                    item.id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            }
            return [...prev, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if(quantity <= 0) {
            removeFromCart(id);
        } else {
            setCartItems((prev) => 
                prev.map((item) => 
                    item.id === id ? {...item, quantity} : item
                )
            );
        }
    };

    return (
        <CartContext.Provider
            value={{cartItems, addToCart, removeFromCart, updateQuantity}}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;