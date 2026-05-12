import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSuccess = async (credentialResponse: any) => {

    try {

      const response = await fetch(
        "https://unfearingly-heterozygous-brittny.ngrok-free.dev/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_token: credentialResponse.credential,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();

      console.log(data);

      login(credentialResponse.credential);

      navigate("/upload");

    } catch (error) {

      console.error(error);

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
      </div>
    </div>
  );
}

export default Login;
