import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../styles/Navbar.scss';

const Navbar = () => {

  return (
    
    <div className='navbar'>
      <h2>Tim</h2>
      <nav>
        <button><NavLink to="/products/men"> Shop for Men </NavLink></button>
        <button><NavLink to="/products/women"> Shop for Women </NavLink></button>
      </nav>
      <nav>
        <button><NavLink to="/"><FontAwesomeIcon icon="fa-solid fa-house" /></NavLink></button>
        <button><NavLink to="/about"> About </NavLink></button>
      </nav>
      <button><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></button>
    </div>
  );
};

export default Navbar;