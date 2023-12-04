import React from 'react';
import { Link } from 'react-router-dom';

import "./NavBar.css"

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className='title'>Home</Link>
        </li>
        <li>
          <Link to="/signin" className='sign'>Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
