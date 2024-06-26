import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const MyBasket = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { order={} } = location.state || {};
  const selectedPayment = location.state.selectedPayment || [];
  const selectedCard = location.state.selectedCard || [];

  //here check what is undefined
  console.log("payment method", selectedPayment);
  if(selectedCard){
    console.log("card", selectedCard);
  }
  
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if(Object.keys(order).length > 0) {
      Object.keys(order).forEach(category => {
        order[category].forEach(item => {
          const itemPrice = (item.special === 'yes') ?
            parseFloat(item.discountedPrice.slice(1)) * item.quantity :
            parseFloat(item.price.slice(1)) * item.quantity;
  
          totalPrice += itemPrice;
        });
      });
    }

    return totalPrice.toFixed(2);
  };

  const goToMenu = () => {
    navigate('/menu', { state: { order } });
  };

  const goToPayments = () => {
    navigate('/payments', { state: { order} });
  }
  
  console.log(order);
  return (
    <div className="max-w-lg mx-auto mb-32 p-4 bg-white rounded-lg shadow-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">My Basket</h2>
        <button className="text-red-500" onClick={goToMenu}>Add Items</button>
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
                    <p className="text-red-500 text-lg">{item.discountedPrice}</p> 
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
          <div onClick={goToPayments} className="bg-gray-100 rounded-lg p-4 mt-4">
            <h4 className="text-gray-900 font-semibold">Payment method</h4>
            {selectedPayment.length> 0 && <p className='text-gray-500'>{selectedPayment}</p>}
            {selectedCard.number && <p className='text-gray-500'>{selectedCard.number}</p>}
          </div>

      </div>
      <div className="flex items-center justify-around w-11/12 fixed bottom-0 px-4 py-3 my-2 mr-2 bg-white border rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold">${calculateTotalPrice()} </h3>
        <button className="px-6 py-3 bg-red-500 text-white rounded-lg">Place Order</button>
      </div>
    </div>
  );
};