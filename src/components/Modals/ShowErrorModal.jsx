import { Experimental_CssVarsProvider } from '@mui/material';
import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import './modal.scss';

const ShowErrorModal = (props) => {

  const {errCode, errMsg, sku} = props.modalMode;

  return (
    <div className='error-modal'>
      <h2> Error: {errMsg} </h2>
      <br />
      {errCode === 1001 && 
        <div className='edit-suggestion'>
          <h3> Do you whant to Edit item with SKU: {sku} ? </h3>
          <button className='button-modal' onClick={props.closeModal}>
            <NavLink 
              to="/setting/edit-product"
              state={{sku}}
            >Edit</NavLink>
          </button>
          <br />
        </div>
      }
      <button className='button-modal' onClick={props.closeModal}>close</button>
      <br />
    </div>
  );
};

export default ShowErrorModal;