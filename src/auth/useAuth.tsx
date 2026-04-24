import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<null | { name: string }>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // In real app → verify token with backend
      setUser({ name: "J" });
    }
  }, []);

  const login = () => {
    localStorage.setItem("token", "fake-token");
    setUser({ name: "J" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
}