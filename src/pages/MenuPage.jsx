import React, { useState } from 'react';
import {Element, scroller } from 'react-scroll';
import { Link } from 'react-router-dom';
import Basket from '../components/Basket';
import Profile from '../components/Profile';


const MenuPage = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('none');
  const [order, setOrder] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    { name: 'Burger', icon: '🍔' },
    { name: 'Taco', icon: '🌮' },
    { name: 'Burrito', icon: '🌯' },
    { name: 'Drink', icon: '🥤' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Donut', icon: '🍩' },
    { name: 'Salad', icon: '🥗' },
    { name: 'Noodles', icon: '🍜' },
    { name: 'Sandwich', icon: '🥪' },
    { name: 'Pasta', icon: '🍝' },
    { name: 'IceCream', icon: '🍨' },
  ];

  const foodItems = {
    Burger: [
      { name: 'Cheeseburger', description: 'A delicious cheeseburger', price: '$5.99', special: 'no' },
      { name: 'Veggie Burger', description: 'A tasty veggie burger', price: '$4.99', special: 'no' },
    ],
    Taco: [
      { name: 'Chicken Taco', description: 'Spicy chicken taco', price: '$3.99', special: 'no' },
      { name: 'Beef Taco', description: 'Savory beef taco', price: '$4.49', special: 'no' },
    ],
    Burrito: [
      { name: 'Bean Burrito', description: 'A hearty bean burrito', price: '$6.99', special: 'no' },
      { name: 'Chicken Burrito', description: 'A flavorful chicken burrito', price: '$7.99', special: 'no' },
    ],
    Drink: [
      { name: 'Coca Cola', description: 'Refreshing cola drink', price: '$1.99', special: 'no' },
      { name: 'Orange Juice', description: 'Freshly squeezed orange juice', price: '$2.49', special: 'no' },
    ],
    Pizza: [
      { name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza', price: '$8.99', special: 'no' },
      { name: 'Margherita Pizza', description: 'Traditional Margherita pizza', price: '$7.99', special: 'no' },
    ],
    Donut: [
      { name: 'Glazed Donut', description: 'Sweet glazed donut', price: '$1.49', special: 'no' },
      { name: 'Chocolate Donut', description: 'Rich chocolate donut', price: '$1.99', special: 'no' },
    ],
    Salad: [
      { name: 'Caesar Salad', description: 'Crisp Caesar salad', price: '$5.99', special: 'no' },
      { name: 'Greek Salad', description: 'Fresh Greek salad', price: '$6.49', special: 'no' },
    ],
    Noodles: [
      { name: 'Spicy Ramen', description: 'Hot and spicy ramen noodles', price: '$7.99', special: 'no' },
      { name: 'Pad Thai', description: 'Classic Thai noodle dish', price: '$8.99', special: 'no' },
    ],
    Sandwich: [
      { name: 'Turkey Sandwich', description: 'Turkey sandwich with lettuce', price: '$5.99', special: 'no' },
      { name: 'Ham Sandwich', description: 'Ham sandwich with cheese', price: '$5.49', special: 'no' },
    ],
    Pasta: [
      { name: 'Spaghetti Bolognese', description: 'Pasta with meat sauce', price: '$9.99', special: 'no' },
      { name: 'Penne Alfredo', description: 'Pasta with creamy Alfredo sauce', price: '$8.99', special: 'no' },
    ],
    IceCream: [
      { name: 'Vanilla Ice Cream', description: 'Creamy vanilla ice cream', price: '$2.99', special: 'yes' },
      { name: 'Chocolate Ice Cream', description: 'Rich chocolate ice cream', price: '$2.99', special: 'yes' },
    ],
  };

  const offers = [
    { title: 'Ice Cream Day', description: 'Get your sweet ice cream', offer: '40% off' },
    { title: 'Burger Fest', description: 'Big Juicy Burgers', offer: 'Buy 1, Get 1 Free!' },
    { title: 'Taco Special', description: 'Tasty Tacos', offer: 'Buy 2, Get 1 Free!' },
  ];

  // scroll functionality
  const scrollToCategory = (category) => {
    scroller.scrollTo(category, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const nextOffer = () => {
    setCurrentOfferIndex((currentOfferIndex + 1) % offers.length);
  };

  const prevOffer = () => {
    setCurrentOfferIndex((currentOfferIndex - 1 + offers.length) % offers.length);
  };

  // for searching
  const filteredFoodItems = Object.keys(foodItems).reduce((filteredItems, category) => {
    const filteredCategoryItems = foodItems[category].filter((foodItem) => {
      const itemNameLowercase = foodItem.name.toLowerCase();
      const searchQueryLowercase = searchQuery.toLowerCase();

      if (itemNameLowercase.includes(searchQueryLowercase)) {
        return true;
      }

      return false;
    });

    return {
      ...filteredItems,
      [category]: filteredCategoryItems,
    };
  }, {});

  //console.log(filteredFoodItems);

  // for filtering/sorting (not functional yet)
  const sortedFoodItems = Object.keys(filteredFoodItems).reduce((sortedItems, category) => {
    const sortedCategoryItems = filteredFoodItems[category].sort((a, b) => {
      if (filterOption === 'price-low-to-high') {
        return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      } else if (filterOption === 'price-high-to-low') {
        return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
      }

      return 0;
    });

    return {
      ...sortedItems,
      [category]: sortedCategoryItems,
    };
  }, {});

  // adding and removing from order functionality
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

  const initialCategoriesToShow = 8; // to implement more info less info
  
  return (
    
      <div className="p-5">
        <header className="text-center mb-5 flex justify-between">
          <button >
            <Profile/>
          </button>
          <div>
            <h1 className="text-2xl">Welcome To</h1>
            <h2 className="text-2xl font-bold text-red-500">Desi Tadka</h2>
          </div>
          <Link className="my-5" to={"/mybasket"}>
            <Basket/>
          </Link>
        </header>

        {/* special offers */}
        <section className="relative mb-5">
          <div className="bg-red-400 p-4 rounded-lg text-center mx-4 my-4 min-h-40">
            <h2 className="text-2xl text-white font-bold">{offers[currentOfferIndex].title}</h2>
            <p className="text-xl text-white mt-2">{offers[currentOfferIndex].description}</p>
            <p className="text-lg text-white mt-2">{offers[currentOfferIndex].offer}</p>
          </div>
          <button
            onClick={prevOffer}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white rounded-full w-10 h-10"
          >
            &lt;
          </button>
          <button
            onClick={nextOffer}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full w-10 h-10"
          >
            &gt;
          </button>
        </section>

        {/* Search bar and Filter dropdown */}
        {/*size of dropwdowns needs to be fixed*/}
        <div className="flex justify-center mb-5 space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-3/4"
          />
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-1/4 max-w-full"
          >
            <option className="max-w-full overflow-hidden" value="none">Sort</option>
            <option className="max-w-full overflow-hidden" value="price-low-to-high">Price: Low to High</option>
            <option className="max-w-full overflow-hidden" value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>


        {/*category divs*/}
        <section className="flex flex-wrap justify-around mb-5">
          {categories.slice(0, showAllCategories ? categories.length : initialCategoriesToShow).map((category, index) => (
            <div
              key={category.name}
              className="bg-white-200 p-4 m-2 rounded-lg text-center cursor-pointer w-24 shadow-md shadow-gray border border-white"
              onClick={() => scrollToCategory(category.name)}
            >
              <span className="text-2xl">{category.icon}</span>
              <p>{category.name}</p>
            </div>
          ))}
          {/*more info less info*/}
          {!showAllCategories ? (
            <div
              className="bg-white-200 p-4 m-2 rounded-lg text-center cursor-pointer w-24 shadow-md shadow-gray border border-white"
              onClick={() => setShowAllCategories(true)}
            >
              <span className="text-2xl">➕</span>
              <p>More Info</p>
            </div>
          ) : (
            <div
              className="bg-white-200 p-4 m-2 rounded-lg text-center cursor-pointer w-24 shadow-md shadow-gray border border-white"
              onClick={() => setShowAllCategories(false)}
            >
              <span className="text-2xl">➖</span>
              <p>Less Info</p>
            </div>
          )}
        </section>

        
        {/* food items */}
        <div>
          {Object.keys(sortedFoodItems).map(category => (
            <Element name={category} key={category}>
              {sortedFoodItems[category].length > 0 && 
                <h3 className="text-xl font-bold mt-5 mb-3">{category}</h3>
              }
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedFoodItems[category].map(item => (
                  <div key={item.name} className="border border-gray-300 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-800">
                      {item.special === 'yes' ? (
                        <>
                          <span className="line-through mr-2">{item.price}</span>
                          <span>{`$${(parseFloat(item.price.slice(1)) * 0.6).toFixed(2)}`}</span>
                        </>
                      ) : (
                        item.price
                      )}
                    </p>
                    <div className='flex justify-end'>
                      <button
                        onClick={() => addToOrder(category, item)}
                        className="mt-2 p-2 bg-green-500 text-white rounded-lg"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => removeFromOrder(category, item)}
                        className="mt-2 p-2 bg-red-500 text-white rounded-lg ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Element>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-5">
          <h3 className="text-xl font-bold mb-3">Your Order</h3>
          {Object.keys(order).length === 0 ? (
            <p>No items in your order.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(order).map(category => (
                order[category].map(item => (
                  <div key={item.name} className="border border-gray-300 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-800">
                      {item.special === 'yes' ? (
                        <>
                          <span className="line-through mr-2">{item.price}</span>
                          <span>{`$${(parseFloat(item.price.slice(1)) * 0.6).toFixed(2)}`}</span>
                        </>
                      ) : (
                        item.price
                      )}
                    </p>
                    <p className="text-gray-800">Quantity: {item.quantity}</p>
                    <button
                      onClick={() => removeFromOrder(category, item)}
                      className="mt-2 p-2 bg-red-500 text-white rounded-lg"
                    >
                      Remove
                    </button>
                    {console.log(order)}
                  </div>
                ))
              ))}
            </div>
          )}
        </div>
      </div>
    
  );
};

export default MenuPage;
