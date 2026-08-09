import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import "./Products.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  categorie: yup.string().required("La catégorie est obligatoire"),
  prix: yup.number().typeError("Prix invalide").positive().required("Le prix est obligatoire"),
  quantiteStock: yup.number().typeError("Stock invalide").integer().min(0).required("Le stock est obligatoire"),
});

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      reset(res.data);
    } catch (error) {
      toast.error("Erreur lors du chargement.");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (id) {
        await api.put(`/products/${id}`, data);
        toast.success("Produit modifié.");
      } else {
        await api.post("/products", data);
        toast.success("Produit ajouté.");
      }
      navigate("/products");
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
    }
  };

  return (
      <div className="page-container">
        <h1>{id ? "Modifier un produit" : "Ajouter un produit"}</h1>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nom</label>
            <input {...register("nom")} />
            <span className="error">{errors.nom?.message}</span>
          </div>

          <div className="form-group">
            <label>Catégorie</label>
            <input {...register("categorie")} />
            <span className="error">{errors.categorie?.message}</span>
          </div>

          <div className="form-group">
            <label>Prix</label>
            <input type="number" step="0.01" {...register("prix")} />
            <span className="error">{errors.prix?.message}</span>
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input type="number" {...register("quantiteStock")} />
            <span className="error">{errors.quantiteStock?.message}</span>
          </div>

          <button type="submit" className="btn-primary">
            {id ? "Modifier" : "Ajouter"}
          </button>
        </form>
      </div>
  );
}

export default ProductForm;