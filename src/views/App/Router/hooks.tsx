import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {} from "src/store/auth";

type SetRedirectArgs = {
  isAuthenticated: boolean;
};

export const SetRedirect = (props: SetRedirectArgs) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isAuthenticated && location.pathname === "/") navigate("/login");
  }, [location, props.isAuthenticated]);

  return [];
};
