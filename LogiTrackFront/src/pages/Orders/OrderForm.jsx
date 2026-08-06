import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import './Orders.css';
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";


const schema = yup.object({
  nom: yup.string().required('Le nom est requis'),
  prenom: yup.string().required('Le prénom est requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  telephone: yup.string().required('Téléphone requis'),
  dateNaissance: yup.string().required('Date de naissance requise'),
});

function OrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      api.get(`/patient/${id}`).then((res) => reset(res.data));
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await api.put(`/patient/${id}`, data);
        toast.success("Patient modifier avec succès.")
      } else {
        await api.post('/patient', data);
        toast.success("Patient ajouter avec succès.")
      }
      navigate('/patients');
    } catch (err) {
      toast.error("Erreur");
      console.error(err);
    }
  };

  return (
    <>
    <Sidebar/>
    <div className="page-container">
      <h1>{id ? 'Modifier' : 'Ajouter'} un Patient</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label>Nom</label>
          <input {...register('nom')} />
          {errors.nom && <span className="error">{errors.nom.message}</span>}
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input {...register('prenom')} />
          {errors.prenom && <span className="error">{errors.prenom.message}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email')} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <input {...register('telephone')} />
          {errors.telephone && <span className="error">{errors.telephone.message}</span>}
        </div>
        <div className="form-group">
          <label>Date de naissance</label>
          <input type="date" {...register('dateNaissance')} />
          {errors.dateNaissance && <span className="error">{errors.dateNaissance.message}</span>}
        </div>
        <button type="submit" className="btn-primary">Enregistrer</button>
      </form>
    </div>
    </>
  );
}

export default OrderForm;