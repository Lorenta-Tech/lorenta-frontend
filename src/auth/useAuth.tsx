// import { useState, useEffect } from "react";

// export function useAuth() {
//   const [user, setUser] = useState<null | { name: string }>(null);

//   useEffect(() => {
    
//   }, []);

//   const login = () => {
//     localStorage.setItem("token", "fake-token");
//     setUser({ name: "fakeUser" });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return { user, login, logout };
// }

import { useState, useEffect } from "react";

type UserType = {
  token: string;
};

export function useAuth() {

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token });
    }

  }, []);

  const login = (token: string) => {

    localStorage.setItem("token", token);

    setUser({ token });
  };

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
}