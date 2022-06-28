import React, {useEffect, useState} from 'react';
import {NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Products from './Products';

import '../styles/Home.scss';

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
      <button><NavLink to="/products/men"> Men's Selection </NavLink></button>
      <button><NavLink to="/products/women"> Women's Selection </NavLink></button>
    </div>
  );
};

export default Home;