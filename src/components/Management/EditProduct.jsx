import React, {useEffect, useState, useContext} from 'react';
import { Route, Routes, useSearchParams, useLocation } from 'react-router-dom';

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
  const [errorMsg, setErrorMsg] = useState("")
  
  let location = useLocation();
  // console.log('👀',location.state);
  // console.log(sku);
  // console.log(products);
  // console.log(product);
  
  useEffect(() => {
    backEndView();
    if (location.state) {
      setProduct(findProductBySku(products, location.state.sku));
      setSku(location.state.sku);
      window.history.replaceState({}, Document.title)
    } 
  }, []);

  function onSearch(event) {
    event.preventDefault();
    const productFound = findProductBySku(products, sku);
    if (productFound) {
      // setProduct({id: productFound.id, category_id: productFound.category_id,
      // style_id: productFound.style_id, color_id: productFound.color_id,
      // name: productFound.name, description: productFound.description,
      // image1: productFound.image1, image2: productFound.image2, image3: productFound.image3,
      // price: productFound.price, disp: productFound.disp});
      setProduct({...productFound});
      setErrorMsg("");
      } else setErrorMsg('Not exist!');
  };

  function onResetSearch(event) {
    setSku("");
    setProduct({});
    setErrorMsg("");
  };

  return (
    <div className='edit-item-page'>
      <h2>Edit Product</h2>
      <div className='test'>
        <form onSubmit={onSearch} className='search-sku'>
          <div className='input-feild'>
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
            {errorMsg && <span className='error-msg'>{ errorMsg }</span>}
          </div>
          <button type="submit" className='button-edit-page'>Search</button>
        </form>
        <div>
          <button onClick={onResetSearch} className='button-edit-page'>Reset</button>
        </div>
      </div>
      { Object.keys(product).length !== 0 && <LoadProductForEdit product={product} onSubmit={props.onSubmit} onReset={onResetSearch} />}
    </div>
  );
};

export default EditProduct;