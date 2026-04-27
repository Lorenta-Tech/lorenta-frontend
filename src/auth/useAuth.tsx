import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<null | { name: string }>(null);

  useEffect(() => {
    var params = {
      'client_id': `${import.meta.env.VITE_CLIENT_ID}`,
      'redirect_uri': 'http://localhost:5173/upload',
      'response_type': 'token',
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly',
      'include_granted_scopes': 'true',
      'state': 'pass-through value'
    };

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