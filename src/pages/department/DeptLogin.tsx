  import { useNavigate } from "react-router-dom";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { mockDepartmentLogin } from "../../mock/mockLogin";
  import { useDepartmentAuth } from "../../contexts/DeptAuthContext";

  export default function DeptLogin() {
    const navigate = useNavigate();
    const { login } = useDepartmentAuth();

    const [username, setUsername] =
      useState("");

    const [password, setPassword] =
      useState("");

    const [loading, setLoading] =
      useState(false);

    const handleSubmit = async (
      e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

      try {
        setLoading(true);
        
        // const data = await apiFetch<any>(
        //   import.meta.env.VITE_API_BASE_URL+"/department-admin/login", 
        //   {
        //     method: "POST",
        //     auth: false,
        //     body: JSON.stringify({
        //       username,
        //       password,
        //     }),
        //   }
        // );

        // mock login
        const data =
          await mockDepartmentLogin(
            username,
            password
          );
        // mock login

        const token = data?.access_token;

        if (!token) {
          throw new Error(
            "No auth token received"
          );
        }

        login(
          data.department_id,
          data.access_token
        );

        navigate("/department/semesters");

      } catch (error) {
        console.error(
          "Department Login Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="grid min-h-[calc(100vh-170px)] place-items-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-8 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white">
                Department Portal
              </h1>

              <p className="mt-2 text-white/70">
                Sign in to manage semesters,
                subjects and modules
              </p>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Department User ID"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-xs text-white/50">
                OR
              </span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <Link
              to="/login"
              className="text-center text-sm font-semibold text-white/70 transition hover:text-white"
            >
              Back to User Login
            </Link>
          </form>
        </div>
      </div>
    );
  }