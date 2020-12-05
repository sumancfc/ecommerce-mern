import axios from "axios";
import {
  FETCH_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
} from "../constants";

export const getAllProductsFrom = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/products`);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data });
    //     console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export const productDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/product/${slug}`
    );

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reviewProduct = (productId, review, authtoken) => async (
  dispatch
) => {
  try {
    dispatch({
      type: PRODUCT_REVIEW_REQUEST,
    });

    const config = {
      headers: { authtoken },
    };

    await axios.put(
      `${process.env.REACT_APP_API}/product/${productId}/review`,
      review,
      config
    );

    dispatch({
      type: PRODUCT_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
