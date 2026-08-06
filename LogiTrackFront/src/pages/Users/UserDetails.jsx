import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import './Users.css';
import Sidebar from "../../components/Sidebar";


function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/Users/${id}`).then((res) => setUser(res.data));
  }, [id]);

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
      <Link to="/users" className="btn-primary">Retour</Link>
    </div>
    </>
  );
}

export default UserDetails;