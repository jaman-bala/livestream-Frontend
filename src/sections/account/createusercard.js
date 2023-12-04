import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CreateUserCard = ({ onUserCreated }) => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    // Другие поля пользователя, которые вы хотите включить
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateUser = async () => {
    try {
      // Отправка данных на сервер
      const response = await axios.post('http://127.0.0.1:8000/api/user/', userData);

      // Обработка успешного создания пользователя
      if (response.data.success) {
        onUserCreated(); // Обновление данных после создания пользователя
        // Опционально: очистка полей формы
        setUserData({
            name: '',
            surname: '',
            email: '',
            password: '',
          // Очистка других полей
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create User
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Surname"
          name="surname"
          value={userData.surname}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        {/* Добавьте другие поля пользователя по необходимости */}
        <Button variant="contained" color="primary" onClick={handleCreateUser}>
          Create User
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateUserCard;
