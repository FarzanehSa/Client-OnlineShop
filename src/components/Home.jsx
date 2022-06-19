import React, {useEffect, useState} from 'react';
import {Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Products from './Products';

import './Home.scss';

const Home = () => {

  const [mode, setMode] = useState(1);

  useEffect(() => {
    const rotateBackground = setTimeout(() => {
      mode === 1 ? setMode(2) : setMode(1);
    },10000)
    
    return (() => clearTimeout(rotateBackground))
  },[mode])

  return (
    <div className='home' style={{ backgroundImage: `url(/images/background-${mode}.png)` }}>
      <h2 className='title'>All You Need</h2>
      <button>Men's Selection</button>
      <button><Link to="/products"> Women's Selection </Link>

      </button>
      <Routes>
        <Route path="/products/*" element={<Products />} />

      </Routes>

    </div>
  );
};

export default Home;