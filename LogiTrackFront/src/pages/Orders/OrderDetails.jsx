import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import './Orders.css';
import Sidebar from "../../components/Sidebar";


function OrderDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    api.get(`/patient/${id}`).then((res) => setPatient(res.data));
  }, [id]);

  if (!patient) return <p>Chargement...</p>;

  return (
    <>
    <Sidebar/>
    <div className="page-container">
      <h1>Détails du Patient</h1>
      <div className="details-card">
        <p><strong>ID:</strong> {patient.id}</p>
        <p><strong>Nom:</strong> {patient.nom}</p>
        <p><strong>Prénom:</strong> {patient.prenom}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Téléphone:</strong> {patient.telephone}</p>
        <p><strong>Date de naissance:</strong> {patient.dateNaissance}</p>
      </div>
      <Link to="/patient" className="btn-primary">Retour</Link>
    </div>
    </>
  );
}

export default OrderDetails;