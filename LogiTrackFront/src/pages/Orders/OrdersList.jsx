import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

import "./Orders.css";
import Sidebar from "../../components/Sidebar.jsx";
import {toast} from "react-toastify";

function OrdersList() {

    const [patients, setPatients] = useState([]);
    const [searchTerm , setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");


    const loadPatients = async () => {

        try {
            const response = await api.get("/patient");

            setPatients(response.data.content);
        }
        catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        loadPatients();

    }, []);


    const filteredPatients = patients.filter((patient) =>
        patient.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedPatients = [...filteredPatients].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.nom.localeCompare(b.nom);
        } else {
            return b.nom.localeCompare(a.nom);
        }
    });


    const handleDelete = async (id) => {

        const confirmation = window.confirm(
            "Supprimer ce patient ?"
        );

        if (!confirmation) return;


        try {

            await api.delete(`/patient/${id}`);

            loadPatients();

            toast.success("Patient supprimé avec succès.")

        } catch (error) {

            toast.error("Erreur lors de la suppression.");
            console.log(error);

        }

    };


    return (

        <>
        <Sidebar/>

        <div className="patients-container">


            <div className="patients-header">

                <h1>
                    Liste des Patients
                </h1>

                <input className="recherchInput"
                    type="text"
                    placeholder="Chercher par Nom"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">A → Z</option>
                    <option value="desc">Z → A</option>
                </select>

                <Link
                    to="/patients/add"
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
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Actions</th>

                </tr>

                </thead>


                <tbody>

                {Array.isArray(patients) &&
                sortedPatients.length > 0 ? (

                    sortedPatients.map((patient) => (

                        <tr key={patient.id}>

                            <td>{patient.id}</td>

                            <td>{patient.nom}</td>

                            <td>{patient.prenom}</td>

                            <td>{patient.email}</td>


                            <td>

                                <Link
                                    to={`/patients/${patient.id}`}
                                    className="btn-info"
                                >
                                    Voir
                                </Link>

                                {" "}

                                <Link
                                    to={`/patients/edit/${patient.id}`}
                                    className="btn-warning"
                                >
                                    Modifier
                                </Link>

                                {" "}

                                <button
                                    className="btn-danger"
                                    onClick={() =>
                                        handleDelete(patient.id)
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
                            Aucun patient trouvé.
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