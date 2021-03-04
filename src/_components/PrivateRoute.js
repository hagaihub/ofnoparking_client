import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../contexts/AuthContext.js";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { isAuthenticated, isLoading } = useContext(authContext);

  return (
    <Route
      {...otherProps}
      render={(props) =>
        !isLoading ? (
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={otherProps.redirectTo ? otherProps.redirectTo : "/signin"}
            />
          )
        ) : (
          <div>loading...</div>
        )
      }
    />
  );
};

export default PrivateRoute;
