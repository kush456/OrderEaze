import React from 'react'
//import { Basket_card } from '../Components/Basket_card'

export const MyBasket = () => {
  return (
    <>
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-700">&larr;</button>
        <h2 className="text-xl font-semibold">My Basket</h2>
        <button className="text-red-500">Add Items</button>
      </div>
      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <div className="flex items-center space-x-4 mb-2">
            <img src="https://via.placeholder.com/50" alt="Chicken Burger" className="w-12 h-12 rounded" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Chicken Burger</h3>
              <p className="text-gray-400 line-through">£10.00</p>
              <p className="text-red-500 text-lg">£6.00</p>
            </div>
            <button className="text-gray-400">&times;</button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span>Add Cheese</span>
              <span>£0.50</span>
            </div>
            <div className="flex items-center justify-between text-gray-500">
              <span>Add Meat (Extra Patty)</span>
              <span>£2.00</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <button className="px-2 py-1 border rounded-l">-</button>
              <span className="px-4 py-1 border-t border-b">1</span>
              <button className="px-2 py-1 border rounded-r">+</button>
            </div>
          </div>
        </div>


        <div className="border p-4 rounded-lg">
          <div className="flex items-center space-x-4 mb-2">
            <img src="https://via.placeholder.com/50" alt="Ramen Noodles" className="w-12 h-12 rounded" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Ramen Noodles</h3>
              <p className="text-gray-400 line-through">£22.00</p>
              <p className="text-red-500 text-lg">£15.00</p>
            </div>
            <button className="text-gray-400">&times;</button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <button className="px-2 py-1 border rounded-l">-</button>
              <span className="px-4 py-1 border-t border-b">1</span>
              <button className="px-2 py-1 border rounded-r">+</button>
            </div>
          </div>
        </div>


    {/* <Basket_card/>
    <Basket_card/>
    <Basket_card/> */}
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
        <h3 className="text-2xl font-semibold">£25.20</h3>
        <button className="px-6 py-3 bg-red-500 text-white rounded-lg">Place Order</button>
      </div>
    </div>
    {/* <div class="flex flex-col bg-gray-50 ">
  <div class="flex flex-row justify-between items-center px-4 py-2">
    <button type="button" class=" rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <h1 class="text-xl font-semibold tracking-tight text-gray-900 ">My Basket</h1>
    <div></div>
  </div>
  <div class="flex flex-col px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-md mt-4">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Order Summary</h1>
      <button type="button" class="focus:outline-none rounded-lg px-5 py-2 border border-rose-600 text-rose-600 font-medium hover:bg-rose-100 dark:hover:bg-rose-900">Add Items</button>
    </div>
  </div>
</div>


    <Basket_card/>
    <Basket_card/>
    <Basket_card/>
    <Basket_card/>
     */}
    
    
    </>
  )
}