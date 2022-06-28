import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.scss';

import ProductsContext from '../contexts/ProductsContext';

import Home from './Home';
import About from './About';
import Products from './Products';
import ProductMain from './SingleProduct/ProductMain';
import DataEntry from '../components/Management/DataEntry';
import Navbar from './Navbar';

const App = () => {

  const [products, setProducts] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [productSpec, setProductSpec] = useState({
    categories: [],
    styles: [],
    sizes: [],
    colors: []
  });
  // const [product, setProduct] = useState({});

  useEffect( () => {
    
    axios.get('http://localhost:8080/api/products')
    .then((response) => {
      // handle success
      const categories = response.data.categories;
      const styles = response.data.styles;
      const colors = response.data.colors;
      const sizes = response.data.sizes;
      setProducts(prev => response.data.products);
      setAvailableSizes(prev => response.data.availableSizes);
      setProductSpec({...productSpec ,categories,styles, colors, sizes});
    }) 
    
  },[])
  
  console.log('👟👞🥾',products) // 
  console.log('🔧🪛',productSpec) //
  console.log('▫️◾️◻️🔲',availableSizes) //

  
  
  // const addItemToProductsList = (newProduct) => {
  //   // const numbers = /^[0-9]+$/;
  //   const regex = /^\d+(\.\d{1,2})?$/
  //   console.log(newProduct.price);
  //   console.log(regex.test(newProduct.price));
  //   // console.log(newProduct.price.match(numbers));
  //   setProduct(prev => newProduct)
  // }

  // console.log('👟',product);



  return (
    <div className="App">
      <ProductsContext.Provider value={{ products, productSpec }}>
        <Router>

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />} />
            {/* <Route path="/products/*" element={<Products />} /> */}
            <Route path="/products/men/:id" element={<ProductMain />} />
            <Route path="/products/women/:id" element={<ProductMain />} />
            <Route path="/products/:id" element={<Products />} />
            <Route path="/products/*" element={<h1> No result</h1>} />

            {/* <Route path="/add-data" element={<DataEntry onSubmit={addItemToProductsList} />} /> */}
          </Routes>

        </Router>
      </ProductsContext.Provider>
    </div>
  )
}

export default App;
