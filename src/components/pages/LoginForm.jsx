import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    setAccessToken(token);
    // После успешной аутентификации перенаправляем на /admin
    navigate('/admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('grant_type', '');
      formData.append('username', email);
      formData.append('password', password);
      formData.append('scope', '');
      formData.append('client_id', '');
      formData.append('client_secret', '');

      const response = await axios.post('http://127.0.0.1:8000/login/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const newAccessToken = response.data.access_token;
      // Вызываем функцию handleLoginSuccess при успешной аутентификации
      handleLoginSuccess(newAccessToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/login/token',
          {
            username: email,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
        // Вызываем функцию handleLoginSuccess при успешной аутентификации
        handleLoginSuccess(response.data.access_token);
      } catch (error) {
        console.error(error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken, email, password]);

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="imgcontainer">
          <img className='avatar' src='free-icon-car-2330453.png' alt='Avatar' />
        </div>
        <div className="container">
          <label>
            LOGIN:
            <input type="login" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            PASSWORD:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
