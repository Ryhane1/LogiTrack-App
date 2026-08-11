import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/logox.png";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
      <aside className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-header">
            <img src={logo} alt="Logo" className="logo" />
          </div>

          <nav className="sidebar-nav">

            <NavLink to="/dashboard" className="sidebar-link">
               Dashboard
            </NavLink>

            <NavLink to="/clients" className="sidebar-link">
               Clients
            </NavLink>

            <NavLink to="/products" className="sidebar-link">
               Produits
            </NavLink>

            <NavLink to="/orders" className="sidebar-link">
               Commandes
            </NavLink>

            <NavLink to="/profile" className="sidebar-link">
               Mon profil
            </NavLink>

            {role === "ADMIN" && (
                <NavLink to="/users" className="sidebar-link">
                   Utilisateurs
                </NavLink>
            )}
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
             Déconnexion
          </button>
        </div>
      </aside>
  );
}

export default Sidebar;