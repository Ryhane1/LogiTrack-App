import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./Users.css";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  prenom: yup.string().required("Le prénom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  role: yup.string().required("Le rôle est obligatoire"),
  password: yup.string().when("$isNew", {
    is: true,
    then: (schema) => schema.required("Le mot de passe est obligatoire"),
    otherwise: (schema) => schema.notRequired()
  })
});

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    context: { isNew: !id }
  });

  useEffect(() => {
    if (id) {
      api.get(`/users/${id}`).then((res) =>
          reset({
            nom: res.data.nom,
            prenom: res.data.prenom,
            email: res.data.email,
            role: res.data.role
          })
      );
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await api.put(`/users/${id}`, data);
        toast.success("Utilisateur modifié avec succès.");
      } else {
        await api.post("/users", data);
        toast.success("Utilisateur ajouté avec succès.");
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
      console.error(error);
    }
  };

  return (
      <>
        <Sidebar />
        <div className="form-container">
          <h2>{id ? "Modifier" : "Ajouter"} un utilisateur</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nom</label>
            <input type="text" {...register("nom")} />
            <p className="error">{errors.nom?.message}</p>

            <label>Prénom</label>
            <input type="text" {...register("prenom")} />
            <p className="error">{errors.prenom?.message}</p>

            <label>Email</label>
            <input type="email" {...register("email")} />
            <p className="error">{errors.email?.message}</p>

            {!id && (
                <>
                  <label>Mot de passe</label>
                  <input type="password" {...register("password")} />
                  <p className="error">{errors.password?.message}</p>
                </>
            )}

            <label>Rôle</label>
            <select {...register("role")}>
              <option value="">-- Choisir --</option>
              <option value="ADMIN">ADMIN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="AGENT">AGENT</option>
            </select>
            <p className="error">{errors.role?.message}</p>

            <button type="submit">Enregistrer</button>
          </form>
        </div>
      </>
  );
}

export default UserForm;