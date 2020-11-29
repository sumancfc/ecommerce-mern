import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ user, ...rest }) => {
  // const { user } = this.props;
  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

const mapStateToProps = (state) => {
  return {
    user: state.userList,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
