import React, { useState } from 'react';

const OrderTracking = () => {
    const [status, setStatus] = useState(0); // 0: Accepted, 1: Being Prepared, 2: Prepared

    const getStatusColor = (step) => {
        return status >= step ? 'bg-green-500' : 'bg-gray-300';
    };

    const getLineColor = (step) => {
        return status >= step ? 'bg-green-500' : 'bg-gray-300';
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-6">
            <h1 className="text-3xl font-bold mb-8">Order Tracking</h1>
            <div className="flex items-center w-full">
                <div className="relative w-full h-1 bg-gray-300">
                    <div className={`absolute left-0 top-0 h-1 ${getLineColor(1)} w-${status >= 1 ? '1/2' : '0'}`}></div>
                    <div className={`absolute left-1/2 top-0 h-1 ${getLineColor(2)} w-${status === 2 ? '1/2' : '0'}`}></div>
                </div>
                <div className="absolute flex justify-between w-full">
                    <div className={`w-10 h-10 rounded-full ${getStatusColor(0)} flex items-center justify-center text-white font-semibold`}></div>
                    <div className={`w-10 h-10 rounded-full ${getStatusColor(1)} flex items-center justify-center text-white font-semibold`}></div>
                    <div className={`w-10 h-10 rounded-full ${getStatusColor(2)} flex items-center justify-center text-white font-semibold`}></div>
                </div>
            </div>
            <div className="flex w-full justify-between mt-4 px-4">
                <span className="text-sm">Accepted</span>
                <span className="text-sm">Being Prepared</span>
                <span className="text-sm">Prepared</span>
            </div>
            <div className="mt-8">
                <button 
                    onClick={() => setStatus((prev) => (prev + 1) % 3)} 
                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold"
                >
                    Next Status
                </button>
            </div>
        </div>
    );
};

export default OrderTracking;
