import React, {useEffect, useState, useContext} from 'react';
import useForm from "../hooks/useForm";

import ProductsContext from '../contexts/ProductsContext';

const DataEntry = (props) => {

  const {productSpec} = useContext(ProductsContext);
  console.log(productSpec);

  // color_id, size_id, name, description, image_url, price
  const baseFormData = { id: "", category_id: "", style_id: "",
    color_id: "", size_id: "", name: "", description: "", image_url: "", price: "" };
    
  const { formData, handleChange, handleSubmit } = useForm(baseFormData, props.onSubmit);
  
  console.log(formData);
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>id: </label>
        <input
          type="text"
          name="id"
          onChange={handleChange}
          value={formData.id}
        />
      </div>

      <div>
        <label>category_id: </label>
        <input
          type="text"
          name="category_id"
          onChange={handleChange}
          value={formData.category_id}
        />
      </div>

      <div>
        <label>style_id: </label>
        <input
        type="text"
        name="style_id"
        onChange={handleChange}
        value={formData.style_id}
        />
      </div>

      <div>
        <label>color_id: </label>
        <input
          type="text"
          name="color_id"
          onChange={handleChange}
          value={formData.color_id}
        />
      </div>

      <div>
        <label>size_id: </label>
        <input
          type="text"
          name="size_id"
          onChange={handleChange}
          value={formData.size_id}
        />
      </div>

      <div>
        <label>name: </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </div>

      <div>
        <label>description: </label>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </div>

      <div>
        <label>image_url: </label>
        <input
        type="text"
        name="image_url"
        onChange={handleChange}
        value={formData.image_url}
        />
      </div>

      <div>
        <label>price: </label>
        <input
          type="text"
          name="price"
          onChange={handleChange}
          value={formData.price}
        />
      </div>

      <button type="submit">Register</button>





    </form>
  );
};

export default DataEntry;




  


    
      



    

