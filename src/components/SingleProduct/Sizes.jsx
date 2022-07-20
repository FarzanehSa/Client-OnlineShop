import React, {useState, useEffect} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Sizes.scss';
import { Select } from '@mui/material';

const Sizes = (props) => {

  // console.log('⭕️',props);
  
  const avaSizes = props.availableSizes;
  
  function showSize(id) {
    return avaSizes.filter(row => row.size_id === id)
  }

  function getQty(id) {
    let qty = 0
    return showSize(id).reduce((pre, cur) => pre + cur.quantity, 0)
  }

  const sizeArray = props.sizes.map(size => {

    // console.log(getQty(size.id));
    // return <button className='size-box' key={size.id} hidden={showSize(size.id).length === 0} disabled={getQty(size.id) === 0}>{ size.size }</button>
    const data = showSize(size.id)[0]

    let class_name = size.id === props.select.size_id ? "size-box selected" : "size-box"
     return <button 
      className={class_name}
      key={size.id}
      // onClick={props.onSelectSize()}
      onClick={() => {
        props.onClick(data);
      }}
      hidden={showSize(size.id).length === 0}
      disabled={getQty(size.id) === 0}>{ size.size }</button>
  })

  return (
    <div>
      <div className='size-list'>
        {sizeArray}
      </div>
      <button onClick={() => props.onAdd()}>add to cart</button>

    </div>
  );
};

export default Sizes;