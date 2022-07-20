import { Experimental_CssVarsProvider } from '@mui/material';
import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import './modal.scss';

const CheckOutModal = (props) => {

  // const {errCode, errMsg, sku} = props.modalMode;
  const items = props.cart;
  console.log(items);
  if (items.length === 0) {props.closeModal()}

  const itemRows = items.map(item => {
   return (
    <tr key={item.barcode}>
      <td><img src={`${item.img}`} alt="pro" className='image-checkout'/></td>
      <td>
        {item.name}
        <br />
        {item.barcode}
        <br />
        color: {item.color}
        <br />
        size: {item.size}
      </td>
      <td>{item.qty}</td>
      <td>{(item.price * item.qty) / 100} </td>
      <td><button onClick={() => props.onRemove(item.barcode)}>remove</button></td>
    </tr>
   )
  })

  const subtotal = () => {
    let subtotal = 0
    for(const item of items) {
      subtotal += item.price * item.qty
    }
    return subtotal
  }

  const tax = () => {
    return subtotal() * 0.12
  }

  const total = () => {
    return subtotal() + tax()
  }

  return (
    <div className='checkout-modal'>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Item</th>
            <th>Qty</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {itemRows}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>Subtotal: {subtotal() / 100}</td>
          </tr>
          <tr>
            <td colSpan={5}>TAX: {tax() / 100}</td>
          </tr>
          <tr>
            <td colSpan={5}>Total: {total() / 100}</td>
          </tr>
        </tfoot>
    
      </table>
      <button className='button-checkout' onClick={props.closeModal}>Continue Shopping</button>
      <button className='button-checkout' onClick={() => props.onCheckout(subtotal())}>Checkout</button>
    </div>
  );
};

export default CheckOutModal;