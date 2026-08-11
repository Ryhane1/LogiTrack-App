import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Clients.css";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

function ClientsList() {
    const [clients, setClients] = useState([]);
    const role = localStorage.getItem("role");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await api.get("/clients");
            setClients(res.data.content);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du chargement.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer ce client ?")) return;

        try {
            await api.delete(`/clients/${id}`);
            toast.success("Client supprimé avec succès.");
            loadData();
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la suppression.");
        }
    };

    return (
        <>
            <Sidebar />

            <div className="container">
                <div className="header">
                    <h1>Liste des Clients</h1>

                    {role !== "AGENT" && (
                        <Link to="/clients/add" className="btn-add" >
                            + Ajouter Client
                        </Link>
                    )}
                </div>

                <table>
                    <thead>
                    <tr className="table-header">
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Ville</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {Array.isArray(clients) && clients.length > 0 ? (
                        clients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.nom}</td>
                                <td>{client.email}</td>
                                <td>{client.telephone}</td>
                                <td>{client.ville}</td>

                                <td>
                                    <Link
                                        to={`/clients/${client.id}`}
                                        className="btn-info"
                                    >
                                        Voir
                                    </Link>

                                    {" "}

                                    <Link
                                        to={`/clients/edit/${client.id}`}
                                        className="btn-warning"
                                    >
                                        Modifier
                                    </Link>

                                    {" "}

                                    {role === "ADMIN" && (
                                        <button
                                            className="btn-danger"
                                            onClick={() => handleDelete(client.id)}
                                        >
                                            Supprimer
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">
                                Aucun client trouvé.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ClientsList;