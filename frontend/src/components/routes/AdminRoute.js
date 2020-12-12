import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { getCurrentAdmin } from "../../store/actions/userAction";

const AdminRoute = ({ ...rest }) => {
  const [admin, setAdmin] = useState(false);

  const user = useSelector((state) => state.userList);

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

export default AdminRoute;
