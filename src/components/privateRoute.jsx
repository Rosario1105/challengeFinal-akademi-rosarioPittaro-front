import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  let user = null;
  let token = null;

  try {
    user = JSON.parse(localStorage.getItem("userInfo"));
    token = localStorage.getItem("token");
  } catch (error) {
    user = null;
    token = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
