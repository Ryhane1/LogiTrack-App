import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Clients.css";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const role = localStorage.getItem("role");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await api.get("/orders");
            setOrders(response.data.content ? response.data.content : response.data);
        } catch (error) {
            console.error(error);
            toast.error("Erreur chargement des commandes");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/orders/${id}/status`, {
                status: status
            });
            toast.success("Statut modifié");
            loadOrders();
        } catch (error) {
            console.error(error);
            toast.error("Erreur modification statut");
        }
    };

    const filteredOrders = orders.filter((order) => {
        if (statusFilter === "") {
            return true;
        }
        return order.status === statusFilter;
    });

    return (
        <>
            <Navbar />
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div className="orders-container">
                    <div className="orders-header">
                        <h1>Liste des Commandes</h1>

                        {role !== "AGENT" && (
                            <Link to="/orders/new" className="btn-add">
                                + Nouvelle commande
                            </Link>
                        )}

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
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
                            <th>Client</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>

                                    <td>
                                        {order.client?.nom}
                                        {" "}
                                        {order.client?.prenom}
                                    </td>

                                    <td>
                                        {order.dateCommande}
                                    </td>

                                    <td>
                                        {order.total} DH
                                    </td>

                                    <td>
                                        {role !== "AGENT" ? (
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    updateStatus(
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
                                        ) : (
                                            order.status
                                        )}
                                    </td>

                                    <td>
                                        <Link
                                            to={`/orders/${order.id}`}
                                            className="btn-info"
                                        >
                                            Voir
                                        </Link>

                                        {" "}

                                        {role !== "AGENT" && (
                                            <Link
                                                to={`/orders/edit/${order.id}`}
                                                className="btn-warning"
                                            >
                                                Modifier
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">
                                    Aucune commande trouvée
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default OrdersList;