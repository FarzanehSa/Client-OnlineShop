import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import './AddProductSuccessfully.scss';

const AddProductSuccessfully = ({closeModal}) => {

  return (
    <div className='add-product-successfully'>
      <h2> Add Product Successfully </h2>
      <button onClick={closeModal}>close</button>
    </div>
  );
};

export default AddProductSuccessfully;