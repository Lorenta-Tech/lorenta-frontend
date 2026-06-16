import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import apiFetch from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Google credential missing");
      }

      setLoading(true);

      const data = await apiFetch<any>(
        "/auth/google",
        {
          method: "POST",
          auth: false,
          body: JSON.stringify({
            id_token: credentialResponse.credential,
          }),
        }
      );

      const token = data?.data?.token;

      if (!token) {
        throw new Error("No auth token received");
      }

      login(token);
      navigate("/upload");
    } catch (error) {
      console.error("Google Login Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-170px)] place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-extrabold text-white">
            Welcome to Lorenta
          </h1>

          <p className="text-white/70">
            Continue with Google to access your account
          </p>

          {loading ? (
            <div className="text-white">
              Redirecting to next page...
            </div>
          ) : (
            <div className="flex w-full flex-col items-center gap-4">
              <div className="flex w-full justify-center">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  theme="filled_blue"
                  size="large"
                  shape="pill"
                  text="continue_with"
                />
              </div>

              <div className="flex w-full items-center gap-3">
                <div className="h-px flex-1 bg-white/20" />
                <span className="text-xs text-white/50">
                  OR
                </span>
                <div className="h-px flex-1 bg-white/20" />
              </div>

              <Link
                to="/department/login"
                className="w-full rounded-lg border border-white/20 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10"
              >
                Department Admin Login
              </Link>

              <Link
                to="/"
                className="text-sm font-semibold text-white/70 transition hover:text-primary"
              >
                Go to home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;