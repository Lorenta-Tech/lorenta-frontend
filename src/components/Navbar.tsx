import { Link, useNavigate } from "react-router-dom";
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
    <nav className="lg:max-w-5xl md:max-w-lg m-auto">

      <div className="flex w-full py-3 px-5 items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-2xl text-textprimary"
        >
          Lorenta
        </Link>

        <div className="flex items-center gap-3 relative">

          {/* =========================
              DESKTOP NAVBAR
          ========================== */}
          {loggedIn && (
            <div className="hidden md:flex items-center gap-5">

              <Link
                className="nav-link"
                to="/cart"
              >
                Cart
              </Link>

              <Link
                className="nav-link"
                to="/upload"
              >
                Upload
              </Link>

              <Link
                className="nav-link"
                to="/jobs"
              >
                Active Jobs
              </Link>

              <Link
                className="nav-link"
                to="/history"
              >
                History
              </Link>

              <Link
                className="nav-link text-red-500"
                to="/logout"
              >
                Logout
              </Link>

            </div>
          )}

          {/* =========================
              LOGIN BUTTON
          ========================== */}
          {!loggedIn && (
            <Button
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          )}

          {/* =========================
              MOBILE NAVBAR
          ========================== */}
          {loggedIn && (
            <div className="flex md:hidden gap-4 items-center">

              {/* Cart Button */}
              <Link
                className="nav-btn flex items-center gap-1"
                to="/cart"
              >
                <TiShoppingCart size={20} />
              </Link>

              {/* Profile Menu */}
              <div
                className="relative"
                ref={menuRef}
              >

                <button
                  className="nav-btn"
                  onClick={() =>
                    setMenuOpen((prev) => !prev)
                  }
                >
                  <FaUserAlt size={18} />
                </button>

                {/* Dropdown */}
                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-2xl shadow-xl py-2 z-50 border border-gray-100">

                    <Link
                      to="/upload"
                      className="block px-4 py-3 hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Upload
                    </Link>

                    <Link
                      to="/jobs"
                      className="block px-4 py-3 hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Acive Jobs
                    </Link>

                    <Link
                      to="/history"
                      className="block px-4 py-3 hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      History
                    </Link>

                    <Link
                      to="/logout"
                      className="block px-4 py-3 text-red-500 hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Logout
                    </Link>

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