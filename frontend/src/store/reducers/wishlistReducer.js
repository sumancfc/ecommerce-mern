import { ADD_TO_WISHLIST } from "../constants/wishlist";

const initialState = [];

export const addWishlistReducer = (state = initialState, action) => {
  const wishlistItems = state,
    product = action.payload;
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const wishlistItem = wishlistItems.filter(
        (item) => item.id === product._id
      )[0];
      if (wishlistItem === undefined) {
        return [...wishlistItems, product];
      } else {
        return wishlistItems;
      }

    default:
      return wishlistItems;
  }
};
