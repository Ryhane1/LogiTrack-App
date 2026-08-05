import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import './Users.css';
import Sidebar from "../../components/Sidebar";


function UserDetails() {
  const { id } = useParams();
  const [rdv, setRdv] = useState(null);

  useEffect(() => {
    api.get(`/rendezVous/${id}`).then((res) => setRdv(res.data));
  }, [id]);

  if (!rdv) return <p>Chargement...</p>;

  return (
    <>
    <Sidebar/>
    <div className="page-container">
      <h1>Détails du Rendez-vous</h1>
      <div className="details-card">
        <p><strong>ID:</strong> {rdv.id}</p>
        <p><strong>Date:</strong> {rdv.date}</p>
        <p><strong>Patient:</strong> {rdv.patientId}</p>
        <p><strong>Médecin:</strong> {rdv.medecinId}</p>
        <p><strong>Motif:</strong> {rdv.motif}</p>
      </div>
      <Link to="/rendezvous" className="btn-primary">Retour</Link>
    </div>
    </>
  );
}

export default UserDetails;