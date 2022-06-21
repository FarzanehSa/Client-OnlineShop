//  This componet is for product that shows in list of products

// import React, {useEffect, useState, useContext} from 'react';
// import { useParams } from 'react-router-dom';
import './Product.scss';

const Product = (props) => {

  return (
    <div className='item'>
      <h2>This is product #{props.id} </h2>
      <img src={`${props.image_url}`} alt="pro" width="50" height="50"/>
      <br />
      <span>name : {props.name}</span>
      <br />
      <span>price : {props.price}</span>
    </div>
  );
};

export default Product;