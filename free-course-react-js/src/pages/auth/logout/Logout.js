import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { LOGOUT } from "store/types/data-types/auth-types";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: LOGOUT });
  }, [dispatch]);
  return <Navigate to="/login" />;
};

export default Logout;
