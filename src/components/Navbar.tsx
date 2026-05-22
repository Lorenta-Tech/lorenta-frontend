import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const loggedIn = !!user;

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/15 bg-darkbg/90 backdrop-blur-md">

      <div className="mx-auto flex min-h-[68px] w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <img
            src="/src/assets/Lorenta.png"
            alt="PrintPoint Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl font-extrabold text-white">
            Print<span className="text-primary">Point</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">

          {/* DESKTOP NAVBAR */}
          {loggedIn && (
            <div className="hidden items-center gap-2 md:flex">

              <NavLink
                className={({ isActive }) => `rounded-xl px-3 py-2 text-lg font-semibold transition ${isActive ? "bg-primary/15 text-primary" : "text-white/70 hover:bg-primary/15 hover:text-primary"}`}
                to="/cart"
              >
                Cart
              </NavLink>

              <NavLink
                className={({ isActive }) => `rounded-xl px-3 py-2 text-lg font-semibold transition ${isActive ? "bg-primary/15 text-primary" : "text-white/70 hover:bg-primary/15 hover:text-primary"}`}
                to="/upload"
              >
                Upload
              </NavLink>

              <NavLink
                className={({ isActive }) => `rounded-xl px-3 py-2 text-lg font-semibold transition ${isActive ? "bg-primary/15 text-primary" : "text-white/70 hover:bg-primary/15 hover:text-primary"}`}
                to="/jobs"
              >
                Active Jobs
              </NavLink>

              <NavLink
                className={({ isActive }) => `rounded-xl px-3 py-2 text-lg font-semibold transition ${isActive ? "bg-primary/15 text-primary" : "text-white/70 hover:bg-primary/15 hover:text-primary"}`}
                to="/history"
              >
                History
              </NavLink>

              <NavLink
                className="rounded-xl px-3 py-2 text-lg font-semibold text-cta transition hover:bg-cta/10"
                to="/logout"
              >
                Logout
              </NavLink>

            </div>
          )}

          {/* LOGIN BUTTON */}
          {!loggedIn && (
            <Button
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          )}

          {/* MOBILE NAVBAR */}
          {loggedIn && (
            <div className="flex items-center gap-3 md:hidden">

              {/* Cart Button */}
              <Link
                className="grid size-11 place-items-center rounded-xl bg-primary text-white transition hover:bg-primary/90"
                to="/cart"
                aria-label="Cart"
              >
                <TiShoppingCart size={20} />
              </Link>

              {/* Profile Menu */}
              <div
                className="relative"
                ref={menuRef}
              >

                <button
                  type="button"
                  className="grid size-11 place-items-center rounded-xl bg-primary text-white transition hover:bg-primary/90"
                  onClick={() =>
                    setMenuOpen((prev) => !prev)
                  }
                  aria-label="Open navigation menu"
                  aria-expanded={menuOpen}
                >
                  <FaUserAlt size={18} />
                </button>

                {/* Dropdown */}
                {menuOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.625rem)] z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#241c35] shadow-2xl">

                    <div className="flex flex-col p-2">

                      <NavLink
                        to="/upload"
                        className={({ isActive }) =>
                          `flex min-h-11 items-center rounded-xl px-4 text-sm font-medium transition ${
                            isActive
                              ? "bg-[#7e49f2] text-white"
                              : "text-white/75 hover:bg-white/5 hover:text-white"
                          }`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        Upload
                      </NavLink>

                      <NavLink
                        to="/jobs"
                        className={({ isActive }) =>
                          `flex min-h-11 items-center rounded-xl px-4 text-sm font-medium transition ${
                            isActive
                              ? "bg-[#7e49f2] text-white"
                              : "text-white/75 hover:bg-white/5 hover:text-white"
                          }`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        Active Jobs
                      </NavLink>

                      <NavLink
                        to="/history"
                        className={({ isActive }) =>
                          `flex min-h-11 items-center rounded-xl px-4 text-sm font-medium transition ${
                            isActive
                              ? "bg-[#7e49f2] text-white"
                              : "text-white/75 hover:bg-white/5 hover:text-white"
                          }`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        History
                      </NavLink>

                      <div className="my-2 border-t border-white/10" />

                      <NavLink
                        to="/logout"
                        className="flex min-h-11 items-center rounded-xl px-4 text-sm font-medium text-[#f2cb07] transition hover:bg-[#f2cb07]/10"
                        onClick={() => setMenuOpen(false)}
                      >
                        Logout
                      </NavLink>

                    </div>

                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}