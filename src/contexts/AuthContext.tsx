import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UserType = {
  token: string;
};

type AuthContextType = {
  user: UserType | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token });
    }

  }, []);

  const login = (token: string) => {
    // Remove any department session
    localStorage.removeItem("departmentToken");
    localStorage.removeItem("departmentUser");

    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("departmentToken");
    localStorage.removeItem("departmentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}