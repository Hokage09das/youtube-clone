import React from "react";

import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ Component, isAllowed, fallbackPath }) => {
  if (!isAllowed) {
    return (
      <Navigate
        to={fallbackPath}
        replace
      />
    );
  }
  return Component;
};
