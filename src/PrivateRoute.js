import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuth } from "./Services";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = getAuth();
  console.log("auth", auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Component {...props} />;
        else {
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
