import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logox.png";

function Navbar() {
    const username = localStorage.getItem("nom");
    const role = localStorage.getItem("role");

    return (
        <nav className="navbar">


            <div className="navbar-user">
                <span>{username}</span>
                <small>({role})</small>
            </div>
        </nav>
    );
}

export default Navbar;