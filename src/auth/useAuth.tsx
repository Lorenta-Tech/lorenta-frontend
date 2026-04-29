import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<null | { name: string }>(null);

  useEffect(() => {

  }, []);

  const login = () => {
    localStorage.setItem("token", "fake-token");
    setUser({ name: "fakeUser" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
}