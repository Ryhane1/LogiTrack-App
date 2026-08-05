function FormInput({ label, register, name, error, type = 'text' }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>{label} : </label>
      <input type={type} {...register(name)} />
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
}

export default FormInput;