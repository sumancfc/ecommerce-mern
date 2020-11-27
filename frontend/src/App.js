import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Shop from "./pages/Shop";
import { auth } from "./firebase";
import { currentUser } from "./store/actions/userAction";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userIdToken = await user.getIdTokenResult();

        currentUser(userIdToken.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: res.data.email,
                name: res.data.name,
                role: res.data.role,
                id: res.data._id,
                token: userIdToken.token,
              },
            });
          })
          .catch((err) => console.log(err));
      }
      // console.log(user);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <ToastProvider placement='top-center'>
      <Router>
        <Switch>
          <Route path='/register' exact component={Register} />
          <Route path='/register/complete' exact component={RegisterComplete} />
          <Route path='/forgot/password' exact component={ForgotPassword} />
          <Route path='/login' exact component={Login} />
          <Route path='/shop' exact component={Shop} />
          <Route path='/' exact component={Home} />
          <Route exact component={PageNotFound} />
        </Switch>
      </Router>
    </ToastProvider>
  );
};

export default App;
