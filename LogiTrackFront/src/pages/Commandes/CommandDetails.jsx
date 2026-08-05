import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import './Commands.css';
import Sidebar from "../../components/Sidebar";


function CommandDetails() {
  const { id } = useParams();
  const [medecin, setMedecin] = useState(null);

  useEffect(() => {
    api.get(`/medecin/${id}`).then((res) => setMedecin(res.data));
  }, [id]);

  if (!medecin) return <p>Chargement...</p>;

  return (
    <>
        <Sidebar/>
    <div className="page-container">
      <h1>Détails du Médecin</h1>
      <div className="details-card">
        <p><strong>ID:</strong> {medecin.id}</p>
        <p><strong>Nom:</strong> {medecin.nom}</p>
        <p><strong>Prénom:</strong> {medecin.prenom}</p>
        <p><strong>Email:</strong> {medecin.email}</p>
        <p><strong>Spécialité:</strong> {medecin.specialite}</p>
      </div>
      <Link to="/medecins" className="btn-primary">Retour</Link>
    </div>
    </>
  );
}

export default CommandDetails;