import React, { useState } from 'react';
import { Link, Element, scroller } from 'react-scroll';


const MenuPage = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('none');
  const [order, setOrder] = useState({});

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

  //scroll functionality
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

  //for searching
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

  //for filtering/sorting(not functional yet)
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

  //adding and removing from order functionality
  const addToOrder = (category, item) => {
    setOrder(prevOrder => {
      const categoryOrder = prevOrder[category] || [];
      const itemIndex = categoryOrder.findIndex(i => i.name === item.name);
      //console.log(itemIndex);
      if (itemIndex === -1) {
        return {
          ...prevOrder,//array of objects category, each category is an object again containing a property quantity.
          [category]: [...categoryOrder, { ...item, quantity: 1 }],
        };
      } else {
        const updatedItem = { ...categoryOrder[itemIndex], quantity: categoryOrder[itemIndex].quantity + 1 };
        console.log("value increased");
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
      //console.log("remove called");
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
    <div className="p-5">
      <header className="text-center mb-5">
        <h1 className="text-2xl ">Welcome To</h1>
        <h2 className="text-2xl font-bold text-red-500">Desi Tadka </h2>
      </header>

      {/*special offers*/}
      <section className="relative mb-5">
        <div className="bg-red-400 p-4 rounded-lg text-center mx-4 my-4 min-h-40 ">
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
      {/*search bar*/}
      <section className="flex justify-center mb-2">
          <form action="/search" className="max-w-[480px] w-full px-4">
            <div className="relative">
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border h-12 shadow p-4 rounded-lg dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
                placeholder="search"
              />
              <button type="submit">
                <svg className="text-teal-400 h-5 w-5 absolute top-3.5 right-3 fill-current dark:text-teal-300" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{enableBackground:"new 0 0 56.966 56.966"}} xmlSpace="preserve">
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z">
                  </path>
                </svg>
              </button>
            </div>
          </form>
      </section>
      {searchQuery!=='' && Object.keys(filteredFoodItems).map(category => (
        filteredFoodItems[category].length > 0 && (
          <Element key={category} name={category} className="mb-5">
            <h2 className="text-xl font-bold mb-3">{category}</h2>
            {filteredFoodItems[category].map(item => (
              <div key={item.name} className="p-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p className="font-bold">{item.price}</p>
              </div>
            ))}
          </Element>
        )
      ))}
        {/*category divs*/}
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
      {/*food items*/}
      <section>
        {searchQuery==='' && Object.keys(foodItems).map(category => (
          <Element key={category} name={category} className="mb-5">
            <h2 className="text-xl font-bold mb-3">{category}</h2>
            {foodItems[category].map(item => (
              <div key={item.name} className="p-4 border-b border-gray-300 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="font-bold">{item.price}</p>
                </div>
                <div className="flex items-center">
                {/*conditional rendering for adding orders or removing them*/}
                  {order[category] && order[category].some(i => i.name === item.name) ? (
                    <>
                      <button
                        className="text-red-500"
                        onClick={() => removeFromOrder(category, item)}
                      >
                        <span className="mr-3">-</span>
                      </button>
                      <span>{order[category].find(i => i.name === item.name).quantity}</span>
                      <button
                        className="text-green-500"
                        onClick={() => addToOrder(category, item)}
                      >
                        <span className='ml-3'>+</span>
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-green-500"
                      onClick={() => addToOrder(category, item)}
                    >
                      <span>+</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Element>
        ))}
      </section>
    </div>
  );
};

export default MenuPage;
