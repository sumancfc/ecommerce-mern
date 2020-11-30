import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_RESET,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_SINGLE_FAIL,
  CATEGORY_SINGLE_REQUEST,
  CATEGORY_SINGLE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_SINGLE_RESET,
} from "../constants/category";

//get all categories
export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {
        loading: true,
        categories: [],
      };

    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };

    case CATEGORY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//get all categories
export const categorySingleReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_SINGLE_REQUEST:
      return {
        loading: true,
      };

    case CATEGORY_SINGLE_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };

    case CATEGORY_SINGLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CATEGORY_SINGLE_RESET:
      return {};

    default:
      return state;
  }
};

//create category
export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };

    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };

    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case CATEGORY_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

//update category
export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };

    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };

    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case CATEGORY_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

//delete category
export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };

    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };

    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case CATEGORY_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
