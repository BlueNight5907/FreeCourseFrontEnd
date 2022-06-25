import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AUTHENTICATION_REQUEST } from "store/types/data-types/auth-types";
import { useDispatch } from "react-redux";

function Protected({ teacherOnly, redirectPath = "/login", children }) {
  const { user, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: AUTHENTICATION_REQUEST });
    }
  }, [user, accessToken, dispatch]);

  return accessToken ? children : <Navigate to={redirectPath} />;
}
export default Protected;
