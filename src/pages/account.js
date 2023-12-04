import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';

import CreateUserCard from '../sections/account/createusercard';
import UserTable from '../sections/account/usertable';

const Page = () => {
 const router = useRouter();
 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);

 const fetchUsers = async () => {
   try {
     const response = await axios.get('http://127.0.0.1:8000/api/user/');
     setUsers(response.data);
   } catch (error) {
     console.error('Error fetching users:', error);
   }
 };


 useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);


const handleUserCreated = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/user/', userData);

    if (response.data.success) {
      setUsers([response.data.user, ...users]);
      router.reload();
    }
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message);
  }
};

const handleDeleteUser = async ({ userId, isActive }) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/user/?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${yourAuthToken}`,
      },
    });

    // Handle the response...
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


return (
  <Container>
    <Box py={8}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CreateUserCard onUserCreated={handleUserCreated} />
        </Grid>
        <Grid item xs={12}>
          {users && <UserTable users={users} onDelete={handleDeleteUser} />}
        </Grid>
      </Grid>
    </Box>
  </Container>
);
};

Page.getLayout = (page) => (
 <DashboardLayout>
   {page}
 </DashboardLayout>
);

export default Page;
