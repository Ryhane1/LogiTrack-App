import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Clients.css";
import Sidebar from "../../components/Sidebar";
import {toast} from "react-toastify";

function ClientsList() {

    const [dossiers, setDossiers] = useState([]);


    const loadData = async () => {

        try {

            const res = await api.get("/dossierMedical");

            setDossiers(res.data.content);

        } catch (error) {

            console.error(error);

        }

    };


    useEffect(() => {

        loadData();

    }, []);


    const handleDelete = async (id) => {

        if (window.confirm("Supprimer ce dossier ?")) {

            try {

                await api.delete(
                    `/dossierMedical/${id}`
                );

                loadData();

                toast.success("Dossier supprimé avec succès.")


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

                <h1>
                    Liste des Dossiers Médicaux
                </h1>

                <Link
                    to="/dossiers/add"
                    className="btn-add"
                >
                    + Ajouter
                </Link>

            </div>


            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Diagnostic</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>

                </thead>


                <tbody>

                    {Array.isArray(dossiers) &&
                    dossiers.length > 0 ? (

                        dossiers.map((d) => (

                            <tr key={d.id}>

                                <td>{d.id}</td>

                                <td>{d.patientId}</td>

                                <td>{d.diagnostic}</td>

                                <td>{d.dateCreation}</td>

                                <td>

                                    <Link
                                        to={`/dossiers/${d.id}`}
                                        className="btn-info"
                                    >
                                        Voir
                                    </Link>

                                    {" "}

                                    <Link
                                        to={`/dossiers/edit/${d.id}`}
                                        className="btn-warning"
                                    >
                                        Modifier
                                    </Link>

                                    {" "}

                                    <button
                                        className="btn-danger"
                                        onClick={() =>
                                            handleDelete(d.id)
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

                                Aucun dossier trouvé.

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