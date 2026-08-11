import { Link } from "react-router-dom"
import "./AccessDenied.css"

const AccessDenied = () => {
  return (
    <div className="access-denied">
      <div className="access-denied-card">
        <h1>404</h1>

        <h2>Access Denied</h2>

        <p>
          Désolé, vous n'avez pas accès à cette page ou celle-ci
          n'existe pas.
        </p>

        <Link to="/dashboard" className="home-button">
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

export default AccessDenied
