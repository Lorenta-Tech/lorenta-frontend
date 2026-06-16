import {
  createContext,
  useContext,
  useState,
} from "react";


interface DepartmentAuthContextType {
  departmentUser: string | null;
  login: (
    user: string,
    token: string
  ) => void;
  logout: () => void;
}

const DepartmentAuthContext =
  createContext<DepartmentAuthContextType | null>(
    null
  );

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
  const [departmentUser, setDepartmentUser] =
    useState<string | null>(() => {
      return localStorage.getItem("departmentUser");
    });

  const login = (user: string, token: string) => {
    // Remove any regular user session
    localStorage.removeItem("token");

    localStorage.setItem("departmentToken", token);
    localStorage.setItem("departmentUser", user);

    setDepartmentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("departmentToken");
    localStorage.removeItem("departmentUser");
    localStorage.removeItem("token");
    setDepartmentUser(null);
  };

  return (
    <DepartmentAuthContext.Provider
      value={{
        departmentUser,
        login,
        logout,
      }}
    >
      {children}
    </DepartmentAuthContext.Provider>
  );
}