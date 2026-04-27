import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function handleLogin(){
  console.log("Login")
}

function Login() {
  return (
  <div className="flex justify-center items-center min-h-[70vh]">
    <form className="flex flex-col justify-center items-center shadow mx-auto rounded-lg py-30 w-full">

      <h1 className="text-3xl">Welcome to Lorenta</h1>
      <button onClick={handleLogin} className="shadow-md text-gray-700 flex items-center gap-3 px-8 py-2 rounded-3xl bg-white mt-10">
        <FcGoogle/>Continue with Google
      </button>
      <p className="underline my-3"><Link to="/">Go to home</Link></p>

      {/* fake log toggle  */}
      <Link to="/logout">Fake login</Link>
    </form>
  </div>
  );
  
}

export default Login;