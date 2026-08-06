import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Users.css";
import Sidebar from "../../components/Sidebar";
import {toast} from "react-toastify";

function UsersList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {

        try {

            const res = await api.get("/users");

            setUsers(res.data.content);

        } catch (error) {

            console.error(error);

        }

    };


    const handleDelete = async (id) => {

        if (window.confirm("Supprimer ce User ?")) {

            try {

                await api.delete(`/users/${id}`);

                loadData();

                toast.success("User supprimé avec succès.")


            } catch (error) {

                toast.error("Erreur lors de la suppression.");
                console.log(error);

            }

        }

    };


    return (
        <>
        <Sidebar/>

        <div className="container">

            <div className="header">

                <h1>Liste des Users</h1>

                <Link
                    to="/users/add"
                    className="btn-add"
                >
                    + Ajouter
                </Link>

            </div>


            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>


                <tbody>

                    {Array.isArray(rdvs) &&
                    users.length > 0 ? (

                        users.map((r) => (

                            <tr key={r.id}>

                                <td>{r.id}</td>

                                <td>
                                    {r.nom}
                                </td>

                                <td>
                                    {r.prenom}
                                </td>

                                <td>
                                    {r.email}
                                </td>

                                <td>
                                    {r.role}
                                </td>

                                <td>

                                    <Link
                                        to={`/users/${r.id}`}
                                        className="btn-info"
                                    >
                                        Voir
                                    </Link>

                                    {" "}

                                    <Link
                                        to={`/users/edit/${r.id}`}
                                        className="btn-warning"
                                    >
                                        Modifier
                                    </Link>

                                    {" "}

                                    <button
                                        className="btn-danger"
                                        onClick={() =>
                                            handleDelete(r.id)
                                        }
                                    >
                                        Supprimer
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="5">
                                Aucun User trouvé.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

        </>

    );
}

export default UsersList;