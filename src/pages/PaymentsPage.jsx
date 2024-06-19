// src/components/PaymentsPage.jsx

import React, { useState } from 'react';

const PaymentsPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    if (method === 'Card') setIsAddingCard(false);
  };

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleSaveCardClick = () => {
    //havent made database yet so not wont save it yet 
    setIsAddingCard(false);
    setCardNumber('');
  };

  const handleCancelClick = () => {
    setIsAddingCard(false);
    setCardNumber('');
  };

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-xl font-bold mb-6 text-center">Payment Methods</h2>
        <ul className="space-y-4">
          {['Cash', 'PayTM', 'Google Pay', 'PhonePe'].map((method) => (
            <li key={method} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer text-lg" onClick={() => handlePaymentSelect(method)}>
              <span>{method}</span>
              <input type="radio" name="payment" checked={selectedPayment === method} readOnly />
            </li>
          ))}
          <li className="p-4 border rounded-lg">
            <div className="flex items-center justify-between text-lg" onClick={() => handlePaymentSelect('Card')}>
              <span>Card</span>
              <input type="radio" name="payment" checked={selectedPayment === 'Card'} readOnly />
            </div>
            {selectedPayment === 'Card' && (
              <div className="mt-4">
                {isAddingCard ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                    <div className="flex space-x-4">
                      <button onClick={handleSaveCardClick} className="w-full p-2 bg-green-500 text-white rounded-lg">
                        Save
                      </button>
                      <button onClick={handleCancelClick} className="w-full p-2 bg-red-500 text-white rounded-lg">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={handleAddCardClick} className="mt-4 w-full p-2 bg-gray-200 rounded-lg">
                    + Add New Card
                  </button>
                )}
              </div>
            )}
          </li>
        </ul>
        
      </div>
      <button className="mt-6 bg-red-400 text-white rounded-lg shadow-md p-6 w-full max-w-sm md:max-w-md lg:max-w-lg">Apply</button>
    </div>
  );
};

export default PaymentsPage;
