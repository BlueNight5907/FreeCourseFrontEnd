import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ teacherOnly, redirectPath = "/login" }) {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!accessToken) {
    navigate("/login");
  }

  useEffect(() => {}, []);

  return <Outlet />;
}
export default Protected;
