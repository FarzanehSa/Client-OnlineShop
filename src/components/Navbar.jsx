import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

const Navbar = () => {

  return (
    
    <div className='navbar'>
      <h2>Nav Bar</h2>
      <nav>
        <NavLink to="/"> Home </NavLink><br />
        <NavLink to="/about"> About </NavLink><br />
        <NavLink to="/products"> Products </NavLink><br />
      </nav>
    </div>
  );
};

export default Navbar;