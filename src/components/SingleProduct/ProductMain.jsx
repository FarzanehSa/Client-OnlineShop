import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './ProductMain.scss';

import LinearProgress from '@mui/material/LinearProgress';

import ProductsContext from '../../contexts/ProductsContext';
import Image from './Image';
import Colors from './Colors';

const ProductMain = () => {
  
  const {products} = useContext(ProductsContext);
  const [colorSelection, setColorSelection] = useState([])
  const [product, setProduct] = useState({})
  const [id, setId] = useState(Number(useParams().id));
  const [images, setImages] = useState([])

  
  const findProduct = (id, products) => {
    return products.filter(product => product.id === id)[0]
  }

  const findColors = (itemName, products) => {
    return  products.filter(product => product.name === itemName)
  }

  const changeColorHandler = (pro) => {
    setId(pro.id);
    setProduct(prev => pro)
  }


  // let product = {}
  
  useEffect(() => {
    if (products) {
      setProduct(prev => findProduct(id, products));
    }
    if (product) {
      const difColors =findColors(product.name, products).map(row => {
        return (row.id === product.id) ? {...row, selected: true} : {...row, selected: false}
      });
      setColorSelection(difColors);
      setImages([product.image1, product.image2, product.image3]);
    }
  },[products, product])

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
                <h2>This is product #{product.id} </h2>
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