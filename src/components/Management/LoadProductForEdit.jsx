import React, {useEffect, useState, useContext} from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import useFormEditProduct from "../../hooks/useFormEditProduct";

import './EditProduct.scss';
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


const LoadProductForEdit = ({product, onSubmit}) => {

  const {productSpec} = useContext(ProductsContext);

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

  const baseFormData = { ...product};
  
  const { formData, handleChange, handleSubmit, errorMsg, handleCheckBoxChange} = useFormEditProduct(baseFormData, onSubmit);
  console.log(formData);

  return (
      <form onSubmit={handleSubmit} >
        <div className='add-item-form'>

          <div className='cat-style-color'>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-category-label">Category</InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                name="category_id"
                value={formData.category_id}
                // label="* category *"
                // onChange={(event) => setProduct({...product, category_id: event.target.value})}
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

            {/* <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-size-label">size</InputLabel>
              <Select
                labelId="select-size-label"
                id="select-size"
                name="size_id"
                value={formData.size_id}
                // label="* size *"
                onChange={handleChange}
              >
                {sizes}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl> */}
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

          <FormControl>
            <TextField 
              sx={{ m: 1, width: '80ch' }}
              label="Image 1 - URL"
              id="image1"
              name="image1"
              type={'url'}
              value={formData.image1}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <TextField 
              sx={{ m: 1, width: '80ch' }}
              label="Image 2 - URL"
              id="image2"
              name="image2"
              type={'url'}
              value={formData.image2}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <TextField 
              sx={{ m: 1, width: '80ch' }}
              label="Image 3 - URL"
              id="image3"
              name="image3"
              type={'url'}
              value={formData.image3}
              onChange={handleChange}
            />
          </FormControl>

          <div>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="input-price">Price</InputLabel>

              <OutlinedInput
                
                id="input-price"
                name="price"
                type='number'
                value={formData.price / 100}
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
          <button type="submit">Register</button>

        </div>
      </form>
  );
};

export default LoadProductForEdit;