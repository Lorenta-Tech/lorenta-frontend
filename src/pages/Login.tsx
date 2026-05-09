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
    <div className="min-h-[80vh] flex justify-center items-center px-5">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        <div className="flex flex-col items-center">

          <h1 className="text-4xl font-bold text-textprimary text-center">
            Welcome to Lorenta
          </h1>

          <p className="text-gray-500 mt-3 text-center">
            Continue with Google to access your account
          </p>

          <div className="mt-10 w-full flex justify-center">

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
            className="mt-8 text-sm underline text-gray-500 hover:text-black transition"
          >
            Go to home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;