import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-content">

        <div className="sidebar-header">
          <h2>HealthCare+</h2>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="sidebar-link" end>
            🏠 Tableau de bord
          </NavLink>

          <NavLink to="/patients" className="sidebar-link">
            👤 Clients
          </NavLink>

          <NavLink to="/medecins" className="sidebar-link">
            👨‍⚕️ Produits
          </NavLink>

          <NavLink to="/rendezvous" className="sidebar-link">
            📅 Commandes
          </NavLink>

          <NavLink to="/dossiers" className="sidebar-link">
            📋 Dossiers Médicaux
          </NavLink>

          <NavLink to="/about" className="sidebar-link">
            📋 À propos
          </NavLink>
        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          🚪 Déconnexion
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
