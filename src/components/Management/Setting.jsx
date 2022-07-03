import React, {useEffect, useState, useContext} from 'react';
import {NavLink, Route, Routes } from 'react-router-dom';

import './Setting.scss';

import NavViewContext from '../../contexts/NavViewContext';

const Setting = () => {
  
  const {backEndView} = useContext(NavViewContext);

  useEffect(() => {
    backEndView();
  },[])

  return (
    <div className='setting' >

    </div>
  );
};

export default Setting;