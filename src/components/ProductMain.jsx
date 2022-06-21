import React, {useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import './ProductMain.scss';

import LinearProgress from '@mui/material/LinearProgress';

import ProductsContext from '../contexts/ProductsContext';

const ProductMain = () => {
  
  const {products} = useContext(ProductsContext);
  const id = Number(useParams().id);
  
  const findProduct = (id, products) => {
    return products.filter(product => product.id === id)[0]
  }

  let product = {}
  
  if (products) {
    product = findProduct(id, products)
  }

  return (
    <div className='item'>
      {products && products.length !== 0 && 
        <>
          { product && product.id ?
            <>
              <h2>This is product #{product.id} </h2>
              <img src={`${product.image_url}`} alt="pro" width="50" height="50"/>
              <br />
              <span>name : {product.name}</span>
              <br />
              <span>price : {product.price}</span>
              <br />
              <span>size : {product.size}</span>
              <br />
              <span>color : {product.color}</span>
            </> :
            <h3>Can not find product </h3>
          }
        </>
      }

      { ( !products || products.length === 0 ) && 
        <div className="page-loading">
          <LinearProgress color="secondary" />
        </div>
      }
      
    </div>
  );
};

export default ProductMain;