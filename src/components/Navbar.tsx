import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="lg:max-w-5xl md:max-w-lg m-auto">
      <div className="flex w-full py-3 px-5 items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-bold text-2xl">
          Lorenta
        </Link>

        <div className="items-center gap-3 relative">

          {/* Desktop Nav */}
          {loggedIn && (
            <div className="hidden md:flex gap-5">
              <Link className="nav-link" to="/cart">Cart</Link>
              <Link className="nav-link" to="/upload">Upload</Link>
              <Link className="nav-link" to="/history">History</Link>
              <Link className="nav-link text-red-500" to="/logout">Logout</Link>
            </div>
          )}

          {/* Login button */}
          {!loggedIn && (
            <Button onClick={() => navigate("/login")}>
              Log in
            </Button>
          )}

          {/* Mobile */}
          {loggedIn && (
            <div className="flex md:hidden gap-6 items-center">
              <Link className="nav-btn flex items-center gap-1" to="/cart">
                <TiShoppingCart />
              </Link>

              {/* Profile button */}
              <div className="relative" ref={menuRef}>
                <button
                  className="nav-btn"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  <FaUserAlt />
                </button>

                {/* Popup menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                    <Link
                      to="/upload"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Upload
                    </Link>

                    <Link
                      to="/history"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      History
                    </Link>

                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-red-500 hover:bg-gray-100"
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