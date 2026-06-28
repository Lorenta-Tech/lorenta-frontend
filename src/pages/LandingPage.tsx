import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDepartmentAuth } from "../contexts/DeptAuthContext";
import Home from "./Home";

export default function LandingPage() {
  const { user } = useAuth();
  const { departmentId } = useDepartmentAuth();

  if (departmentId) {
    return (
      <Navigate
        to="/department/semesters"
        replace
      />
    );
  }

  if (user) {
    return (
      <Navigate
        to="/upload"
        replace
      />
    );
  }

  return <Home />;
}