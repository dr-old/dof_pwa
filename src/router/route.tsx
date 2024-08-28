import { useAuth } from "../context/useAuth"; // Update the import path if necessary
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoute() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
