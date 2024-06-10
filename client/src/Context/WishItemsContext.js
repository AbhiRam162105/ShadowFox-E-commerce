import React, { createContext, useState } from "react";

export const WishItemsContext = createContext();

export const WishItemsProvider = ({ children }) => {
  const [wishItems, setWishItems] = useState({
    items: [],
  });

  const addItemToWishlist = async (itemId) => {};

  return (
    <WishItemsContext.Provider value={{ wishItems, addItemToWishlist }}>
      {children}
    </WishItemsContext.Provider>
  );
};
