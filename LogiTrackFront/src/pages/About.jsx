// import "./About.css";
import Sidebar from "../components/Sidebar";

function About() {

    return (
        <>
        <Sidebar/>

        <div className="about-container">

            <h1>À propos de HealthCare+</h1>

            <p className="about-description">

                HealthCare+ est une application web de gestion médicale
                permettant aux cliniques et aux établissements de santé
                de gérer efficacement les patients, les médecins, les
                dossiers médicaux et les rendez-vous.

            </p>


            <div className="about-cards">

                <div className="about-card">

                    <h2>Patients</h2>

                    <p>
                        Gestion complète des informations des patients,
                        consultation et mise à jour de leurs données.
                    </p>

                </div>


                <div className="about-card">

                    <h2>Médecins</h2>

                    <p>
                        Administration des profils des médecins,
                        leurs spécialités et leurs coordonnées.
                    </p>

                </div>


                <div className="about-card">

                    <h2>Dossiers Médicaux</h2>

                    <p>
                        Conservation des diagnostics, observations
                        médicales et historique des consultations.
                    </p>

                </div>


                <div className="about-card">

                    <h2>Rendez-vous</h2>

                    <p>
                        Planification et suivi des rendez-vous entre
                        patients et médecins.
                    </p>

                </div>

            </div>


            <div className="technologies">

                <h2>Technologies utilisées</h2>

                <ul>

                    <li>React JS</li>
                    <li>Spring Boot</li>
                    <li>Spring Security</li>
                    <li>MySQL</li>
                    <li>Axios</li>
                    <li>React Router</li>

                </ul>

            </div>



            <div className="objectifs">

                <h2>Objectifs du projet</h2>

                <p>

                    Notre objectif est de proposer une plateforme
                    moderne, sécurisée et intuitive permettant
                    d'améliorer la gestion des données médicales
                    tout en facilitant la communication entre les
                    différents acteurs du système de santé.

                </p>

            </div>



            <div className="footer-about">

                <p>

                    HealthCare+ © 2026

                </p>
            </div>


        </div>

        </>

    );

}

export default About;