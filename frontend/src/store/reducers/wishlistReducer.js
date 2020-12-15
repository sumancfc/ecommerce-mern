import { ADD_TO_WISHLIST, DELETE_FROM_WISHLIST } from "../constants/wishlist";

const initialState = [];

const wishlistReducer = (state = initialState, action) => {
  const wishlistItems = state,
    product = action.payload;

  if (action.type === ADD_TO_WISHLIST) {
    const wishlistItem = wishlistItems.filter(
      (item) => item.id === product.id
    )[0];
    if (wishlistItem === undefined) {
      return [...wishlistItems, product];
    } else {
      return wishlistItems;
    }
  }

  if (action.type === DELETE_FROM_WISHLIST) {
    const remainingItems = (wishlistItems, product) =>
      wishlistItems.filter((wishlistItem) => wishlistItem.id !== product.id);
    return remainingItems(wishlistItems, product);
  }

  return wishlistItems;
};

export default wishlistReducer;
