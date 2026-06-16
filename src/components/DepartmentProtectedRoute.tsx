import { Navigate, Outlet } from "react-router-dom";

export default function DepartmentProtectedRoute() {
  const userToken = localStorage.getItem("token");
  const departmentToken = localStorage.getItem("departmentToken");

  if (!departmentToken || userToken) {
    return <Navigate to="/department/login" replace />;
  }

  return <Outlet />;
}