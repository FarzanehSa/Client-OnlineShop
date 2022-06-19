import React, {useContext} from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './Products.scss';

import ProductsContext from './ProductsContext';
import Product from './Product';



const Products = () => {
  
  const {products} = useContext(ProductsContext)

  const productsLinkArray = products && products.map(product => {
    return (
      // <li ><Link key={product.id} to={`${product.id}`}>Product #{product.id}</Link></li>
      <Link key={product.id} to={`${product.id}`}>
        <Product id={product.id}/>
      </Link>
    )
  }) 

  
  return (
    <div>

      <h2>Products</h2>

      <Routes>
        <Route path="" element={
          <h2>Please Select your Item</h2>
          } />
        {/* <Route path=":id" element={<Product />} /> */}
      </Routes>
      
      <nav className='items'>
        {productsLinkArray}
      </nav>

    </div>
  );
};

export default Products;