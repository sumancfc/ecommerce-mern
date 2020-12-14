import { ADD_TO_COMPARE, DELETE_FROM_COMPARE } from "../constants";

export const addToCompare = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Added To Compare", {
        appearance: "success",
        autoDismiss: true,
      });
    }
    dispatch({ type: ADD_TO_COMPARE, payload: item });
  };
};

export const deleteFromCompare = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Removed From Compare", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_FROM_COMPARE, payload: item });
  };
};
