import React, {createContext, useState, useContext} from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({children}) => {
    const [orders, setOrders] = useState([]);

    const updateOrders = async() => {
        try {
            const token = localStorage.getItem("token");

            if(!token) {
                console.error("Brak tokenu");
                return;
            }

            const response = await fetch("http://localhost:5001/api/users/orders", {
                headers: {Authorization: `Bearer ${token}`},
            });

            if(response.ok) {
                const ordersData = await response.json();
                setOrders(ordersData);    
            } else {
                console.error("Błąd podczas pobierania zamówień");
            }
        } catch (error) {
            console.error("Błąd aktualizacji zamówień", error);
        }
    };

    return (
        <OrdersContext.Provider value={{orders, updateOrders}}>
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => {
    return useContext(OrdersContext);
};