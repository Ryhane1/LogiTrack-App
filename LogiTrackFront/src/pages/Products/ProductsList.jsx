import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Products.css";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination.jsx";

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [lowStock, setLowStock] = useState(false);
    const role = localStorage.getItem("role");
    const[page,setPage]=useState(1);
    const[totalPages,setTotalPages]=useState(0);


    useEffect(() => {
        loadProducts();
    }, [page]);

    const loadProducts = async () => {
        try {
            const response = await api.get(
                `/products?page=${page - 1}&size=10`
            );

            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            console.error(error);
            toast.error("Erreur chargement des produits");
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const categories = [
        ...new Set(products.map(product => product.categorie))
    ];

    const filteredProducts = products.filter(product => {
        if (
            categoryFilter &&
            product.categorie !== categoryFilter
        ) {
            return false;
        }

        if (
            maxPrice &&
            product.prix > Number(maxPrice)
        ) {
            return false;
        }

        if (
            lowStock &&
            product.quantiteStock > 10
        ) {
            return false;
        }

        return true;
    });















    const handleDelete = async (id) => {
        if (role === "AGENT") {
            toast.error("Vous n'avez pas le droit de supprimer");
            return;
        }

        const confirmDelete = window.confirm("Voulez-vous supprimer ce produit ?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/products/${id}`);
            toast.success("Produit supprimé");
            loadProducts();
        } catch (error) {
            console.error(error);
            toast.error("Erreur suppression produit");
        }
        console.log(filteredProducts)
    };

    return (

    <>
        <Navbar />
        <div style={{ display: "flex" }}>
            <Sidebar />

        <div className="products-container">
            <div className="products-header">
                <h1>Produits</h1>

                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Toutes les catégories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Prix maximum"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="filter-input"
                />

                <label>
                    <input
                        type="checkbox"
                        checked={lowStock}
                        onChange={(e) => setLowStock(e.target.checked)}
                    />
                    Stock faible
                </label>

                {role !== "AGENT" && (
                    <Link to="/products/new" className="btn-add">
                        + Ajouter
                    </Link>
                )}
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nom}</td>
                            <td>{product.categorie}</td>
                            <td>{product.prix} DH</td>
                            <td>
                                {product.quantiteStock <= 10 ? (
                                    <span className="stock-danger">{product.quantiteStock}</span>
                                ) : (
                                    product.quantiteStock
                                )}
                            </td>
                            <td>
                                <Link to={`/products/${product.id}`} className="btn-info">
                                    Voir
                                </Link>{" "}

                                {role !== "AGENT" && (
                                    <>
                                        <Link
                                            to={`/products/edit/${product.id}`}
                                            className="btn-warning"
                                        >
                                            Modifier
                                        </Link>{" "}
                                    </>
                                )}

                                {role === "ADMIN" && (
                                    <button
                                        className="btn-danger"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Supprimer
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">Aucun produit trouvé</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
        </div>

    </>
    );
}

export default ProductsList;