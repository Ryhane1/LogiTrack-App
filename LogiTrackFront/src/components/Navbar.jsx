import { Link } from "react-router-dom";

function Navbar() {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/dashboard">📦 LogiTrack</Link>
            </div>

            <div className="navbar-user">
                <span>{username}</span>
                <small>{role}</small>
            </div>
        </nav>
    );
}

export default Navbar;