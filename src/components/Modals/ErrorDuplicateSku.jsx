import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import './ErrorDuplicateSku.scss';

const ErrorDuplicateSku = ({closeModal}) => {

  return (
    <div className='ErrorDuplicateSku'>
      <h2> Duplicate SKU </h2>
      <h3> Do you whant to Edit the Item? </h3>
      <button onClick={closeModal}><NavLink to="/setting/edit-product"> Edit </NavLink></button>
      <button onClick={closeModal}>close</button>
    </div>
  );
};

export default ErrorDuplicateSku;