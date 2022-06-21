import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import './Products.scss';

import LinearProgress from '@mui/material/LinearProgress';

import ProductsContext from '../contexts/ProductsContext';
import Product from './Product';



const Products = () => {
  
  const {products} = useContext(ProductsContext)

  const productsLinkArray = products && products.map(product => {
    return (
      <NavLink key={product.id} to={`${product.id}`}>
        <Product  {...product}/>
      </NavLink>
    )
  }) 

  
  return (
    <div>

      <h2>Products</h2>
      
      { products && products.length !== 0 && 
        <nav className='items'>
          {productsLinkArray}
        </nav>
      }

      { ( !products || products.length === 0 ) &&
        <div className="page-loading">
          <LinearProgress color="secondary" />
        </div>
      }

    </div>
  );
};

export default Products;