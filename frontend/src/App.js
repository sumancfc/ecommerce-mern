import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import Shop from "./pages/Shop";

const App = () => {
  return (
    <ToastProvider placement='top-center'>
      <Router>
        <Switch>
          <Route path='/login-register' exact component={LoginRegister} />
          <Route path='/register' exact component={Register} />
          <Route path='/register/complete' exact component={RegisterComplete} />
          <Route path='/shop' exact component={Shop} />
          <Route path='/' exact component={Home} />
        </Switch>
      </Router>
    </ToastProvider>
  );
};

export default App;
