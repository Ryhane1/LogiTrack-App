import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.jsx";
import "./Dashboard.css";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Dashboard() {
    const role = localStorage.getItem("role");

    const [stats, setStats] = useState({
        clients: 0,
        products: 0,
        orders: 0,
        pending: 0,
        shipped: 0,
        delivered: 0
    });

    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [topProduct, setTopProduct] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const [
                clients,
                products,
                orders
            ] = await Promise.all([
                api.get("/clients"),
                api.get("/products"),
                api.get("/orders")
            ]);

            const clientsData = clients.data.content || clients.data;
            const productsData = products.data.content || products.data;
            const ordersData = orders.data.content || orders.data;

            setStats({
                clients: clientsData.length,
                products: productsData.length,
                orders: ordersData.length,
                pending: ordersData.filter(
                    order => order.statut === "EN_ATTENTE"
                ).length,
                shipped: ordersData.filter(
                    order => order.statut === "EXPEDIEE"
                ).length,
                delivered: ordersData.filter(
                    order => order.statut === "LIVREE"
                ).length
            });

            setRecentOrders(
                ordersData.slice(0, 5)
            );

            if (role === "ADMIN" || role === "MANAGER") {
                loadAdvancedStats();
            }

        } catch (error) {
            console.error(error);
        }
    };

    const loadAdvancedStats = async () => {
        try {
            const [
                stock,
                top
            ] = await Promise.all([
                api.get("/products/lowStock"),
                api.get("/statistics/topProduct")
            ]);


            setLowStockProducts(
                stock.data.content || stock.data
            );

            setTopProduct(
                top.data
            );

        } catch (error) {
            console.error(error);
        }
    };
    const cards = [
        {
            title: "Clients",
            number: stats.clients,
            icon: "👥",
            link: "/clients"
        },
        {
            title: "Produits",
            number: stats.products,
            icon: "📦",
            link: "/products"
        },
        {
            title: "Commandes",
            number: stats.orders,
            icon: "🛒",
            link: "/orders"
        },
        {
            title: "En attente",
            number: stats.pending,
            icon: "⏳",
            link: "/orders"
        },
        {
            title: "Expédiées",
            number: stats.shipped,
            icon: "🚚",
            link: "/orders"
        },
        {
            title: "Livrées",
            number: stats.delivered,
            icon: "✅",
            link: "/orders"
        }
    ];

    return (
        <>
            <Navbar />
            <div style={{ display: "flex" }}>
                <Sidebar />

                <div className="dashboard">
                    <h1>Tableau de bord</h1>
                    <p>
                        Bienvenue dans LogiTrack
                    </p>

                    <div className="dashboard-cards">
                        {cards.map((card,index)=>(
                            <Link
                                to={card.link}
                                key={index}
                                className="dashboard-card"
                            >
                                <div className="card-icon">
                                    {card.icon}
                                </div>
                                <h3>
                                    {card.title}
                                </h3>
                                <h1>
                                    {card.number}
                                </h1>
                            </Link>
                        ))}
                    </div>

                    {(role === "ADMIN" || role === "MANAGER") && (
                        <div className="dashboard-section">
                            <h2>
                                Produits avec stock faible
                            </h2>

                            <table>
                                <thead>
                                <tr>
                                    <th>Produit</th>
                                    <th>Stock</th>
                                </tr>
                                </thead>

                                <tbody>
                                {lowStockProducts.length > 0 ? (
                                    lowStockProducts.map(product=>(
                                        <tr key={product.id}>
                                            <td>
                                                {product.nom}
                                            </td>
                                            <td>
                                                {product.quantiteStock}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">
                                            Aucun produit en stock faible
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                            <h2>
                                Produit le plus commandé
                            </h2>

                            {topProduct ? (
                                <h2>
                                    {topProduct.nom}
                                </h2>
                            ) : (
                                <p>
                                    Aucun produit trouvé
                                </p>
                            )}
                        </div>
                    )}

                    <div className="dashboard-section">
                        <h2>
                            Commandes récentes
                        </h2>

                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client</th>
                                <th>Statut</th>
                            </tr>
                            </thead>

                            <tbody>
                            {recentOrders.map(order=>(
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.client?.nom}
                                    </td>
                                    <td>
                                        {order.statut}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Dashboard;