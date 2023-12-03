import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/confirmation');
        console.log('Login bem-sucedido!');
      } else {
        toast.error('Credenciais não encontradas. Clique em "Registrar-se" para criar uma conta e ter acesso.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          newestOnTop: true,
        });

        console.error('Login falhou');
      }
    } catch (error) {
      toast.error('Erro ao realizar login. Tente novamente mais tarde.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        newestOnTop: true,
      });

      console.error('Erro ao realizar login:', error);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        <div className="login-form-footer">
          <p>
            Não tem conta? <Link to="/register">Registre-se</Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
