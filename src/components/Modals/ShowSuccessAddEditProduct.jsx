import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import './modal.scss';

const ShowSuccessAddEditProduct = ({closeModal, modalMode}) => {

  const {msg, sku} = modalMode;

  return (
    <div className='add-edit-product-successfully'>
      <h2> Product SKU: {sku} </h2>
      <h2> {msg} </h2>
      <button className='button-modal' onClick={closeModal}>close</button>
    </div>
  );
};

export default ShowSuccessAddEditProduct;