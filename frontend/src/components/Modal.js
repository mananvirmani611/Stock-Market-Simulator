import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const style = `.modal-overlay {
    box-shadow : 30px 30px lightgray;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
    z-index: 1000; /* Ensure the modal is above everything else */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    width:400px;
    height:260px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add a box shadow for a raised effect */
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-content {
    margin-bottom: 20px;
    text-align:center;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
  }
  .stock-price{
    font-size:26px;
    margin:0;
  }
  .in-de-div{
    font-size:30px;
  }
  .btn-change{
    margin:3%;
  }
  .modal-overlay{
    font-family:'Hind'
  }
  .submit-btn{
    padding:1% 3%;
    font-size:20px;
  }
`;
const Modal = function ({ type, setModalOpen, stockData, balance, email, buyStockFunction, maxAllowedQuantity }) {
  const [isOpen, setIsOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(stockData.price);
  console.log("modalllllllllllllllllllllllllllll ", stockData.recordId);
  const handleQuantityChange = function(value, type){
    if(type === "de" && value === 0)return;
    if(type === "in"){
      if(value > maxAllowedQuantity){
        toast.error(`Only ${maxAllowedQuantity} stocks were purchased at this price`, { autoClose: 1000 });
        return;
      }
      else if(value <= maxAllowedQuantity){
        setTotalPrice((value * stockData.price).toFixed(2));
        setQuantity(value);
        return;
      }

      if(value * stockData.price > balance){
        toast.error("Insufficient Balance", { autoClose: 1000 });
        return;
      }
      else{
        setTotalPrice((value * stockData.price).toFixed(2));
        setQuantity(value);
      }
    }
    else{
      setTotalPrice((value * stockData.price).toFixed(2))
      setQuantity(value);
    }
  }

  if (!isOpen) return null;

  return <>
    {isOpen && <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h1>{stockData.stock}</h1>
          <button className="close-button" onClick={() => {
            setIsOpen(false)
            setModalOpen(false);
          }}><CloseIcon /></button>
        </div>
        <div className="modal-content">
          <div>
          <p className='stock-price'>Current Price : {totalPrice} ₹</p>
          </div>
          <div className='in-de-div'>
          <button onClick={() => handleQuantityChange(quantity-1, "de")} className='btn-change'> <RemoveIcon /></button>
              {quantity}
            <button onClick={() => handleQuantityChange(quantity+1, "in")} className='btn-change'> <AddIcon /></button>
          </div>
          <div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={() => {
            type === "Buy" ?
            buyStockFunction(stockData, quantity, totalPrice) : 
            buyStockFunction(email, stockData.recordId, quantity)}} 
            className='submit-btn'>
              {type}
          </button>
        </div>
      </div>
    </div>}
    <style>{style}</style>
  </>
}

export default Modal;