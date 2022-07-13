import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuth } from "./Services";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = getAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Component {...props} />;
        if (!auth)
          return (
            <Redirect
              to={{ path: "/sign-in", state: { from: props.location } }}
            />
          );
      }}
    />
  );
};

export default PrivateRoute;
