import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

import LinearProgress from '@mui/material/LinearProgress';

import ProductsContext from './ProductsContext';
import Navigation from './Navigation';

const App = () => {


  const [products, setProducts] = useState([]);

  useEffect( () => {
    
    axios.get('http://localhost:8080/api/products')
    .then((response) => {
      // handle success
      setProducts(prev => response.data);
    }) 
    
  },[])
  
  
  console.log('👟👞🥾',products) // The entire response 



  return (
    <div className="App">
      {products.length !== 0 && 
        <ProductsContext.Provider value={ products }>

          <Navigation />

        </ProductsContext.Provider>
      }
      {products.length === 0 && 
        <div className="page-loading">
          <LinearProgress color="secondary" />
        </div>
      }
    </div>
  )
}

export default App;
