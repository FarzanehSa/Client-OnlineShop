import React, {useState, useEffect} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Colors.scss';

const Colors = (props) => {

  const colorsArry = props.colorSelection.map(product => {
    const myClass =  product.selected ? "color-selected , p-btn" : "p-btn"
    return (
      <div className={myClass} key={product.id}>
        {/* <button style={{backgroundColor: `${product.color}`}} className='btn' /> */}
        <button 
          className={`${product.color.toLowerCase()} , btn`} 
          onClick={() => props.onColor(product)}
        />
      </div>)
  })
  
  return (
    
    <div className='color-list'>
      {colorsArry}
    </div>
  );
};

export default Colors;