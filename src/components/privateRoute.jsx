import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user')); // ojo acá, en authActions guardas en 'userInfo'
  } catch (error) {
    user = null;
  }
  const token = localStorage.getItem('token');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
