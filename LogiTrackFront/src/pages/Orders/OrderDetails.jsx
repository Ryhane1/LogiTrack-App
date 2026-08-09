import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import "./Orders.css";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrder();
    }, [id]);

    const loadOrder = async () => {
        try {
            const response = await api.get(`/orders/${id}`);
            setOrder(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du chargement de la commande.");
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        if (!order?.lignesCommande) return 0;
        return order.lignesCommande.reduce(
            (total, ligne) =>
                total + ligne.produit.prix * ligne.quantite,
            0
        );
    };

    if (loading) {
        return (
            <>
                <Sidebar />
                <div className="container">
                    <h1>Chargement...</h1>
                </div>
            </>
        );
    }

    if (!order) {
        return (
            <>
                <Sidebar />
                <div className="container">
                    <h1>Commande introuvable</h1>
                    <Link to="/orders" className="btn-info">
                        Retour aux commandes
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Sidebar />
            <div className="container">
                <div className="header">
                    <h1>Détails de la commande #{order.id}</h1>
                    <Link to="/orders" className="btn-info">
                        Retour
                    </Link>
                </div>
                <div className="order-info">
                    <div>
                        <strong>ID :</strong> {order.id}
                    </div>
                    <div>
                        <strong>Date :</strong>{" "}
                        {new Date(order.dateCommande).toLocaleString("fr-FR")}
                    </div>
                    <div>
                        <strong>Statut :</strong>{" "}
                        <span className={`status ${order.statut?.toLowerCase()}`}>
                            {order.statut}
                        </span>
                    </div>
                </div>
                <h2>Informations client</h2>
                <div className="client-info">
                    <p>
                        <strong>Nom :</strong>{" "}
                        {order.client?.nom}
                    </p>
                    <p>
                        <strong>Email :</strong>{" "}
                        {order.client?.email}
                    </p>
                    <p>
                        <strong>Téléphone :</strong>{" "}
                        {order.client?.telephone}
                    </p>
                    <p>
                        <strong>Ville :</strong>{" "}
                        {order.client?.ville}
                    </p>
                </div>
                <h2>Produits</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Catégorie</th>
                            <th>Prix unitaire</th>
                            <th>Quantité</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.lignesCommande?.length > 0 ? (
                            order.lignesCommande.map((ligne) => (
                                <tr key={ligne.id}>
                                    <td>
                                        {ligne.produit?.nom}
                                    </td>
                                    <td>
                                        {ligne.produit?.categorie}
                                    </td>
                                    <td>
                                        {Number(ligne.produit?.prix || 0).toFixed(2)} DH
                                    </td>
                                    <td>
                                        {ligne.quantite}
                                    </td>
                                    <td>
                                        {(
                                            Number(ligne.produit?.prix || 0) *
                                            ligne.quantite
                                        ).toFixed(2)} DH
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">
                                    Aucun produit dans cette commande.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="order-total">
                    <strong>
                        Total de la commande :{" "}
                        {calculateTotal().toFixed(2)} DH
                    </strong>
                </div>
            </div>
        </>
    );
}

export default OrderDetails;

