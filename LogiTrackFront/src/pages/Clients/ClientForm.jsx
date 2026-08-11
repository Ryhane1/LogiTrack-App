import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./Clients.css";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

const schema = yup.object({
  nom: yup.string().required("Nom requis"),
  prenom: yup.string().required("Prénom requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  telephone: yup.string().required("Téléphone requis"),
  adresse: yup.string().required("Adresse requise")
});

function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (id) {
      loadClient();
    }
  }, [id]);

  const loadClient = async () => {
    try {
      const response = await api.get(`/clients/${id}`);
      reset(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (id) {
        await api.put(`/clients/${id}`, data);
        toast.success("Client modifié avec succès.");
      } else {
        await api.post("/clients", data);
        toast.success("Client ajouté avec succès.");
      }
      navigate("/clients");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement.");
    }
  };

  return (
      <>
        <Sidebar />
        <div className="page-container">
          <h1>
            {id ? "Modifier" : "Ajouter"} un Client
          </h1>

          <form
              onSubmit={handleSubmit(onSubmit)}
              className="form"
          >
            <div className="form-group">
              <label>Nom</label>
              <input
                  type="text"
                  {...register("nom")}
              />
              {errors.nom && (
                  <span className="error">
                                {errors.nom.message}
                            </span>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                  type="email"
                  {...register("email")}
              />
              {errors.email && (
                  <span className="error">
                                {errors.email.message}
                            </span>
              )}
            </div>

            <div className="form-group">
              <label>Téléphone</label>
              <input
                  type="text"
                  {...register("telephone")}
              />
              {errors.telephone && (
                  <span className="error">
                                {errors.telephone.message}
                            </span>
              )}
            </div>

            <div className="form-group">
              <label>Ville</label>
              <input
                  type="text"
                  {...register("ville")}
              />
              {errors.ville && (
                  <span className="error">
                                {errors.ville.message}
                            </span>
              )}
            </div>

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

export default ClientForm;