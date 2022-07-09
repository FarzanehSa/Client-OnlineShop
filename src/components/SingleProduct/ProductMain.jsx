import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductMain.scss';

import LinearProgress from '@mui/material/LinearProgress';

import NavViewContext from '../../contexts/NavViewContext';
import ProductsContext from '../../contexts/ProductsContext';
import Image from './Image';
import Colors from './Colors';

const ProductMain = () => {
  
  const [colorSelection, setColorSelection] = useState([]);
  const [product, setProduct] = useState({});
  const [id, setId] = useState(Number(useParams().id));
  const [images, setImages] = useState([]);
  
  const {products} = useContext(ProductsContext);
  const {frontEndView} = useContext(NavViewContext);

  useEffect(() => {
    frontEndView();
    if (products) {
      getProductById(id)
    }
  },[]);
  
  useEffect(() => {
    if (product) {
      const difColors =findColors(product.name, products).map(row => {
        return (row.id === product.id) ? {...row, selected: true} : {...row, selected: false}
      });
      setColorSelection(difColors);

      const imagesArray = [];
      if (product.image1) imagesArray.push(product.image1);
      if (product.image2) imagesArray.push(product.image2);
      if (product.image3) imagesArray.push(product.image3);
      setImages(imagesArray);
      
      window.history.replaceState('', '',`/products/${product.category}/${id}`);
    }
  },[products, product, id])
  
  const getProductById = (id) => {
    axios.get(`http://localhost:8080/api/products/${id}`)
    .then((response) => {
      // handle success
      setProduct(prev => response.data.product);
    }) 
  } 

  const findColors = (itemName, products) => {
    return  products.filter(product => product.name === itemName)
  }

  const changeColorHandler = (pro) => {
    setId(prev => pro.id);
    setProduct(prev => pro);
  }
  

  const rotateLeft = () => {
    const x = images.shift();
    setImages(prev => [...prev, x] );
  }

  const rotateRight = () => {
    const x = images.pop();
    setImages(prev => [x, ...prev] );
  }

  // console.log('👟',product);
  // console.log('⚫️⚪️',colorSelection);
  // console.log('🗾',images);

  return (
    <div className='single-item'>
      {products && products.length !== 0 && 
        <>
          { product && product.id ?
            <div className='single-box'>
              <Image images={images} onLeft={rotateLeft} onRight={rotateRight}/>
              <div className='item-details'>
                <h2>SKU #{product.sku} </h2>
                <span>{product.name}</span>
                <br />
                <span>${(product.price / 100).toFixed(2)}</span>
                <br />
                <span>size : {product.size}</span>
                <br />
                <span>color : {product.color}</span>
                <Colors colorSelection={colorSelection} onColor={changeColorHandler}/>
              </div>
            </div> :
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