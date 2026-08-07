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
              <strong>Prénom :</strong> {client.prenom}
            </p>

            <p>
              <strong>Email :</strong> {client.email}
            </p>

            <p>
              <strong>Téléphone :</strong> {client.telephone}
            </p>

            <p>
              <strong>Adresse :</strong> {client.adresse}
            </p>

            <h3>Commandes du client</h3>

            {client.orders && client.orders.length > 0 ? (
                <table>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                  </thead>

                  <tbody>
                  {client.orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.dateCommande}</td>
                        <td>{order.statut}</td>
                        <td>{order.total} DH</td>
                        <td>
                          <Link
                              to={`/orders/${order.id}`}
                              className="btn-info"
                          >
                            Voir
                          </Link>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            ) : (
                <p>
                  Aucune commande trouvée.
                </p>
            )}

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