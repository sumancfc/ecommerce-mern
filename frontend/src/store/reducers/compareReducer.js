import { ADD_TO_COMPARE, DELETE_FROM_COMPARE } from "../constants/index";

const initialState = [];

const compareReducer = (state = initialState, action) => {
  const compareItems = state,
    product = action.payload;

  if (action.type === ADD_TO_COMPARE) {
    const compareItem = compareItems.filter(
      (item) => item._id === product._id
    )[0];
    if (compareItem === undefined) {
      return [...compareItems, product];
    } else {
      return compareItems;
    }
  }

  if (action.type === DELETE_FROM_COMPARE) {
    const remainingItems = (compareItems, product) =>
      compareItems.filter((compareItem) => compareItem._id !== product._id);
    return remainingItems(compareItems, product);
  }

  return compareItems;
};

export default compareReducer;
