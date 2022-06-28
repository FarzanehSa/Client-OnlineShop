import React, {useEffect, useState, useContext} from 'react';
import useFormAddProduct from "../../hooks/useFormAddProduct";

import ProductsContext from '../../contexts/ProductsContext';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';






const DataEntry = (props) => {

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
  
  const sizes = productSpec.sizes.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.size}</MenuItem>
    )
  });

  // color_id, size_id, name, description, image_url, price
  const baseFormData = { id: "", category_id: "", style_id: "",
    color_id: "", size_id: "", name: "", description: "", image_url: "", price: "" };
    
  const { formData, handleChange, handleSubmit, errorMsg } = useFormAddProduct(baseFormData, props.onSubmit);
  
  console.log(formData);
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <FormControl>
          <TextField 
            required 
            sx={{ m: 1, width: '25ch' }}
            label="id"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-category-label">category</InputLabel>
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
          <InputLabel id="select-style-label">style</InputLabel>
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
          <InputLabel id="select-color-label">color</InputLabel>
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

        <FormControl required sx={{ m: 1, minWidth: 120 }}>
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
        </FormControl>

        <FormControl>
          <TextField 
            required 
            sx={{ m: 1, width: '25ch' }}
            label="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl>
          <TextField
            id="description"
            label="description"
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
            label="image_url"
            id="image_url"
            name="image_url"
            type={'url'}
            value={formData.image_url}
            onChange={handleChange}
          />
        </FormControl>

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

        <button type="submit">Register</button>

      </div>
    </form>
  );
};

export default DataEntry;




  


    
      



    

