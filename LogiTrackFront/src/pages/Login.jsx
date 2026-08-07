import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./login.css";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: "",
        password: ""
    });

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
            const response = await api.post("/auth/login", formData);

            const token = response.data.token;

            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);

            console.log(decoded);

            localStorage.setItem("id",decoded.sub)
            localStorage.setItem("nom", decoded.sub);

            localStorage.setItem(
                "role",
                decoded.role[0].authority.replace("ROLE_", "")
            );

            navigate("/dashboard");


        } catch (error) {

            setError(
                "Nom d'utilisateur ou mot de passe incorrect."
            );

            console.error(error);

        }

    };


    return (

        <div className="login-container">

            <form
                className="login-card"
                onSubmit={handleSubmit}
            >

                <h1>LogiTrack</h1>

                <h3>
                    Connexion
                </h3>

                <input
                    type="text"
                    name="nom"
                    placeholder="Nom d'utilisateur"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                />

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <button type="submit">
                    Se connecter
                </button>

                 <p>
                    Vous n'avez pas de compte ?

                    <Link to="/register">
                        S'inscrire
                    </Link>
                </p>

            </form>

        </div>

    );
}

export default Login;