import axios from "axios";
import { FETCH_PRODUCTS_SUCCESS } from "../constants";

export const getAllProductsFrom = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/products`);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data });
    //     console.log(data);
  } catch (err) {
    console.log(err);
  }
};
