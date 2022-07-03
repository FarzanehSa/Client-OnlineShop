import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import '../styles/Products.scss';

import LinearProgress from '@mui/material/LinearProgress';

import ProductsContext from '../contexts/ProductsContext';
import NavViewContext from '../contexts/NavViewContext';
import Product from './Product';

import {getProducts} from '../helper/getProducts'
import {validCategory} from '../helper/validCategory'
import { getFormLabelUtilityClasses } from '@mui/material';


const Products = () => {
  
  const {products} = useContext(ProductsContext)
  const {productSpec} = useContext(ProductsContext)

  const [selection, setSelection] = useState([]);
  const [validCat, setValidCat] = useState(getFormLabelUtilityClasses);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = useParams().id;
  const style = searchParams.get("style");

  const {frontEndView} = useContext(NavViewContext);


  useEffect(() => {
    setSelection(prev => getProducts(products, category, style))
    setValidCat(validCategory(productSpec.categories, category))
  }, [products, category, style])
  
  useEffect(() => {
    frontEndView();
  }, [])

  const productsLinkArray = selection && selection.map(product => {
    return (
      <NavLink key={product.id} to={`${product.id}`}>
        <Product  {...product}/>
      </NavLink>
    )
  }) 
  
  // console.log("style ==>", style);
  // console.log("cat ==>", category);
  // console.log("products ==>", products);
  // console.log("selection ==>", selection);

  return (
    <div>
        <h2>Products</h2>
        {!validCat && <h2>Product not found</h2>}
        { validCat && productSpec.styles.map(style => {
          return <button key={style.id} onClick={()=>setSearchParams({style : style.style})}>{style.style}</button>
        })}
        
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