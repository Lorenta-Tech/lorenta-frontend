import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface DepartmentAuthContextType {
  departmentId: string | null;
  login: (
    departmentId: string,
    token: string
  ) => void;
  logout: () => void;
}

const DepartmentAuthContext =
  createContext<DepartmentAuthContextType | null>(
    null
  );

const TOKEN_KEY = "departmentToken";
const ID_KEY = "departmentId";
const LOGIN_DATE_KEY = "departmentLoginDate";
const EXPIRY_DAYS = 29;

export const useDepartmentAuth = () => {
  const context = useContext(
    DepartmentAuthContext
  );

  if (!context) {
    throw new Error(
      "useDepartmentAuth must be used within DepartmentAuthProvider"
    );
  }

  return context;
};

export function DepartmentAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [departmentId, setDepartmentId] =
    useState<string | null>(null);

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ID_KEY);
    localStorage.removeItem(LOGIN_DATE_KEY);

    setDepartmentId(null);
  };

  useEffect(() => {
    const token =
      localStorage.getItem(TOKEN_KEY);

    const departmentId =
      localStorage.getItem(ID_KEY);

    const loginDate =
      localStorage.getItem(LOGIN_DATE_KEY);

    if (!token || !departmentId) {
      clearAuth();
      return;
    }

    if (!loginDate) {
      clearAuth();
      return;
    }

    const login = new Date(loginDate);

    if (Number.isNaN(login.getTime())) {
      clearAuth();
      return;
    }

    const diffInDays = Math.floor(
      (Date.now() - login.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diffInDays >= EXPIRY_DAYS) {
      clearAuth();
      return;
    }

    setDepartmentId(departmentId);
  }, []);

  const login = (
    departmentId: string,
    token: string
  ) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginDate");

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ID_KEY, departmentId);

    localStorage.setItem(
      LOGIN_DATE_KEY,
      new Date().toISOString()
    );

    setDepartmentId(departmentId);
  };

  const logout = () => clearAuth();

  return (
    <DepartmentAuthContext.Provider
      value={{
        departmentId,
        login,
        logout,
      }}
    >
      {children}
    </DepartmentAuthContext.Provider>
  );
}