import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({});

  const addToOrder = (category, item) => {
    setOrder(prevOrder => {
      const categoryOrder = prevOrder[category] || [];
      const itemIndex = categoryOrder.findIndex(i => i.name === item.name);
      if (itemIndex === -1) {
        return {
          ...prevOrder,
          [category]: [...categoryOrder, { ...item, quantity: 1 }],
        };
      } else {
        const updatedItem = { ...categoryOrder[itemIndex], quantity: categoryOrder[itemIndex].quantity + 1 };
        return {
          ...prevOrder,
          [category]: [
            ...categoryOrder.slice(0, itemIndex),
            updatedItem,
            ...categoryOrder.slice(itemIndex + 1),
          ],
        };
      }
    });
  };

  const removeFromOrder = (category, item) => {
    setOrder(prevOrder => {
      const categoryOrder = prevOrder[category] || [];
      const itemIndex = categoryOrder.findIndex(i => i.name === item.name);
      if (itemIndex !== -1) {
        const updatedItem = { ...categoryOrder[itemIndex], quantity: categoryOrder[itemIndex].quantity - 1 };

        if (updatedItem.quantity > 0) {
          return {
            ...prevOrder,
            [category]: [
              ...categoryOrder.slice(0, itemIndex),
              updatedItem,
              ...categoryOrder.slice(itemIndex + 1),
            ],
          };
        } else {
          return {
            ...prevOrder,
            [category]: [
              ...categoryOrder.slice(0, itemIndex),
              ...categoryOrder.slice(itemIndex + 1),
            ],
          };
        }
      }

      return prevOrder;
    });
  };

  return (
    <OrderContext.Provider value={{ order, addToOrder, removeFromOrder }}>
      {children}
    </OrderContext.Provider>
  );
};