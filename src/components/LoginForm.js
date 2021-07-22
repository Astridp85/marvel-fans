import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';



export const Login = () => {

  const { login } = useAuth();
  const [error, setError] = useState('');

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      await login(email, password);
     
      history.push('/');
    } catch (error) {

      setError('Credenciales inválidas');
      setTimeout(() => setError(''), 1500);
    }
  }


  return (
    <div className='card'>
      <div className='card-header' >
        {error && <p className='error' >{error}</p>}
        <h1>Iniciar sesión</h1>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Correo electrónico' onChange={handleEmail} />
          <input type='password' placeholder='Número de identificación' onChange={handlePassword} />
          <input type='submit' value='Iniciar sesión' />
        </form>
        <p>¿No tienes una cuentra? <Link to='/Signup'>Regístrate</Link> </p>
      
    
      </div>

    </div>
  )
}