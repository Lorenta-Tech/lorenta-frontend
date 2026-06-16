import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserAlt } from "react-icons/fa";

import Button from "./Button";
import Logo from "../assets/Lorenta.png";

import { useAuth } from "../contexts/AuthContext";
import { useDepartmentAuth } from "../contexts/DeptAuthContext";

type NavbarProps = {
  isDepartment?: boolean;
};

export default function Navbar({
  isDepartment = false,
}: NavbarProps) {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { departmentUser } = useDepartmentAuth();

  const regularLoggedIn = !!user;
  const departmentLoggedIn = !!departmentUser;

  const logoDestination = departmentLoggedIn
    ? "/department/semesters"
    : regularLoggedIn
    ? "/upload"
    : "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/15 bg-darkbg/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[68px] w-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          to={logoDestination}
          className="flex items-center gap-2"
        >
          <img
            src={Logo}
            alt="PrintPoint Logo"
            className="h-8 w-8 object-contain"
          />

          <span className="text-xl font-extrabold text-white">
            Print
            <span className="text-primary">Point</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* ---------------- DESKTOP ---------------- */}

          {regularLoggedIn && (
            <div className="hidden md:flex items-center gap-2">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-lg font-semibold transition ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-white/70 hover:bg-primary/15 hover:text-primary"
                  }`
                }
              >
                Cart
              </NavLink>

              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-lg font-semibold transition ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-white/70 hover:bg-primary/15 hover:text-primary"
                  }`
                }
              >
                Upload
              </NavLink>

              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-lg font-semibold transition ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-white/70 hover:bg-primary/15 hover:text-primary"
                  }`
                }
              >
                Active Jobs
              </NavLink>

              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-lg font-semibold transition ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-white/70 hover:bg-primary/15 hover:text-primary"
                  }`
                }
              >
                History
              </NavLink>

              <NavLink
                to="/logout"
                className="rounded-xl px-3 py-2 text-lg font-semibold text-cta transition hover:bg-cta/10"
              >
                Logout
              </NavLink>
            </div>
          )}

          {departmentLoggedIn && (
            <div className="hidden md:flex items-center">
              <NavLink
                to="/logout"
                className="rounded-xl px-3 py-2 text-lg font-semibold text-cta transition hover:bg-cta/10"
              >
                Logout
              </NavLink>
            </div>
          )}

          {!regularLoggedIn && !departmentLoggedIn && (
            <Button
              onClick={() =>
                navigate(
                  isDepartment
                    ? "/department/login"
                    : "/login"
                )
              }
            >
              Sign In
            </Button>
          )}

          {/* MOBILE */}

          {regularLoggedIn && (
            <div className="flex items-center gap-3 md:hidden">
              <Link
                to="/cart"
                aria-label="Cart"
                className="grid size-11 place-items-center rounded-xl bg-primary text-white transition hover:bg-primary/90"
              >
                <TiShoppingCart size={20} />
              </Link>

              <div
                className="relative"
                ref={menuRef}
              >
                <button
                  type="button"
                  onClick={() =>
                    setMenuOpen((prev) => !prev)
                  }
                  aria-expanded={menuOpen}
                  aria-label="Open menu"
                  className="grid size-11 place-items-center rounded-xl bg-primary text-white transition hover:bg-primary/90"
                >
                  <FaUserAlt size={18} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.5rem)] w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#241c35] shadow-2xl">
                    <div className="flex flex-col p-2">
                      <NavLink
                        to="/upload"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                      >
                        Upload
                      </NavLink>

                      <NavLink
                        to="/jobs"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                      >
                        Active Jobs
                      </NavLink>

                      <NavLink
                        to="/history"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                      >
                        History
                      </NavLink>

                      <div className="my-2 border-t border-white/10" />

                      <NavLink
                        to="/logout"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="rounded-xl px-4 py-3 text-sm font-medium text-[#f2cb07] hover:bg-[#f2cb07]/10"
                      >
                        Logout
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {departmentLoggedIn && (
            <div className="md:hidden">
              <Link
                to="/logout"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}