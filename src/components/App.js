import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.scss';

import ProductsContext from '../contexts/ProductsContext';

import Home from './Home';
import About from './About';
import Products from './Products';
import ProductMain from './ProductMain';
import DataEntry from './DataEntry';
import Navbar from './Navbar';

const App = () => {


  const [products, setProducts] = useState([]);
  const [productSpec, setProductSpec] = useState({
    categories: [],
    styles: [],
    sizes: [],
    colors: []
  });
  const [product, setProduct] = useState({});

  useEffect( () => {
    
    axios.get('http://localhost:8080/api/products')
    .then((response) => {
      // handle success
      const sizes = response.data.sizes;
      setProducts(prev => response.data.products);
      setProductSpec({...productSpec , sizes});
    }) 
    
  },[])
  
  console.log('👟👞🥾',products) // 
  console.log('🔧🪛',productSpec) //
  
  
  const addItemToProductsList = (newProduct) => {
    setProduct(prev => newProduct)
  }

  console.log('👟',product);



  return (
    <div className="App">
      <ProductsContext.Provider value={{ products, productSpec }}>
        <Router>

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />} />
            <Route path="/products/*" element={<Products />} />
            <Route path="/products/:id" element={<ProductMain />} />
            <Route path="/add-data" element={<DataEntry onSubmit={addItemToProductsList} />} />
          </Routes>

        </Router>
      </ProductsContext.Provider>
    </div>
  )
}

export default App;
