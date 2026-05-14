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

      // Store backend JWT
      login(token);
      setLoading(false);
      navigate("/upload");

    } catch (error) {

      console.error("Google Login Error:", error);

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
          <div>
            {
              loading ? (
                <div>
                  Redirecting to next page...
                </div>
              ) : (
                <div>
                  <div className="w-full flex justify-center">
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

                  <Link
                    to="/"
                    className="text-sm font-semibold text-white/70 transition hover:text-primary"
                  >
                    Go to home
                  </Link>
                </div>
              )
            }
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Login;