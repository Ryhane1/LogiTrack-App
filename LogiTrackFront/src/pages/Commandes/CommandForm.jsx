import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import './Commands.css';
import Sidebar from "../../components/Sidebar";


const schema = yup.object({
  nom: yup.string().required('Nom requis'),
  prenom: yup.string().required('Prénom requis'),
  email: yup.string().email().required('Email requis'),
  specialite: yup.string().required('Spécialité requise'),
});

function CommandForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) api.get(`/medecin/${id}`).then((res) => reset(res.data));
  }, [id, reset]);

  const onSubmit = async (data) => {
    if (id) await api.put(`/medecin/${id}`, data);
    else await api.post('/medecin', data);
    navigate('/medecins');
  };

  return (
    <>
        <Sidebar/>
    <div className="page-container">
      <h1>{id ? 'Modifier' : 'Ajouter'} un Médecin</h1>
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
          <label>Spécialité</label>
          <input {...register('specialite')} />
          {errors.specialite && <span className="error">{errors.specialite.message}</span>}
        </div>
        <button type="submit" className="btn-primary">Enregistrer</button>
      </form>
    </div>
    </>
  );
}

export default CommandForm;