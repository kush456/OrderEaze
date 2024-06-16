import React, { useState } from 'react';
import { Link, Element, scroller } from 'react-scroll';

const MenuPage = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('none');

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
    { name: 'Ice Cream', icon: '🍨' },
  ];

  const foodItems = {
    Burger: [
      { name: 'Cheeseburger', description: 'A delicious cheeseburger', price: '$5.99' },
      { name: 'Veggie Burger', description: 'A tasty veggie burger', price: '$4.99' },
    ],
    Taco: [
      { name: 'Chicken Taco', description: 'Spicy chicken taco', price: '$3.99' },
      { name: 'Beef Taco', description: 'Savory beef taco', price: '$4.49' },
    ],
    // Add more categories and items as needed
  };

  const offers = [
    { title: 'Ice Cream Day', description: 'Get your sweet ice cream', offer: '40% off' },
    { title: 'Burger Fest', description: 'Big Juicy Burgers', offer: 'Buy 1, Get 1 Free!' },
    { title: 'Taco Special', description: 'Tasty Tacos', offer: 'Buy 2, Get 1 Free!' },
    // Add more offers as needed
  ];

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

  const sortedFoodItems = Object.keys(filteredFoodItems).reduce((sortedItems, category) => {
    const sortedCategoryItems = filteredFoodItems[category].sort((a, b) => {
      if (filterOption === 'price-low-to-high') {
        return a.price - b.price;
      } else if (filterOption === 'price-high-to-low') {
        return b.price - a.price;
      }

      return 0;
    });

    return {
      ...sortedItems,
      [category]: sortedCategoryItems,
    };
  }, {});

  return (
    <div className="p-5">
      <header className="text-center mb-5">
        <h1 className="text-2xl ">Welcome To</h1>
        <h2 className="text-2xl font-bold text-red-500">Desi Tadka </h2>
      </header>

      {/*special offers*/}
      <section className="relative mb-5">
        <div className="bg-red-400 p-4 rounded-lg text-center mx-4 my-4 min-h-40">
          <h2 className="text-xl text-left text-white ">{offers[currentOfferIndex].title}</h2>
          <h1 className="text-2xl text-left text-white font-semibold max-w-30">{offers[currentOfferIndex].description}</h1>
          <h1 className="text-4xl text-white font-semibold mt-3">{offers[currentOfferIndex].offer}</h1>
        </div>
        {currentOfferIndex > 0 && (
          <button onClick={prevOffer} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ">❮</button>
        )}
        {currentOfferIndex < offers.length - 1 && (
          <button onClick={nextOffer} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ">❯</button>
        )}
      </section>
      <section>
      <div className="flex items-center mb-4 ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-black w-64 bg-gray-300"
            placeholder="Search"
          />
        </div>
        {searchQuery!=='' && Object.keys(sortedFoodItems).map(category => (
          <Element key={category} name={category} className="mb-5">
            <h2 className="text-xl font-bold mb-3">{category}</h2>
            {sortedFoodItems[category].map(item => (
              <div key={item.name} className="p-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p className="font-bold">{item.price}</p>
              </div>
            ))}
          </Element>
        ))}
      </section>

      <section className="flex flex-wrap justify-around mb-5">
        {categories.map(category => (
          <div
            key={category.name}
            className="bg-white-200 p-4 m-2 rounded-lg text-center cursor-pointer w-24 shadow-md shadow-gray border border-white"
            onClick={() => scrollToCategory(category.name)}
          >
            <span className="text-2xl">{category.icon}</span>
            <p>{category.name}</p>
          </div>
        ))}
      </section>

      <section>
        {searchQuery==='' && Object.keys(foodItems).map(category => (
          <Element key={category} name={category} className="mb-5">
            <h2 className="text-xl font-bold mb-3">{category}</h2>
            {foodItems[category].map(item => (
              <div key={item.name} className="p-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p className="font-bold">{item.price}</p>
              </div>
            ))}
          </Element>
        ))}
      </section>
    </div>
  );
};

export default MenuPage;
