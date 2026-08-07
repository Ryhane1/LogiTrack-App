import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./Orders.css";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

const schema = yup.object({
  clientId: yup.number().required("Client requis"),
  statut: yup.string().required("Statut requis")
});

function OrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    loadClients();
    loadProducts();

    if (id) {
      loadOrder();
    }
  }, [id]);

  const loadClients = async () => {
    try {
      const response = await api.get("/clients");
      setClients(response.data.content || response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.content || response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);

      reset({
        clientId: response.data.client.id,
        statut: response.data.statut
      });

      setOrderProducts(response.data.products || []);

    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = (idProduct) => {
    const product = products.find(
        p => p.id === Number(idProduct)
    );

    if (!product) return;

    const exist = orderProducts.find(
        p => p.id === product.id
    );

    if (exist) {
      setOrderProducts(
          orderProducts.map(p =>
              p.id === product.id
                  ? {
                    ...p,
                    quantity: p.quantity + 1
                  }
                  : p
          )
      );
    } else {
      setOrderProducts([
        ...orderProducts,
        {
          id: product.id,
          nom: product.nom,
          prix: product.prix,
          quantity: 1
        }
      ]);
    }
  };

  const removeProduct = (id) => {
    setOrderProducts(
        orderProducts.filter(
            product => product.id !== id
        )
    );
  };

  const onSubmit = async (data) => {

    const order = {
      clientId: data.clientId,
      statut: data.statut,
      products: orderProducts.map(product => ({
        productId: product.id,
        quantity: product.quantity
      }))
    };

    try {
      if (id) {
        await api.put(`/orders/${id}`, order);
        toast.success("Commande modifiée.");
      } else {
        await api.post("/orders", order);
        toast.success("Commande créée.");
      }

      navigate("/orders");

    } catch (error) {
      console.error(error);
      toast.error("Erreur.");
    }
  };

  return (
      <>
        <Sidebar />

        <div className="page-container">

          <h1>
            {id ? "Modifier" : "Créer"} une commande
          </h1>

          <form
              onSubmit={handleSubmit(onSubmit)}
              className="form"
          >

            <label>Client</label>

            <select {...register("clientId")}>
              <option value="">
                Choisir un client
              </option>

              {clients.map(client => (
                  <option
                      key={client.id}
                      value={client.id}
                  >
                    {client.nom} {client.prenom}
                  </option>
              ))}
            </select>

            {errors.clientId &&
                <span className="error">
                            {errors.clientId.message}
                        </span>
            }

            <label>Statut</label>

            <select {...register("statut")}>
              <option value="EN_ATTENTE">
                EN_ATTENTE
              </option>

              <option value="EXPEDIEE">
                EXPEDIEE
              </option>

              <option value="LIVREE">
                LIVREE
              </option>
            </select>

            <label>Ajouter un produit</label>

            <select
                onChange={(e) =>
                    addProduct(e.target.value)
                }
            >
              <option value="">
                Choisir un produit
              </option>

              {products.map(product => (
                  <option
                      key={product.id}
                      value={product.id}
                  >
                    {product.nom}
                  </option>
              ))}
            </select>

            <table>
              <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Action</th>
              </tr>
              </thead>

              <tbody>
              {orderProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.nom}</td>
                    <td>{product.prix} DH</td>
                    <td>{product.quantity}</td>
                    <td>
                      <button
                          type="button"
                          className="btn-danger"
                          onClick={() =>
                              removeProduct(product.id)
                          }
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>

            <button
                type="submit"
                className="btn-primary"
            >
              Enregistrer
            </button>

          </form>

        </div>
      </>
  );
}

export default OrderForm;