import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (location.pathname === '/register') {
      const isPopupShown = localStorage.getItem('isPopupShown');
      if (!isPopupShown) {
        toast.info('Seja bem-vindo! Registre-se para obter acesso exclusivo.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          newestOnTop: true,
        });
        localStorage.setItem('isPopupShown', 'true');
      }
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registro bem-sucedido!');
        toast.success('Registro bem-sucedido!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          newestOnTop: true,
        });

        navigate('/');
      } else {
        console.error('Registro falhou');
        toast.error('Erro no registro. Verifique se todos os campos foram preenchidos.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          newestOnTop: true,
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao realizar registro:', error);
      toast.error('Erro ao realizar registro. Tente novamente mais tarde.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        newestOnTop: true,
      });
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input className='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Registrar</button>
      </form>
      <div className="register-form-footer">
          Já tem uma conta? <Link to={'/'}>Entre aqui</Link>
      </div>
    </div>
  );
};

export default RegisterForm;