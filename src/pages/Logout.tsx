import Button from "../components/Button";
import { useState } from "react";

function Logout() {
  const [log, setLog] = useState(
    !!localStorage.getItem("token")
  );

  const handleToggleLog = () => {
    setLog(prev => {
      const next = !prev;

      if (next) {
        localStorage.setItem("token", "true");
        
      } else {
        localStorage.removeItem("token");
        
      }
      return next;
    });
    window.location.reload();
  };

  return (
    <>
      <h1>{log ? "Logged in" : "Logged out"}</h1>
      <Button onClick={handleToggleLog}>
        Toggle Log
      </Button>
    </>
  );
}

export default Logout;