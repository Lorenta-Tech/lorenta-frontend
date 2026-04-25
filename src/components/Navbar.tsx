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
        <nav className="lg:max-w-5xl md:max-w-lg m-auto">
            <div className="flex w-full py-3 px-5 items-center justify-between">

                {/* Logo */}
                <Link to="/" className="font-bold text-2xl">
                    Lorenta
                </Link>

                <div className="items-center gap-3">
                    {/* Desktop Nav */}
                    {loggedIn && (
                        <div className="hidden md:flex gap-5">
                            <Link className="nav-link" to="/cart">Cart</Link>
                            <Link className="nav-link" to="/upload">Upload</Link>
                            <Link className="nav-link" to="/history">History</Link>
                            <Link className="nav-link text-red-500" to="/logout" >Logout</Link>
                        </div>
                    )}                

                    {/* Login button*/}
                    {!loggedIn && (
                        <Button onClick={() => navigate("/login")}>
                            Log in
                        </Button>
                    )}

                    {/* Mobile view*/}
                    {loggedIn && (
                        <div className="flex md:hidden gap-6">
                            <Link className="nav-btn" to="/cart">Cart<TiShoppingCart /></Link>
                            <Link className="nav-btn" to="/profile"><FaUserAlt /></Link>
                        </div>
                    )}
                </div>
            </div>

        </nav>
        
    );
}