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

    return (
        <>
        <Sidebar/>

        <div className="container">

            <div className="header">

                <h1>Liste des Users</h1>

                <Link
                    to="/profile"
                    className="btn-add"
                >
                    + Ajouter
                </Link>

            </div>


            <table>

                <thead>
                    <tr className="table-header">
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>


                <tbody>

                    {Array.isArray(users) &&
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