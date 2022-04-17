import React from "react";
import { Outlet } from "react-router-dom";

function Protected({ teacherOnly, redirectPath = "/login" }) {
  return <Outlet />;
}
export default Protected;
