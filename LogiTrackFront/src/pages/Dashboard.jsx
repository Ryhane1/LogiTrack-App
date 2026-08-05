import { Link } from 'react-router-dom';
import './Dashboard.css';
import {useEffect, useState} from "react";
import api from "../api/axios.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Dashboard() {


    const [stats, setStats] = useState({
        patients: 0,
        medecins: 0,
        rendezVous: 0,
        dossiers: 0,
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {

        try {

            const [
                patients,
                medecins,
                rdvs,
                dossiers
            ] = await Promise.all([
                api.get("/clients"),
                api.get("/commandes"),
                api.get("/produits"),
                api.get("/users")
            ]);

            setStats({
                patients: patients.data.numberOfElements,
                medecins: medecins.data.content.length,
                rendezVous: rdvs.data.content.length,
                dossiers: dossiers.data.content.length,
            });

        } catch (error) {

            console.error(error);

        }

    };

    const cards = [

        {
            title: "Patients",
            number: stats.patients,
            desc: "Gérer les patients",
            link: "/patients",
            icon: "👤",
        },

        {
            title: "Médecins",
            number: stats.medecins,
            desc: "Gérer les médecins",
            link: "/medecins",
            icon: "👨‍⚕️",
        },

        {
            title: "Rendez-vous",
            number: stats.rendezVous,
            desc: "Gérer les rendez-vous",
            link: "/rendezvous",
            icon: "📅",
        },

        {
            title: "Dossiers",
            number: stats.dossiers,
            desc: "Gérer les dossiers médicaux",
            link: "/dossiers",
            icon: "📋",
        },

    ];



    return (
        <>
        <Sidebar/>
        <div className="dashboard">
            <h1>Tableau de bord</h1>
            <p>Bienvenue dans HealthCare+</p>
            <div className="dashboard-cards">
                {cards.map((card, index) => (
                    <Link to={card.link} key={index} className="dashboard-card">
                        <div className="card-icon">{card.icon}</div>
                        <h3>{card.title}</h3>
                        <h1>{card.number >=0 ?  card.number : ""}</h1>
                        <p>{card.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
        </>
    );
}

export default Dashboard;