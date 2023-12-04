import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import ProtectedResourceComponent from './components/pages/ProtectedResource';
import { Admin } from './components/pages/Admin/Admin';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/protected-resource" element={<ProtectedResourceComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
