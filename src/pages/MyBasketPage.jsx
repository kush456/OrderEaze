import React from 'react';
import { useLocation } from 'react-router-dom';

export const MyBasket = () => {

  const location = useLocation();
  const { order } = location.state || { order: {} };

  console.log(order);
  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-700">&larr;</button>
        <h2 className="text-xl font-semibold">My Basket</h2>
        <button className="text-red-500">Add Items</button>
      </div>
      <div className="space-y-4">
        {Object.keys(order).map(category => (
          order[category].map(item => (
            <div key={item.name} className="border p-4 rounded-lg">
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  {(item.special === "yes") ? 
                  <>
                    <p className="text-gray-400 line-through">{item.price}</p>
                    <p className="text-red-500 text-lg">{"here discounted price will come"}</p> 
                  </> :
                  <>
                  <p className="text-red-500 text-lg">{item.price}</p> 
                  </>
                  }
                  
                </div>
                <button className="text-gray-400">&times;</button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <button className="px-2 py-1 border rounded-l">-</button>
                  <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                  <button className="px-2 py-1 border rounded-r">+</button>
                </div>
              </div>
            </div>
          ))
        ))}
      </div>
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="text-gray-700">Deliver to</h4>
          <p className="text-gray-900 font-semibold">Home</p>
          <p className="text-gray-500">221B Baker Street, London, United Kingdom</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="text-gray-700">Payment method</h4>
          <p className="text-gray-900 font-semibold">Cash</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold">{/* Total Price */}</h3>
        <button className="px-6 py-3 bg-red-500 text-white rounded-lg">Place Order</button>
      </div>
    </div>
  );
};