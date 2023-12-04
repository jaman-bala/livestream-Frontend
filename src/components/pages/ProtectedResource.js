import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectedResourceComponent = () => {
  const [resourceData, setResourceData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Получение токена из localStorage (или откуда-то еще)
        if (!token) {
          // Если нет токена, перенаправляем на страницу входа
          navigate('/signin');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/login/protected-resource', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setResourceData(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      {resourceData ? (
        <div>
          <h2>Protected Resource</h2>
          <p>{resourceData.message}</p>
          <p>User Email: {resourceData.user_email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProtectedResourceComponent;
