import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Orders.css";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [clients, setClients] = useState([]);
    const [statutFilter, setStatutFilter] = useState("");
    const [clientId, setClientId] = useState("");

    useEffect(() => {
        loadClients();
    }, []);

    useEffect(() => {
        loadOrders();
    }, [clientId, statutFilter]);

    const loadClients = async () => {
        try {
            const res = await api.get("/clients");
            setClients(res.data.content || res.data);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du chargement des clients.");
        }
    };

    const loadOrders = async () => {
        try {
            let url = "/orders";
            const params = new URLSearchParams();
            if (clientId) {
                params.append("clientId", clientId);
            }
            if (statutFilter) {
                params.append("statut", statutFilter);
            }
            if (params.toString()) {
                url += `?${params.toString()}`;
            }
            const res = await api.get(url);
            setOrders(res.data.content || res.data);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du chargement des commandes.");
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, {
statut: newStatus
});
setOrders((currentOrders) =>
    currentOrders.map((order) =>
        order.id === orderId
            ? { ...order, statut: newStatus }
            : order
    )
);
toast.success("Statut modifié avec succès.");
} catch (error) {
    console.error(
        "Erreur modification statut :",
        error.response?.data || error
    );
    toast.error(
        error.response?.data?.message ||
        "Erreur lors de la modification du statut."
    );
}
};

return (
    <>
        <Sidebar />
        <div className="container">
            <div className="header">
                <h1>Liste des Commandes</h1>
                <Link to="/orders/new" className="btn-add">
                    + Nouvelle commande
                </Link>
            </div>
            <div className="filters">
                <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                >
                    <option value="">Tous les clients</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.nom} {client.prenom}
                        </option>
                    ))}
                </select>
                <select
                    value={statutFilter}
                    onChange={(e) => setStatutFilter(e.target.value)}
                >
                    <option value="">Tous les statuts</option>
                    <option value="EN_ATTENTE">EN_ATTENTE</option>
                    <option value="EXPEDIEE">EXPEDIEE</option>
                    <option value="LIVREE">LIVREE</option>
                </select>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Total</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>
                                {new Date(order.dateCommande).toLocaleString("fr-FR")}
                            </td>
                            <td>
                                {order.client?.nom} {order.client?.prenom}
                            </td>
                            <td>
                                {order.lignesCommande?.reduce(
                                    (total, ligne) =>
                                        total +
                                        Number(ligne.produit?.prix || 0) *
                                        Number(ligne.quantite || 0),
                                    0
                                ).toFixed(2)}{" "}
                                DH
                            </td>
                            <td>
                                <select
                                    value={order.statut}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            order.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="EN_ATTENTE">
                                        EN_ATTENTE
                                    </option>
                                    <option value="EXPEDIEE">
                                        EXPEDIEE
                                    </option>
                                    <option value="LIVREE">
                                        LIVREE
                                    </option>
                                </select>
                            </td>
                            <td>
                                <Link
                                    to={`/orders/${order.id}`}
                                    className="btn-info"
                                >
                                    Voir
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">
                            Aucune commande trouvée.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </>
);
}

export default OrdersList;