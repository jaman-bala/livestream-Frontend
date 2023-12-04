import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';

const UserTable = ({ users, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
            {/* Add other column headers as needed */}
          </TableRow>
        </TableHead>
        
        {/* Table Body */}
        <TableBody>
          {/* Map through the users array to create rows */}
          {users.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
              <Button 
              variant="outlined" 
              color="secondary" 
              sx={{ marginLeft: 1 }}  
              onClick={() => onDelete({ userId: user.user_id, isActive: user.is_active })}
             >
            Delete
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              sx={{ marginLeft: 1 }}  
              onClick={() => onCreate({ userId: user.user_id, isActive: user.is_active })}
             >
            Delete
            </Button>
              </TableCell>
              {/* Add other data cells as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
