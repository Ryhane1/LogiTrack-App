import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import './Users.css';
import Sidebar from "../../components/Sidebar";


const schema = yup.object({
  date: yup.string().required('Date requise'),
  patientId: yup.number().required('Patient requis'),
  medecinId: yup.number().required('Médecin requis'),
  motif: yup.string().required('Motif requis'),
});

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) api.get(`/rendezVous/${id}`).then((res) => reset(res.data));
  }, [id, reset]);

  const onSubmit = async (data) => {
    if (id) await api.put(`/rendezVous/${id}`, data);
    else await api.post('/rendezVous', data);
    navigate('/rendezvous');
  };

  return (
    <>
        <Sidebar/>
    <div className="page-container">
      <h1>{id ? 'Modifier' : 'Ajouter'} un Rendez-vous</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label>Date</label>
          <input type="datetime-local" {...register('date')} />
          {errors.date && <span className="error">{errors.date.message}</span>}
        </div>
        <div className="form-group">
          <label>ID Patient</label>
          <input type="number" {...register('patientId')} />
          {errors.patientId && <span className="error">{errors.patientId.message}</span>}
        </div>
        <div className="form-group">
          <label>ID Médecin</label>
          <input type="number" {...register('medecinId')} />
          {errors.medecinId && <span className="error">{errors.medecinId.message}</span>}
        </div>
        <div className="form-group">
          <label>Motif</label>
          <textarea {...register('motif')} />
          {errors.motif && <span className="error">{errors.motif.message}</span>}
        </div>
        <button type="submit" className="btn-primary">Enregistrer</button>
      </form>
    </div>
    </>
  );
}

export default UserForm;