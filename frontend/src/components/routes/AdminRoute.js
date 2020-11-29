import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { getCurrentAdmin } from "../../store/actions/userAction";

const AdminRoute = ({ user, ...rest }) => {
  // const { user } = this.props;
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      getCurrentAdmin(user.token)
        .then((res) => {
          setAdmin(true);
        })
        .catch((err) => {
          console.log("Is admin?", err);
          setAdmin(false);
        });
    }
  }, [user]);

  return admin ? <Route {...rest} /> : <LoadingToRedirect />;
};

const mapStateToProps = (state) => {
  return {
    user: state.userList,
  };
};

export default connect(mapStateToProps)(AdminRoute);
