import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Orders.css";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [clients, setClients] = useState([]);
    const [status, setStatus] = useState("");
    const [clientId, setClientId] = useState("");

    useEffect(() => {
        loadClients();
        loadOrders();
    }, []);

    const loadClients = async () => {
        try {
            const res = await api.get("/clients");
            setClients(res.data.content || res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadOrders = async () => {
        try {
            let url = "/orders";

            if (clientId && status) {
                url = `/orders?clientId=${clientId}&status=${status}`;
            } else if (clientId) {
                url = `/orders?clientId=${clientId}`;
            } else if (status) {
                url = `/orders?status=${status}`;
            }

            const res = await api.get(url);
            setOrders(res.data.content || res.data);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du chargement.");
        }
    };

    useEffect(() => {
        loadOrders();
    }, [clientId, status]);

    return (
        <>
            <Sidebar />

            <div className="container">
                <div className="header">
                    <h1>Liste des Commandes</h1>

                    <Link
                        to="/orders/add"
                        className="btn-add"
                    >
                        + Nouvelle commande
                    </Link>
                </div>

                <div className="filters">
                    <select
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                    >
                        <option value="">
                            Tous les clients
                        </option>

                        {clients.map((client) => (
                            <option
                                key={client.id}
                                value={client.id}
                            >
                                {client.nom} {client.prenom}
                            </option>
                        ))}
                    </select>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">
                            Tous les statuts
                        </option>

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

                                <td>{order.dateCommande}</td>

                                <td>
                                    {order.client?.nom} {order.client?.prenom}
                                </td>

                                <td>{order.total} DH</td>

                                <td>{order.statut}</td>

                                <td>
                                    <Link
                                        to={`/orders/${order.id}`}
                                        className="btn-info"
                                    >
                                        Voir
                                    </Link>

                                    {" "}

                                    <Link
                                        to={`/orders/edit/${order.id}`}
                                        className="btn-warning"
                                    >
                                        Modifier
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