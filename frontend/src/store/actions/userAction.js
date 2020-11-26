import firebase from "firebase";

export const logout = (addToast, history) => {
  return (dispatch) => {
    if (addToast) {
      addToast("User Logout", { appearance: "success", autoDismiss: true });
    }
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/");
  };
};
