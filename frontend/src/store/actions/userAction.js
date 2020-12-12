import firebase from "firebase";
import axios from "axios";
import { auth, googleAuthProvider } from "../../firebase";
import { LOGGED_IN_USER, LOGOUT } from "../constants";

//create update user from backend
export const userCreateUpdate = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

//get current user
export const getCurrentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

//get admin from user
export const getCurrentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

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

//redirect user per role
const userRoleRedirect = (res, history) => {
  // console.log(res);
  if (res.data.role === "admin") {
    history.push("/admin/dashboard");
  } else {
    history.push("/user/dashboard");
  }
};

//user register complete
export const userRegisterComplete = (
  email,
  password,
  history,
  addToast
) => async (dispatch) => {
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

      userCreateUpdate(userIdToken.token)
        .then((res) => {
          console.log("clg", res);
          dispatch({
            type: LOGGED_IN_USER,
            payload: {
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              id: res.data._id,
              token: userIdToken.token,
            },
          });
          addToast("User Created", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((err) => console.log(err));

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

    userCreateUpdate(userIdToken.token)
      .then((res) => {
        console.log("clg", res);
        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            email: res.data.email,
            name: res.data.name,
            role: res.data.role,
            id: res.data._id,
            token: userIdToken.token,
          },
        });
        addToast("Login Success", {
          appearance: "success",
          autoDismiss: true,
        });
        userRoleRedirect(res, history);
      })
      .catch((err) => console.log(err));
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

      userCreateUpdate(userIdToken.token)
        .then((res) => {
          console.log("clg", res);
          dispatch({
            type: LOGGED_IN_USER,
            payload: {
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              id: res.data._id,
              token: userIdToken.token,
            },
          });
          addToast("Login Success", {
            appearance: "success",
            autoDismiss: true,
          });
          userRoleRedirect(res, history);
        })
        .catch((err) => console.log(err));
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
