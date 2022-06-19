import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Products from './Products';
import Product from './Product';

const Navigation = () => {

  return (
    
    <div className='navbar'>
      <h2>Navigation</h2>

      <Router>
        <nav>
          <Link to="/"> Home </Link><br />
          <Link to="/about"> About </Link><br />
          <Link to="/products"> Products </Link><br />
        </nav>

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </Router>


    </div>
  );
};

export default Navigation;