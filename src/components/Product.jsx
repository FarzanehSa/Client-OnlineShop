import React, {useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import './Product.scss';

import ProductsContext from './ProductsContext';

const Product = (props) => {

  const [product, setProduct] = useState({})
  const {products} = useContext(ProductsContext);
  const id = useParams().id || props.id;


  const findProduct = (id, products) => {
    return products.filter(product => product.id === id)[0]
  }

  useEffect (() => {

    if (products) {
      setProduct(prev => findProduct(Number(id), products))
    }

  },[products, id])


  return (
    <div className='item'>
      { product ?
      <>
        <h2>This is product #{product.id} </h2>
        <img src={`${product.image_url}`} alt="pro" width="50" height="50"/>
        <br />
        <span>name : {product.name}</span>
        <br />
        <span>price : {product.price}</span>
      </> :
      <h3>Can not find product #{id}</h3>
      }
    </div>
  );
};

export default Product;