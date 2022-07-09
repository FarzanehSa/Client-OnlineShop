import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import './modal.scss';

const EditProductSuccessfully = ({closeModal, sku}) => {

  return (
    <div className='edit-product-successfully'>
      <h2> Product SKU: {sku} </h2>
      <h2> Edited  Successfully. </h2>
      <button onClick={closeModal}>close</button>
    </div>
  );
};

export default EditProductSuccessfully;