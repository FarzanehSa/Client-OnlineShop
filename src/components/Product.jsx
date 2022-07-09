//  This componet is for product that shows in list of products

// import React, {useEffect, useState, useContext} from 'react';
// import { useParams } from 'react-router-dom';
import '../styles/Product.scss';

const Product = (props) => {

  return (
    <div className='item'>
      <p>
        <img src={`${props.image1}`} alt="pro" width="200" height="200"/>
      </p>
      <span>{props.name}</span>
      <br />
      <br />
      <span>${props.price / 100}</span>
    </div>
  );
};

export default Product;