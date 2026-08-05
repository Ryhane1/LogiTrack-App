import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import './Clients.css';
import Sidebar from '../../components/Sidebar';

function ClientDetails() {
  const { id } = useParams();
  const [dossier, setDossier] = useState(null);

  useEffect(() => {
    api.get(`/dossierMedical/${id}`).then((res) => setDossier(res.data));
  }, [id]);

  if (!dossier) return <p>Chargement...</p>;

  return (
    <>
    <Sidebar/>
    <div className="page-container">
      <h1>Détails du Dossier</h1>
      <div className="details-card">
        <p><strong>ID:</strong> {dossier.id}</p>
        <p><strong>Patient:</strong> {dossier.patientId}</p>
        <p><strong>Diagnostic:</strong> {dossier.diagnostic}</p>
        <p><strong>Traitement:</strong> {dossier.traitement}</p>
        <p><strong>Date:</strong> {dossier.dateCreation}</p>
      </div>
      <Link to="/dossiers" className="btn-primary">Retour</Link>
    </div>
    </>
  );
}

export default ClientDetails;