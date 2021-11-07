import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  const authedUser = useSelector(state => state.users.currentUser)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authedUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute
