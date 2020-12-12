import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ ...rest }) => {
  const user = useSelector((state) => state.userList);

  // console.log(user);

  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default PrivateRoute;
