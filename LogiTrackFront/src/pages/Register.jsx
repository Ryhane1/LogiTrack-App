import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom : "",
        prenom: "",
        email: "",
        password: "",
        role: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/auth/register",
                formData
            );

            setMessage(
                "Compte créé avec succès !"
            );

            setTimeout(() => {

                navigate("/");

            }, 2000);

        } catch (error) {

            setError(
                "Erreur lors de la création du compte."
            );

            console.error(error);

        }

    };

    return (

        <div className="register-container">

            <form
                className="register-card"
                onSubmit={handleSubmit}
            >

                <h1>LogiTrack</h1>

                <h2>Créer un compte</h2>


                <input
                    type="text"
                    name="nom"
                    placeholder="Nom d'utilisateur"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="prenom"
                    placeholder="Prenom d'utilisateur"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                />


                <select
                    name="role"
                    onChange={handleChange}
                >
                    <option value="ADMIN">
                        Admin
                    </option>
                    
                    <option value="PATIENT">
                        Patient
                    </option>

                    <option value="MEDECIN">
                        Médecin
                    </option>
                </select>


                {message && (
                    <p className="success">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}


                <button type="submit">

                    S'inscrire

                </button>

            </form>

        </div>

    );
}

export default Register;