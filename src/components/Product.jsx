//  This componet is for product that shows in list of products

// import React, {useEffect, useState, useContext} from 'react';
// import { useParams } from 'react-router-dom';
import '../styles/Product.scss';

const Product = (props) => {

  return (
    <div className='item'>
      <h2> #{props.id} </h2>
      <img src={`${props.image1}`} alt="pro" width="200" height="200"/>
      <br />
      <span>name : {props.name}</span>
      <br />
      <span>price : {props.price}</span>
    </div>
  );
};

export default Product;