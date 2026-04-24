import { Navigate, Outlet, useLocation } from "react-router-dom";

function isAuthenticated() {
  {/* Yet to do real authentication */}
  return !!localStorage.getItem("token");
}

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}