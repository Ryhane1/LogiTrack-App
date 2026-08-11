import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./Orders.css";
import { toast } from "react-toastify";

const schema = yup.object({
    clientId: yup.number().typeError("Client requis").required("Client requis"),
    statut: yup.string().required("Statut requis")
});

function OrderForm() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            clientId: "",
            statut: "EN_ATTENTE"
        }
    });
    useEffect(() => {
        loadClients();
        loadProducts();
    }, []);
    const loadClients = async () => {
        try {
            const response = await api.get("/clients");
            setClients(response.data.content || response.data);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du chargement des clients.");
        }
    };
    const loadProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data.content || response.data);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du chargement des produits.");
        }
    };
    const addProduct = (productId) => {
        if (!productId) return;
        const product = products.find((p) => p.id === Number(productId));
        if (!product) return;
        const existingProduct = orderProducts.find((p) => p.produitId === product.id);
        if (existingProduct) {
            setOrderProducts(orderProducts.map((p) =>
                p.produitId === product.id
                    ? { ...p, quantite: p.quantite + 1 }
                    : p
            ));
        } else {
            setOrderProducts([
                ...orderProducts,
                {
                    produitId: product.id,
                    nom: product.nom,
                    prix: product.prix,
                    quantite: 1
                }
            ]);
        }
    };
    const increaseQuantity = (productId) => {
        setOrderProducts(orderProducts.map((product) =>
            product.produitId === productId
                ? { ...product, quantite: product.quantite + 1 }
                : product
        ));
    };
    const decreaseQuantity = (productId) => {
        setOrderProducts(
            orderProducts
                .map((product) =>
                    product.produitId === productId
                        ? { ...product, quantite: product.quantite - 1 }
                        : product
                )
                .filter((product) => product.quantite > 0)
        );
    };
    const removeProduct = (productId) => {
        setOrderProducts(
            orderProducts.filter((product) => product.produitId !== productId)
        );
    };
    const calculateTotal = () => {
        return orderProducts.reduce(
            (total, product) => total + product.prix * product.quantite,
            0
        );
    };
    const onSubmit = async (data) => {
        if (orderProducts.length === 0) {
            toast.error("Veuillez ajouter au moins un produit.");
            return;
        }
        try {
            const orderResponse = await api.post("/orders", {
                clientId: Number(data.clientId)
            });
            const orderId = orderResponse.data.id;
            for (const product of orderProducts) {
                await api.post(`/orders/${orderId}/products`, {
            produitId: product.produitId,
                quantite: product.quantite
            });
            }
            if (data.statut !== "EN_ATTENTE") {
              await api.put(`/orders/${orderId}/status`, {
                statut: data.statut
              });
            }
            toast.success("Commande créée avec succès.");
            navigate("/orders");
            } catch (error) {
              console.error("Erreur création commande :", error.response?.data || error);
              toast.error(
                  error.response?.data?.message ||
                  "Erreur lors de la création de la commande."
              );
        }
    };
    return (
    <div className="page-container">
      <h1>Nouvelle commande</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label>Client</label>
        <select {...register("clientId")}>
          <option value="">Choisir un client</option>
          {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nom} {client.prenom}
              </option>
          ))}
        </select>
        {errors.clientId && (
            <span className="error">{errors.clientId.message}</span>
        )}
        <label>Statut</label>
        <select {...register("statut")}>
          <option value="EN_ATTENTE">EN_ATTENTE</option>
          <option value="EXPEDIEE">EXPEDIEE</option>
          <option value="LIVREE">LIVREE</option>
        </select>
        {errors.statut && (
            <span className="error">{errors.statut.message}</span>
        )}
        <label>Ajouter un produit</label>
        <select value="" onChange={(e) => addProduct(e.target.value)}>
          <option value="">Choisir un produit</option>
          {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nom} - {product.prix} DH
              </option>
          ))}
        </select>
        <table>
          <thead>
          <tr>
            <th>Produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {orderProducts.length > 0 ? (
              orderProducts.map((product) => (
                  <tr key={product.produitId}>
                    <td>{product.nom}</td>
                    <td>{product.prix} DH</td>
                    <td>
                      <button type="button" onClick={() => decreaseQuantity(product.produitId)}>
                        -
                      </button>
                      {" "}{product.quantite}{" "}
                      <button type="button" onClick={() => increaseQuantity(product.produitId)}>
                        +
                      </button>
                    </td>
                    <td>
                      {(product.prix * product.quantite).toFixed(2)} DH
                    </td>
                    <td>
                      <button
                          type="button"
                          className="btn-danger"
                          onClick={() => removeProduct(product.produitId)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="5">Aucun produit ajouté.</td>
              </tr>
          )}
          </tbody>
        </table>
        <div className="order-total">
          <strong>Total : {calculateTotal().toFixed(2)} DH</strong>
        </div>
        <button type="submit" className="btn-primary">
          Ajouter la commande
        </button>
      </form>
    </div>
);
}
export default OrderForm;