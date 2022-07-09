import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import './modal.scss';

const EditProductUnSuccessfully = ({closeModal}) => {

  return (
    <div className='edit-product-unsuccessfully'>
      <h2>Ooops! Something Happend.</h2>
      <h2>Couldn't Save your edit.</h2>
      <button onClick={closeModal}>close</button>
    </div>
  );
};

export default EditProductUnSuccessfully;