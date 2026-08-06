import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import "./Clients.css";
import Navbar from "../../components/Navbar";
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

  if (!order) {
    return <p>Chargement...</p>;
  }

  return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div className="page-container">
            <h1>Détails de la Commande</h1>

            <div className="details-card">
              <p>
                <strong>ID :</strong> {order.id}
              </p>

              <p>
                <strong>Date :</strong> {order.dateCommande}
              </p>

              <p>
                <strong>Statut :</strong> {order.status}
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
                          <td>
                            {product.name}
                          </td>
                          <td>
                            {product.price} DH
                          </td>
                          <td>
                            {product.quantity}
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
              ) : (
                  <p>
                    Aucun produit dans cette commande
                  </p>
              )}
            </div>

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