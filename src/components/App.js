import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

import '../styles/App.scss';

import ProductsContext from '../contexts/ProductsContext';
import NavViewContext from '../contexts/NavViewContext';

import Home from './Home';
import About from './About';
import NotExistPage from './NotExistPage';
import Products from './Products';
import ProductMain from './SingleProduct/ProductMain';
import AddProduct from '../components/Management/AddProduct';
import EditProduct from '../components/Management/EditProduct';
import Setting from '../components/Management/Setting';
import Navbar from './Navbar';

import ErrorDuplicateSku from './Modals/ErrorDuplicateSku'
import AddProductSuccessfully from './Modals/AddProductSuccessfully'
import EditProductSuccessfully from './Modals/EditProductSuccessfully'
import EditProductUnSuccessfully from './Modals/EditProductUnSuccessfully'


const App = () => {

  const [navView, setNavView] = useState("")
  const [products, setProducts] = useState([]);
  const [productSpec, setProductSpec] = useState({
    categories: [],
    styles: [],
    sizes: [],
    colors: []
  });
  // const [newProduct, setNewProduct] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState({});

  useEffect( () => {
    
    axios.get('http://localhost:8080/api/products')
    .then((response) => {
      // handle success
      const categories = response.data.categories;
      const styles = response.data.styles;
      const colors = response.data.colors;
      const sizes = response.data.sizes;
      setProducts(prev => response.data.products);
      setProductSpec({...productSpec ,categories,styles, colors, sizes});
    }) 
    
  },[])
  
  console.log('👟👞🥾',products) // 
  console.log('🔧🪛',productSpec) //

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalMode({});
    setModalIsOpen(false);
  }

  function backEndView() {
    setNavView('BE');
  }
  function frontEndView() {
    setNavView('FE');
  }
  
  const addProduct = (newProduct) => {
    // setNewProduct(prev => newProduct);
    if (newProduct && Object.keys(newProduct).length !== 0) {
      axios.post('http://localhost:8080/api/products', {product: newProduct})
      .then((response) => {
        if (response.data.errCode && response.data.errCode === 1001) {
          setModalMode({mode: 1001, sku: response.data.sku});
          openModal();
        } else {
          const newAddedProduct = response.data;
          setProducts([...products, newAddedProduct ])
          setModalMode({mode: 1002, sku: newAddedProduct.sku});
          openModal();
        }
      })
    }
  }

  const editProduct = (updateProduct) => {
    console.log('f...',updateProduct);
    axios.put(`http://localhost:8080/api/products/${updateProduct.id}`, {product: updateProduct})
    .then(response => {
      const updatedProduct = response.data;
      setProducts(products.map(product => {
        if (product.id === updatedProduct.id) return updatedProduct;
        return product;
      }))
      setModalMode({mode: 1003, sku: updatedProduct.sku});
      openModal();
    })
    .catch((error) => {
      setModalMode({mode: 1004});
      openModal();
    })
  }

  // console.log("modal: ", modalMode)
  // console.log('🥾',newProduct) // 

  return (
    <div className="App">
      <ProductsContext.Provider value={{ products, productSpec }}>
      <NavViewContext.Provider value={{navView ,backEndView, frontEndView }}>
        <Router>

          <Navbar />
          { modalIsOpen && 
            <Modal isOpen={modalIsOpen} 
              className="modal" 
              // ariaHideApp={false}
              appElement={document.getElementById('root')}
            >
              {modalMode.mode === 1001 && <ErrorDuplicateSku closeModal={closeModal} sku={modalMode.sku} />}
              {modalMode.mode === 1002 && <AddProductSuccessfully closeModal={closeModal} sku={modalMode.sku} />}
              {modalMode.mode === 1003 && <EditProductSuccessfully closeModal={closeModal} sku={modalMode.sku} />}
              {modalMode.mode === 1004 && <EditProductUnSuccessfully closeModal={closeModal}/>}
            </Modal>
          }

          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />} />
            <Route path="/setting/*" element={<Setting />} />
            <Route path="/products/men/:id" element={<ProductMain />} />
            <Route path="/products/women/:id" element={<ProductMain />} />
            <Route path="/products/:id" element={<Products />} />

            <Route path="/products/*" element={<NotExistPage />} />
            <Route path="/*" element={<NotExistPage />} />
            <Route path="/setting/add-product" element={<AddProduct onSubmit={addProduct} />} />
            <Route path="/setting/edit-product" element={<EditProduct onSubmit={editProduct} />} />
          </Routes>

        </Router>
      </NavViewContext.Provider>
      </ProductsContext.Provider>
    </div>
  )
}

export default App;
