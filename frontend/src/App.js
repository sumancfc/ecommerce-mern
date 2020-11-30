import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { useDispatch } from "react-redux";

//pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import PageNotFound from "./pages/PageNotFound";

//auth
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { auth } from "./firebase";
import { getCurrentUser } from "./store/actions/userAction";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";

//users

//admin
import CreateCategory from "./pages/admin/category/CreateCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import CreateSubCategory from "./pages/admin/subcategory/CreateSub";
import UpdateSubCategory from "./pages/admin/subcategory/UpdateSub";

import AdminRoute from "./components/routes/AdminRoute";
import AdminProfile from "./pages/admin/AdminDashboard";

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
          <AdminRoute exact path='/admin/category' component={CreateCategory} />
          <AdminRoute
            exact
            path='/admin/category/:slug'
            component={UpdateCategory}
          />
          <AdminRoute
            exact
            path='/admin/subcategory'
            component={CreateSubCategory}
          />
          <AdminRoute
            exact
            path='/admin/subcategory/:slug'
            component={UpdateSubCategory}
          />

          <Route exact component={PageNotFound} />
        </Switch>
      </Router>
    </ToastProvider>
  );
};

export default App;
