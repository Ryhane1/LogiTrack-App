import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import "./Clients.css";
import Sidebar from "../../components/Sidebar";

function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    loadClient();
  }, [id]);

  const loadClient = async () => {
    try {
      const response = await api.get(`/clients/${id}`);
      setClient(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!client) return <h2>Chargement...</h2>;

  return (
      <>
        <Sidebar />
        <div className="container">
          <div className="details-card">
            <h2>Détails du Client</h2>

            <p>
              <strong>ID :</strong> {client.id}
            </p>

            <p>
              <strong>Nom :</strong> {client.nom}
            </p>

            <p>
              <strong>Email :</strong> {client.email}
            </p>

            <p>
              <strong>Téléphone :</strong> {client.telephone}
            </p>

            <p>
              <strong>Ville :</strong> {client.ville}
            </p>

            <Link
                to="/clients"
                className="btn-primary"
            >
              Retour
            </Link>
          </div>
        </div>
      </>
  );
}

export default ClientDetails;