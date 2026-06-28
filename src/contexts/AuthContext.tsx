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

const TOKEN_KEY = "token";
const LOGIN_DATE_KEY = "loginDate";
const EXPIRY_DAYS = 29;

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LOGIN_DATE_KEY);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const loginDate = localStorage.getItem(LOGIN_DATE_KEY);

    if (!token) return;

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

    setUser({ token });
  }, []);

  const login = (token: string) => {
    localStorage.removeItem("departmentToken");
    localStorage.removeItem("departmentId");
    localStorage.removeItem("departmentLoginDate");

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(
      LOGIN_DATE_KEY,
      new Date().toISOString()
    );

    setUser({ token });
  };

  const logout = () => clearAuth();

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