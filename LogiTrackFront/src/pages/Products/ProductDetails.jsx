import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import "./Products.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger le produit.");
    }
  };

  if (!product) {
    return <p>Chargement...</p>;
  }

  return (
      <div className="page-container">
        <h1>Détails du produit</h1>

        <div className="details-card">
          <p><strong>ID :</strong> {product.id}</p>
          <p><strong>Nom :</strong> {product.nom}</p>
          <p><strong>Catégorie :</strong> {product.categorie}</p>
          <p><strong>Prix :</strong> {product.prix} DH</p>
          <p><strong>Stock :</strong> {product.quantiteStock}</p>

          <p>
            <strong>État du stock :</strong>{" "}
            {product.quantiteStock <= 10 ? (
                <span style={{ color: "red", fontWeight: "bold" }}>
              Stock faible
            </span>
            ) : (
                <span style={{ color: "green", fontWeight: "bold" }}>
              Disponible
            </span>
            )}
          </p>
        </div>

        <Link to="/products" className="btn-primary">
          Retour à la liste
        </Link>
      </div>
  );
}

export default ProductDetails;