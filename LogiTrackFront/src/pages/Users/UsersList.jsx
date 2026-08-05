import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Users.css";
import Sidebar from "../../components/Sidebar";
import {toast} from "react-toastify";

function UsersList() {

    const [rdvs, setRdvs] = useState([]);

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {

        try {

            const res = await api.get("/rendezVous");

            setRdvs(res.data.content);

        } catch (error) {

            console.error(error);

        }

    };


    const handleDelete = async (id) => {

        if (window.confirm("Supprimer ce rendez-vous ?")) {

            try {

                await api.delete(`/rendezVous/${id}`);

                loadData();

                toast.success("Rendez-Vous supprimé avec succès.")


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

                <h1>Liste des Rendez-vous</h1>

                <Link
                    to="/rendezvous/add"
                    className="btn-add"
                >
                    + Ajouter
                </Link>

            </div>


            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Patient</th>
                        <th>Médecin</th>
                        <th>Actions</th>
                    </tr>
                </thead>


                <tbody>

                    {Array.isArray(rdvs) &&
                    rdvs.length > 0 ? (

                        rdvs.map((r) => (

                            <tr key={r.id}>

                                <td>{r.id}</td>

                                <td>
                                    {r.dateRendezVous}
                                </td>

                                <td>
                                    {r.patientId}
                                </td>

                                <td>
                                    {r.medecinId}
                                </td>

                                <td>

                                    <Link
                                        to={`/rendezvous/${r.id}`}
                                        className="btn-info"
                                    >
                                        Voir
                                    </Link>

                                    {" "}

                                    <Link
                                        to={`/rendezvous/edit/${r.id}`}
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
                                Aucun rendez-vous trouvé.
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