import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import './Users.css';
import Sidebar from "../../components/Sidebar";


function UserDetails() {
  const { idx } = useParams();
  const [user, setUser] = useState(null);

  const nom = localStorage.getItem("nom");

  useEffect(() => {
    api.get(`/users/me?nom=${nom}`).then((res) => setUser(res.data));
  }, [nom]);

  if (!user) return <p>Chargement...</p>;

  return (
    <>
    <Sidebar/>
    <div className="page-container">
      <h1>Détails du User : </h1>
      <div className="details-card">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nom:</strong> {user.nom}</p>
        <p><strong>Prenom:</strong> {user.prenom}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <Link to="/dashboard" className="btn-primary">Retour</Link>
      <Link to={`/users/edit/${user.id}`} className="btn-primary">Modifier</Link>
    </div>
    </>
  );
}

export default UserDetails;