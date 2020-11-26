import firebase from "firebase";
import { auth, googleAuthProvider } from "../../firebase";
import { LOGGED_IN_USER, LOGOUT } from "../constants";

//user register
export const userRegister = (email, setEmail, addToast) => async () => {
  const config = {
    url: process.env.REACT_APP_REDIRECT_REGISTER_URL,
    // This must be true.
    handleCodeInApp: true,
  };

  await auth.sendSignInLinkToEmail(email, config);

  addToast(`Email sent to ${email}`, {
    appearance: "success",
    autoDismiss: true,
  });

  window.localStorage.setItem("emailForRegister", email);

  //clear email
  setEmail("");
};

//user register complete
export const userRegisterComplete = (
  email,
  password,
  history,
  addToast
) => async () => {
  try {
    const result = await auth.signInWithEmailLink(email, window.location.href);
    //       console.log(result);
    if (result.user.emailVerified) {
      //remove email from local storage
      window.localStorage.removeItem("emailForRegister", email);

      //get user id token
      let user = auth.currentUser;
      await user.updatePassword(password);

      const userIdToken = await user.getIdTokenResult();

      //  console.log("user", user, "Token Id", userTokenId);

      //redirect user
      history.push("/");
    }
  } catch (error) {
    console.log(error);
    addToast(error.message, {
      autoDismiss: true,
      appearance: "error",
    });
  }
};

// user login using email and password
export const loginUser = (email, password, history, addToast) => async (
  dispatch
) => {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);

    const { user } = result;

    const userIdToken = await user.getIdTokenResult();

    dispatch({
      type: LOGGED_IN_USER,
      payload: { email: user.email, token: userIdToken.token },
    });
    addToast("Login Success", {
      appearance: "success",
      autoDismiss: true,
    });
    history.push("/");
  } catch (error) {
    console.log(error);
    addToast(error.message, {
      appearance: "error",
      autoDismiss: true,
    });
  }
};

//user login using gmail
export const loginUsingGoogle = (history, addToast) => async (dispatch) => {
  auth
    .signInWithPopup(googleAuthProvider)
    .then(async (result) => {
      const { user } = result;

      //  console.log(user);

      const userIdToken = await user.getIdTokenResult();

      dispatch({
        type: LOGGED_IN_USER,
        payload: { email: user.email, token: userIdToken.token },
      });
      history.push("/");
    })
    .catch((err) => {
      console.error(err);
      addToast(err.message, {
        appearance: "error",
        autoDismiss: true,
      });
    });
};

//hanlde email reset
export const passportReset = (email, setEmail, addToast) => async () => {
  const config = {
    url: process.env.REACT_APP_REDIRECT_FORGOT_PASSWORD,
    // This must be true.
    handleCodeInApp: true,
  };

  await auth
    .sendPasswordResetEmail(email, config)
    .then(() => {
      setEmail("");
      addToast("Check your email for password reset link", {
        appearance: "success",
        autoDismiss: true,
      });
    })
    .catch((error) => {
      console.log(error);
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    });
};

//user logout
export const logout = (addToast, history) => {
  return (dispatch) => {
    if (addToast) {
      addToast("User Logout", { appearance: "success", autoDismiss: true });
    }
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    history.push("/login");
  };
};
