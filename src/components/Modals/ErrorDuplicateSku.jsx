import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import './modal.scss';

const ErrorDuplicateSku = ({closeModal, sku}) => {

  return (
    <div className='ErrorDuplicateSku'>
      <h2> Duplicate SKU </h2>
      <h3> Do you whant to Edit item with SKU: {sku} ? </h3>
      <button onClick={closeModal}>
        <NavLink 
          to="/setting/edit-product"
          state={{sku}}
        >Edit</NavLink></button>
      {/* <button onClick={closeModal}><NavLink to="/setting/edit-product"> Edit </NavLink></button> */}
      <button onClick={closeModal}>close</button>
    </div>
  );
};

export default ErrorDuplicateSku;