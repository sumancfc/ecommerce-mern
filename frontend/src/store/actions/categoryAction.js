import axios from "axios";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  // CATEGORY_SINGLE_FAIL,
  CATEGORY_SINGLE_REQUEST,
  CATEGORY_SINGLE_SUCCESS,
  // CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
} from "../constants/category";

//get all categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/categories`);

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    //     console.log(data);
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get single category
export const getSingleCategory = (slug, setCategory) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_SINGLE_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/category/${slug}`
    );

    dispatch({ type: CATEGORY_SINGLE_SUCCESS, payload: data });
    setCategory(data.name);
  } catch (error) {}
};

//create category
export const createCategory = (name, authtoken, addToast, setName) => async (
  dispatch
) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });

    const config = {
      headers: { authtoken },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/category`,
      { name },
      config
    );

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });

    addToast(`Category ${name} is created`, {
      appearance: "success",
      autoDismiss: true,
    });
    setName("");
    getAllCategories();
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    //     console.log(error.response.data.message);
    addToast(error.response.data.message, {
      autoDismiss: true,
      appearance: "error",
    });
  }
};

//update category
export const updateCategory = (
  name,
  authtoken,
  slug,
  setName,
  addToast
) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_UPDATE_REQUEST });

    const config = {
      headers: { authtoken },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/category/${slug}`,
      { name },
      config
    );

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });

    addToast(`Category updated`, {
      appearance: "success",
      autoDismiss: true,
    });
    setName("");
  } catch (error) {}
};

//delete category
export const deleteCategory = (slug, authtoken, addToast) => async (
  dispatch
) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/category/${slug}`,
      {
        headers: {
          authtoken,
        },
      }
    );

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data,
    });

    addToast(`${slug} is deleted`, {
      appearance: "success",
      autoDismiss: true,
    });
    getAllCategories();
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,

      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    // console.log(error.response.data.message);
    addToast(error.response.data.message, {
      autoDismiss: true,
      appearance: "error",
    });
  }
};
