import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDepartmentAuth } from "../contexts/DeptAuthContext";

function Logout() {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const {
    logout: departmentLogout,
  } = useDepartmentAuth();

  useEffect(() => {
    logout();
    departmentLogout();
    navigate("/");
  }, [logout, departmentLogout, navigate]);

  return null;
}

export default Logout;