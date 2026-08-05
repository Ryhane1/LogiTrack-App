import { Link } from "react-router-dom";
// import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🏥 HealthCare+</Link>
      </div>

      <div className="navbar-user">
        <span>Bienvenue</span>
      </div>
    </nav>
  );
}

export default Navbar;