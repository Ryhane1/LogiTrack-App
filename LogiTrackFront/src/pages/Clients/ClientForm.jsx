import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import './Clients.css';
import Sidebar from "../../components/Sidebar";


const schema = yup.object({
  patientId: yup.number().required('Patient requis'),
  diagnostic: yup.string().required('Diagnostic requis'),
  traitement: yup.string().required('Traitement requis'),
  dateCreation: yup.string().required('Date requise'),
});

function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) api.get(`/dossierMedical/${id}`).then((res) => reset(res.data));
  }, [id, reset]);

  const onSubmit = async (data) => {
    if (id) await api.put(`/dossierMedical/${id}`, data);
    else await api.post('/dossierMedical', data);
    navigate('/dossiers');
  };

  return (
    <>
    <Sidebar/>
    <div className="page-container">
      <h1>{id ? 'Modifier' : 'Ajouter'} un Dossier</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label>ID Patient</label>
          <input type="number" {...register('patientId')} />
          {errors.patientId && <span className="error">{errors.patientId.message}</span>}
        </div>
        <div className="form-group">
          <label>Diagnostic</label>
          <textarea {...register('diagnostic')} />
          {errors.diagnostic && <span className="error">{errors.diagnostic.message}</span>}
        </div>
        <div className="form-group">
          <label>Traitement</label>
          <textarea {...register('traitement')} />
          {errors.traitement && <span className="error">{errors.traitement.message}</span>}
        </div>
        <div className="form-group">
          <label>Date de création</label>
          <input type="date" {...register('dateCreation')} />
          {errors.dateCreation && <span className="error">{errors.dateCreation.message}</span>}
        </div>
        <button type="submit" className="btn-primary">Enregistrer</button>
      </form>
    </div>
    </>
  );
}

export default ClientForm;