import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography
} from '@mui/material';

export const AccountProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    photo: '',
    city: '',
    age: 0,
    phone: ''
  });

  useEffect(() => {
    // Fetch user data from your backend here
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN',  // Replace with your actual access token
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN',  // Replace with your actual access token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // If the user is created successfully, fetch and update the user data
        fetchUserData();
        setFormData({
          name: '',
          surname: '',
          email: '',
          photo: '',
          city: '',
          age: 0,
          phone: ''
        });
      } else {
        console.error('Failed to create user:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        {user && (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 80,
                mb: 2,
                width: 80
              }}
            />
            <Typography
              gutterBottom
              variant="h5"
            >
              {user.name}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {user.city} {user.country}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {user.timezone}
            </Typography>
          </Box>
        )}

        {/* User Creation Form */}
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Create User
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* Add other input fields for email, photo, city, age, phone, etc. */}
          <Button variant="contained" onClick={handleCreateUser}>
            Create User
          </Button>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
