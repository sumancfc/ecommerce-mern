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
import { getCurrentUser } from "./store/actions/userAction";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import AdminProfile from "./pages/admin";
// import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userIdToken = await user.getIdTokenResult();

        getCurrentUser(userIdToken.token)
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
          <Route exact path='/register' component={Register} />
          <Route exact path='/register/complete' component={RegisterComplete} />
          <Route exact path='/forgot/password' component={ForgotPassword} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/' component={Home} />
          <AdminRoute exact path='/admin/dashboard' component={AdminProfile} />
          <Route exact component={PageNotFound} />
        </Switch>
      </Router>
    </ToastProvider>
  );
};

export default App;
