import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Commands.css";
import Sidebar from "../../components/Sidebar";
import {toast} from "react-toastify";


function CommandsList() {

    const [medecins, setMedecins] = useState([]);
    const [selectedSpecialite, setSelectedSpecialite] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const res = await api.get("/medecin");

            console.log("DATA :", res.data);

            setMedecins(res.data.content);

        } catch (error) {

            console.error("Erreur :", error);

        }

    };

    const specialites = [...new Set(
        medecins.map((m) => m.specialite)
    )];

    const filteredMedecins = medecins.filter((m) => {
        if (selectedSpecialite === "") return true;
        return m.specialite === selectedSpecialite;
    });


    const handleDelete = async (id) => {

        const confirmation = window.confirm(
            "Supprimer ce médecin ?"
        );

        if (!confirmation) return;

        try {
            await api.delete(`/medecin/${id}`);
            loadData();
            toast.success("Medecin supprimé avec succès.")
        } catch (error) {
            toast.error("Erreur lors de la suppression.");
            console.error(error);
        }
    };


    return (
        <>
        <Sidebar/>
        <div className="medecins-container">

            <div className="medecins-header">

                <h1>Liste des Médecins</h1>

                <select
                    value={selectedSpecialite}
                    onChange={(e) => setSelectedSpecialite(e.target.value)}
                    className="filter-select"
                >
                    <option value="">
                        Toutes les spécialités
                    </option>

                    {specialites.map((specialite, index) => (
                        <option key={index} value={specialite}>
                            {specialite}
                        </option>
                    ))}
                </select>

                <Link to="/medecins/add" className="btn-add">
                    + Ajouter
                </Link>

            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Spécialité</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(filteredMedecins) && filteredMedecins.length > 0 ? (
                        filteredMedecins.map((m) => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td>{m.nom}</td>
                                <td>{m.specialite}</td>
                                <td>{m.email}</td>
                                <td>{m.telephone}</td>
                                <td>
                                    <Link
                                        to={`/medecins/${m.id}`}
                                        className="btn-info"
                                    >
                                        Voir
                                    </Link>
                                    {" "}
                                    <Link
                                        to={`/medecins/edit/${m.id}`}
                                        className="btn-warning"
                                    >
                                        Modifier
                                    </Link>
                                    {" "}
                                    <button
                                        className="btn-danger"
                                        onClick={() =>
                                            handleDelete(m.id)
                                        }
                                    >
                                        Supprimer
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="6">

                                Aucun médecin trouvé.

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
        </>

    );

}

export default CommandsList;