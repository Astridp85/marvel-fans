import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';



import { useAuth } from '../context/AuthContext';


export const SignUp = () => {
  const { signup } = useAuth();

  const [error, setError] = useState('');
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmName, setConfirmName] = useState('');


  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleConfirmName = e => setConfirmName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && confirmName === true) {
      setError('Debe llenar todos los campos');
      setTimeout(() => setError(''), 1500);
    } else {
      try {
        await signup(email, password);
        history.push('/');
      } catch (error) {
        setError('Credenciales inválidas');
        setTimeout(() => setError(''), 1500);
      }
    }
 
  }

  return (
    <div className='card'>
      <div className='card-header' >
        {error && <p className='error' >{error}</p>}
        <h1>Regístrate</h1>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit} >
          <input type='email' placeholder='Correo electrónico' onChange={handleEmail} />
          <input type='password' placeholder='Número de indentificación' onChange={handlePassword} />
          <input type='text' placeholder='Nombre' onChange={handleConfirmName} />
          <input type='submit' value='Registrarme' />
        </form>
      
        <p>¿Ya tienes cuenta? <Link to='/login'>Iniciar sesión</Link> </p>
      </div>

    </div>
  )
}