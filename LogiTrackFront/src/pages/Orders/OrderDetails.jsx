import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import "./Orders.css";
import Sidebar from "../../components/Sidebar";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!order) return <h2>Chargement...</h2>;

  return (
      <>
        <Sidebar />
        <div className="container">
          <div className="details-card">
            <h2>Détails de la commande</h2>

            <p>
              <strong>ID :</strong> {order.id}
            </p>

            <p>
              <strong>Date :</strong> {order.dateCommande}
            </p>

            <p>
              <strong>Statut :</strong> {order.statut}
            </p>

            <p>
              <strong>Total :</strong> {order.total} DH
            </p>

            <h3>Client</h3>

            <p>
              <strong>Nom :</strong> {order.client?.nom}
            </p>

            <p>
              <strong>Prénom :</strong> {order.client?.prenom}
            </p>

            <p>
              <strong>Email :</strong> {order.client?.email}
            </p>

            <h3>Produits</h3>

            {order.products && order.products.length > 0 ? (
                <table>
                  <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                  </tr>
                  </thead>

                  <tbody>
                  {order.products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.nom}</td>
                        <td>{product.prix} DH</td>
                        <td>{product.quantity}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            ) : (
                <p>Aucun produit trouvé.</p>
            )}

            <Link
                to="/orders"
                className="btn-primary"
            >
              Retour
            </Link>
          </div>
        </div>
      </>
  );
}

export default OrderDetails;