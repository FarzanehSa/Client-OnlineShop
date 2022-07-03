import React, {useEffect, useState, useContext} from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import './EditProduct.scss';
import ProductsContext from '../../contexts/ProductsContext';
import NavViewContext from '../../contexts/NavViewContext';
import LoadProductForEdit from './LoadProductForEdit';

import { findProductBySku } from '../../helper/findProductBySku';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const EditProduct = (props) => {

  const {products} = useContext(ProductsContext);
  const {backEndView} = useContext(NavViewContext);
  const [sku, setSku] = useState("");
  const [product, setProduct] = useState({})
  
  // console.log(sku);
  // console.log(products);
  // console.log(product);
  // console.log(Object.keys(product));

  useEffect(() => {
    backEndView();
  }, []);

  function onSearch(event) {
    event.preventDefault();
    const productFound = findProductBySku(products, sku)
    if (productFound) setProduct({id: productFound.id, category_id: productFound.category_id,
      style_id: productFound.style_id, color_id: productFound.color_id,
      name: productFound.name, description: productFound.description,
      image1: productFound.image1, image2: productFound.image2, image3: productFound.image3,
      price: productFound.price, disp: productFound.disp});
  } 

  function onResetSearch(event) {
    setSku("");
    setProduct({});
  } 

  
  return (
    <div className='edit-item-page'>
      <h2>Edit Product</h2>
      <form onSubmit={onSearch}>
        <FormControl>
          <TextField
            disabled={Object.keys(product).length !== 0}
            // required 
            sx={{ m: 1, width: '25ch' }}
            label="SKU"
            id="sku"
            name="sku"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
          />
          {/* <FormHelperText>Required</FormHelperText> */}
        </FormControl>
        <button type="submit">Search</button>
        <button onClick={onResetSearch}>Reset</button>
      </form>
      { Object.keys(product).length !== 0 && <LoadProductForEdit product={product} onSubmit={props.onSubmit}/>}
    </div>
  );
};

export default EditProduct;