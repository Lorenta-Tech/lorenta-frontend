import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserAlt } from "react-icons/fa";


function isAuthenticated() {
    return !!localStorage.getItem("token");
}

export default function Navbar() {
    const navigate = useNavigate();
    const loggedIn = isAuthenticated();

    return (
        <nav>
            <div className="flex justify-between items-center w-full py-3 px-5">

                {/* Logo */}
                <Link to="/" className="font-bold text-xl">
                    Lorenta
                </Link>

                {/* Desktop Nav */}
                {loggedIn && (
                    <div className="hidden md:flex absolute right-0 gap-6 justify-between mr-15">
                        <Link to="/upload">Upload</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/history">History</Link>
                        <Link to="/logout" className="
                        text-red-500">Logout</Link>
                    </div>
                )}

                {/* Right side */}
                <div className="items-center gap-3">

                    {/* Login button*/}
                    {!loggedIn && (
                        <Button onClick={() => navigate("/login")}>
                            Log in
                        </Button>
                    )}

                    {/* Mobile view*/}
                    {loggedIn && (
                        <div className="flex md:hidden gap-6 text-md">
                            <Link className="nav-btn" to="/cart">Cart<TiShoppingCart /></Link>
                            <Link className="nav-btn" to="/profile"><FaUserAlt /></Link>
                        </div>
                    )}
                </div>
            </div>

        </nav>
    );
}