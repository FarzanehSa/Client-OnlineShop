import React, {useEffect, useState, useContext} from 'react';
import useFormAddProduct from "../../hooks/useFormAddProduct";
import useFormAddBarcode from "../../hooks/useFormAddBarcode";

import './AddProduct.scss';
import ProductsContext from '../../contexts/ProductsContext';
import NavViewContext from '../../contexts/NavViewContext';

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


const AddProduct = (props) => {

  const {productSpec} = useContext(ProductsContext);
  const {backEndView} = useContext(NavViewContext);
  // const [checked, setChecked] = useState(true);
  // console.log(checked);
  useEffect(() => {
    backEndView();
  }, []);

  const categories = productSpec.categories.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.cat}</MenuItem>
    )
  });

  const styles = productSpec.styles.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.style}</MenuItem>
    )
  });

  const colors = productSpec.colors.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.color}</MenuItem>
    )
  });
  
  const sizes = productSpec.sizes.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.size}</MenuItem>
    )
  });

  // const handleChangeCheckBox = (event) => {
  //   setChecked(event.target.checked);
  // };

  // color_id, size_id, name, description, image_url, price
  const baseFormData = { sku: "", category_id: "", style_id: "",
    color_id: "", name: "", description: "", image1: "", image2: "", image3: "", price: "", disp:false};
  const baseFormBarcode = { barcode: "", sku: "", size_id: "", quantity:0 }
    
  const { formData, handleChange, handleSubmit, errorMsg, handleCheckBoxChange} = useFormAddProduct(baseFormData, props.onSubmit);
  const { formBarcodeData, handleChange2, handleSubmit2, errorMsg2} = useFormAddBarcode(baseFormBarcode, props.onSubmitBarcode);
  
  console.log(formData);
  console.log(formBarcodeData);
  
  return (
    <div className='add-item-page'>
      <h2>Add New Main Product</h2>
      <form onSubmit={handleSubmit} >
        <div className='add-item-form'>
          <FormControl>
            <TextField 
              required 
              sx={{ m: 1, width: '25ch' }}
              label="SKU"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <div className='cat-style-color'>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-category-label">Category</InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                name="category_id"
                value={formData.category_id}
                // label="* category *"
                onChange={handleChange}
              >
                {categories}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-style-label">Style</InputLabel>
              <Select
                labelId="select-style-label"
                id="select-style"
                name="style_id"
                value={formData.style_id}
                // label="* style *"
                onChange={handleChange}
              >
                {styles}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-color-label">Color</InputLabel>
              <Select
                labelId="select-color-label"
                id="select-color"
                name="color_id"
                value={formData.color_id}
                // label="* color *"
                onChange={handleChange}
              >
                {colors}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

          </div>

          <FormControl>
            <TextField 
              required 
              sx={{ m: 1, width: '40ch' }}
              label="Product's Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <FormControl>
            <TextField
              sx={{ m: 1, width: '80ch' }}
              id="description"
              label="Description"
              multiline
              maxRows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <div className='image-select'>
            <label htmlFor="image1" > Select Image 1:&nbsp;&nbsp;&nbsp;</label>
            <input
              required 
              id="image1"
              name="image1"
              type={"file"}
              accept={'image/*'} 
              value={undefined}
              onChange={handleChange}
            />
            <FormHelperText>Required</FormHelperText>
          </div>

          <div className='image-select'>
            <label htmlFor="image2" > Select Image 2:&nbsp;&nbsp;&nbsp;</label>
            <input
              id="image2"
              name="image2"
              type={"file"}
              accept={'image/*'}
              value={undefined}
              onChange={handleChange}
            />
          </div>

          <div className='image-select'>
            <label htmlFor="image3" > Select Image 3:&nbsp;&nbsp;&nbsp;</label>
            <input
              id="image3"
              name="image3"
              type={"file"}
              accept={'image/*'}
              value={undefined}
              onChange={handleChange}
            />
          </div>

          <div>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="input-price">Price</InputLabel>

              <OutlinedInput
                
                id="input-price"
                name="price"
                type='number'
                value={formData.price}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Price"
              />
              {errorMsg ?
              <FormHelperText style={{color: 'red'}}>{errorMsg}</FormHelperText> :
              <FormHelperText>Required</FormHelperText>
              }
            </FormControl>

            <FormControlLabel control={
              <Checkbox
                checked={formData.disp}
                onChange={handleCheckBoxChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />} label="Display In Group Page" />
            </div>

          <button type="submit"> Add Item</button>

        </div>
      </form>

      <br />

      <h2>Add Barcode</h2>
      <form onSubmit={handleSubmit2} >
        <div className='add-barcode-form'>
          <FormControl>
            <TextField 
              required 
              sx={{ m: 1, width: '25ch' }}
              label="barcode"
              id="barcode"
              name="barcode"
              value={formBarcodeData.barcode}
              onChange={handleChange2}
            />
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField 
              required 
              sx={{ m: 1, width: '25ch' }}
              label="SKU"
              id="sku"
              name="sku"
              value={formBarcodeData.sku}
              onChange={handleChange2}
            />
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-size-label">size</InputLabel>
            <Select
              labelId="select-size-label"
              id="select-size"
              name="size_id"
              value={formBarcodeData.size_id}
              // label="* size *"
              onChange={handleChange2}
            >
              {sizes}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField 
              sx={{ m: 1, width: '25ch' }}
              label="quantity"
              id="quantity"
              type="number"
              min="0"
              name="quantity"
              value={formBarcodeData.quantity}
              onChange={handleChange2}
            />
            {errorMsg2 &&
              <FormHelperText style={{color: 'red'}}>{errorMsg2}</FormHelperText>}
          </FormControl>
          <button type="submit"> Add Barcode </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;