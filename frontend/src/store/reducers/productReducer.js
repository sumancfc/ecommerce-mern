import axios from "axios";
import {
  FETCH_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_RESET,
  PRODUCT_REVIEW_SUCCESS,
} from "../constants";

export const productReducer = (state = { products: [] }, action) => {
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return { ...state, products: action.payload };
  }

  return state;
};

//single product
export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS: {
      return { loading: false, product: action.payload };
    }
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//review product
export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SUCCESS: {
      return { loading: false, success: true };
    }
    case PRODUCT_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case PRODUCT_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
