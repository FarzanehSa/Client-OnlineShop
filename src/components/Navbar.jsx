import React, {useState, useEffect, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../styles/Navbar.scss';

import NavViewContext from '../contexts/NavViewContext';

const Navbar = () => {

  const {navView} = useContext(NavViewContext);
  

  return (
    
    <div className='navbar'>
      <h2>Tim</h2>
      {navView === "FE" && 
        <nav>
          <button><NavLink to="/products/men"> Shop for Men </NavLink></button>
          <button><NavLink to="/products/women"> Shop for Women </NavLink></button>
        </nav>
      }
      {navView === "BE" && 
        <nav>
          <button><NavLink to="/setting/add-product"> Add New Product </NavLink></button>
          <button><NavLink to="/setting/edit-product"> Edit </NavLink></button>
        </nav>
      }
      <nav>
        <button><NavLink to="/"><FontAwesomeIcon icon="fa-solid fa-house" /></NavLink></button>
        <button><NavLink to="/about"> About </NavLink></button>
        <button><NavLink to="/setting"><FontAwesomeIcon icon="fa-solid fa-gears" /></NavLink></button>
      </nav>
      <button><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></button>
    </div>
  );
};

export default Navbar;