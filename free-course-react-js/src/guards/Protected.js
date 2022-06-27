import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AUTHENTICATION_REQUEST } from "store/types/data-types/auth-types";

function Protected({ teacherOnly, redirectPath = "/login", children }) {
  const { user, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && accessToken) {
      dispatch({ type: AUTHENTICATION_REQUEST });
    }
  }, [user, accessToken, dispatch]);

  return accessToken ? children : <Navigate to={redirectPath} />;
}
export default Protected;
