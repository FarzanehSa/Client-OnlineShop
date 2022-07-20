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
import Sizes from './Sizes';

const ProductMain = ({addToCart}) => {
  
  const [colorSelection, setColorSelection] = useState([]);
  const [product, setProduct] = useState({});
  const [availableSizes, setAvailableSizes] = useState([]);
  const [id, setId] = useState(Number(useParams().id));
  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  
  const {products, productSpec} = useContext(ProductsContext);
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
      setSelectedSize({})

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
      console.log(response.data);
      setProduct(prev => response.data.product);
      setAvailableSizes(prev => (response.data.availableSizes));
    }) 
  } 

  const findColors = (itemName, products) => {
    return  products.filter(product => product.name === itemName)
  }

  const changeColorHandler = (pro) => {
    setId(prev => pro.id);
    getProductById(pro.id)
    // setProduct(prev => pro);
  }
  
  const rotateLeft = () => {
    const x = images.shift();
    setImages(prev => [...prev, x] );
  }

  const rotateRight = () => {
    const x = images.pop();
    setImages(prev => [x, ...prev] );
  }

  const onSelectSize = (data) => {
    setSelectedSize(prev => (data))
  }

  const onAdd = () => {
    if (selectedSize.id)
      addToCart([{barcode: selectedSize.barcode, id: selectedSize.id, qty: 1, name: product.name, color: product.color, price: product.price, img: product.image1, size: selectedSize.size}])
  }

  // console.log('👟',product);
  // console.log('⚫️⚪️',colorSelection);
  // console.log('🗾',images);
  // console.log('◻️◾️',availableSizes);
  // console.log('💢',selectedSize);

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
                <Sizes sizes={productSpec.sizes} availableSizes={availableSizes} onClick={onSelectSize} select={selectedSize} onAdd={onAdd}/>
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