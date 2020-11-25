import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import Shop from "./pages/Shop";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login-register' exact component={LoginRegister} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
