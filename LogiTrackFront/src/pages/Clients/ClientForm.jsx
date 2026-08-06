import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./Clients.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const schema = yup.object({
  clientId: yup.number().required("Client requis"),
  status: yup.string().required("Statut requis")
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
        status: response.data.status
      });
      setOrderProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = (productId) => {
    const product = products.find(
        (p) => p.id === Number(productId)
    );

    if (!product) return;

    const exist = orderProducts.find(
        (p) => p.id === product.id
    );

    if (exist) {
      setOrderProducts(
          orderProducts.map((p) =>
              p.id === product.id
                  ? { ...p, quantity: p.quantity + 1 }
                  : p
          )
      );
    } else {
      setOrderProducts([
        ...orderProducts,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ]);
    }
  };

  const removeProduct = (id) => {
    setOrderProducts(
        orderProducts.filter(
            (product) => product.id !== id
        )
    );
  };

  const changeQuantity = (id, quantity) => {
    setOrderProducts(
        orderProducts.map((product) =>
            product.id === id
                ? {
                  ...product,
                  quantity: Number(quantity)
                }
                : product
        )
    );
  };

  const onSubmit = async (data) => {
    const order = {
      clientId: data.clientId,
      status: data.status,
      products: orderProducts.map((product) => ({
        productId: product.id,
        quantity: product.quantity
      }))
    };

    try {
      if (id) {
        await api.put(`/orders/${id}`, order);
      } else {
        await api.post("/orders", order);
      }

      navigate("/orders");
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div className="page-container">
            <h1>
              {id ? "Modifier" : "Créer"} une Commande
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form"
            >
              <div className="form-group">
                <label>Client</label>
                <select {...register("clientId")}>
                  <option value="">
                    Choisir un client
                  </option>

                  {clients.map((client) => (
                      <option
                          key={client.id}
                          value={client.id}
                      >
                        {client.nom} {client.prenom}
                      </option>
                  ))}
                </select>

                {errors.clientId && (
                    <span className="error">
                  {errors.clientId.message}
                </span>
                )}
              </div>

              <div className="form-group">
                <label>Statut</label>

                <select {...register("status")}>
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

                {errors.status && (
                    <span className="error">
                  {errors.status.message}
                </span>
                )}
              </div>

              <div className="form-group">
                <label>Ajouter un produit</label>

                <select
                    onChange={(e) =>
                        addProduct(e.target.value)
                    }
                >
                  <option value="">
                    Choisir un produit
                  </option>

                  {products.map((product) => (
                      <option
                          key={product.id}
                          value={product.id}
                      >
                        {product.name}
                      </option>
                  ))}
                </select>
              </div>

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
                {orderProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        {product.name}
                      </td>

                      <td>
                        {product.price} DH
                      </td>

                      <td>
                        <input
                            type="number"
                            min="1"
                            value={product.quantity}
                            onChange={(e) =>
                                changeQuantity(
                                    product.id,
                                    e.target.value
                                )
                            }
                        />
                      </td>

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
        </div>
      </>
  );
}

export default OrderForm;