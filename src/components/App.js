import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

import CheckOutModal from './Modals/CheckOutModal'
import ShowErrorModal from './Modals/ShowErrorModal'
import ShowSuccessAddEditProduct from './Modals/ShowSuccessAddEditProduct'


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
  const [cart, setCart] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState({});

  

  useEffect( () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
     setCart(cart);
    }
    
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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
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
        if (response.data.errCode) {
          const {errCode, errMsg, sku} = response.data;
          // setModalMode({mode: 101, errCode, errMsg, sku});
          // openModal();
          toast("there is a problem", {type: 'error'})
        } else {
          const newAddedProduct = response.data;
          setProducts([...products, newAddedProduct ])
          const msg = "Add Successfully"
          setModalMode({mode: 102, msg, sku: newAddedProduct.sku});
          openModal();
        }
      })
      .catch((error) => {
        setModalMode({mode: 101, errMsg: error.message});
        openModal();
      })
    }
  }

  const addBarcode = (newBarcode) => {
    if (newBarcode && Object.keys(newBarcode).length !== 0) {
      axios.post('http://localhost:8080/api/products/barcode', {row: newBarcode})
      .then((response) => {
        if (response.data.errCode) {
          const {errCode, errMsg} = response.data;
          setModalMode({mode: 101, errCode, errMsg});
          openModal();
        } else {
          const newAvailableSize = response.data;
          const msg = "Add New Size Successfully"
          setModalMode({mode: 102, msg, sku: newAvailableSize.sku});
          openModal();
        }
        console.log(response.data);
      })
      .catch((error) => {
        setModalMode({mode: 101, errMsg: error.message});
        openModal();
      })
    }
  }

  const editProduct = (updateProduct) => {
    axios.put(`http://localhost:8080/api/products/${updateProduct.id}`, {product: updateProduct})
    .then(response => {
      const updatedProduct = response.data;
      setProducts(products.map(product => {
        if (product.id === updatedProduct.id) return updatedProduct;
        return product;
      }))
      const msg = "Edit Successfully"
      setModalMode({mode: 102, msg, sku: updatedProduct.sku});
      openModal();
    })
    .catch((error) => {
      setModalMode({mode: 101, errMsg: error.message});
      openModal();
    })
  }

  const addToCart = (x) => {
    const barcode = x[0].barcode;
    let flag = false
    const updateCart = cart.map(item => {
      if (barcode === item.barcode) {
        item.qty += 1;
        flag = true;
      }
      return item;
    })
    if (flag) {
      setCart(updateCart)
    } else {
      setCart([...cart, ...x])
    }
  }

  const onCartClick = () => {
    console.log('👀');
    setModalMode({mode: 103});
    openModal();
  }
  
  const onRemoveFromCart = (barcode) => {
    console.log(barcode);
    let updateCart = []
    updateCart = cart.filter(item => barcode !== item.barcode) 
    console.log(updateCart);
    setCart(updateCart)
  }

  const onCheckout = (subtotal) => {
    axios.post('http://localhost:8080/api/orders', {cart: cart, subtotal: subtotal})
    .then((response) => {
      console.log('🟢');
      closeModal();
      setCart([]);
    })
  }

  // console.log("modal: ", modalMode)
  // console.log('🥾',newProduct) // 
  console.log('🧺',cart) // 

  return (
    <div className="App">
      <ProductsContext.Provider value={{ products, productSpec }}>
      <NavViewContext.Provider value={{navView ,backEndView, frontEndView }}>
        <Router>

          <Navbar cart={cart} onCartClick={onCartClick}/>
          { modalIsOpen && 
            <Modal isOpen={modalIsOpen} 
              className="modal" 
              // ariaHideApp={false}
              appElement={document.getElementById('root')}
            >
              {modalMode.mode === 101 && <ShowErrorModal closeModal={closeModal} modalMode={modalMode} />}
              {modalMode.mode === 102 && <ShowSuccessAddEditProduct closeModal={closeModal} modalMode={modalMode} />}
              {modalMode.mode === 103 && <CheckOutModal closeModal={closeModal} modalMode={modalMode} cart={cart} onRemove={onRemoveFromCart} onCheckout={onCheckout} /> }
            </Modal>
          }
          <ToastContainer />

          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />} />
            <Route path="/setting/*" element={<Setting />} />
            <Route path="/products/men/:id" element={<ProductMain addToCart={addToCart} />} />
            <Route path="/products/women/:id" element={<ProductMain addToCart={addToCart} />} />
            <Route path="/products/:id" element={<Products />} />

            <Route path="/products/*" element={<NotExistPage />} />
            <Route path="/*" element={<NotExistPage />} />
            <Route path="/setting/add-product" element={<AddProduct onSubmit={addProduct} onSubmitBarcode={addBarcode} />} />
            <Route path="/setting/edit-product" element={<EditProduct onSubmit={editProduct} />} />
          </Routes>

        </Router>
      </NavViewContext.Provider>
      </ProductsContext.Provider>
    </div>
  )
}

export default App;
