import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import { Grid } from "@mui/material";
import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';
import { useNavigate } from "react-router-dom";
import { Get, Patch } from "../services/ThirdPartyUtilityService";
import constants from "../constants";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from "../slices/emailSlice";

const style = `
    .display-card{
        padding:3%;
    }
`

const headingsForCard = [
    'Total Credits Left:',
    'Total Invested Amt:',
    'Current Value:' 
]
const colors = [
    '#e5d9cf',
    '#e5d9cf',
    '#e5d9cf'
]
const Profile = function () {
    const navigate = useNavigate();
    const userEmail = useSelector((state) => state.email.email);
    const userBalance = useSelector((state) => state.email.balance);
    const dispatch = useDispatch();

    const [tabledata, setTableData] = useState(null);
    const [values, setValues] = useState([Number(null), Number(null), Number(null)]);
    const [stockPricesMap, setStockPricesMap] = useState(new Map([]));
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStockData, setSelectedStockData] = useState(null);
    const [maxAllowedQuantity, setMaximumAllowedQuantity] = useState(null);

    const sellStock = async function(email, recordId, howManyToSell){
        const reqHeaders = {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
            Accept: 'application/json'
        }
        const reqBody = {
            recordId : recordId,
            username : email,
            quantityToSell : howManyToSell,
            addBalance : howManyToSell * stockPricesMap.get(selectedStockData.stock)
        }

        Patch(constants.BASE_API_URL + constants.APIS.SELL_STOCK, reqBody, reqHeaders)
        .then((res) => {
            dispatch(updateBalance(userBalance + (howManyToSell * stockPricesMap.get(selectedStockData.stock))));
            setModalOpen(false);
        })
        .catch((err) => {
            ///send error toast
        })
    }

    const openModal = function(stockName, stockPrice, qty, recordID){
        setSelectedStockData({stock : stockName, price : stockPrice, recordId: recordID})
        setMaximumAllowedQuantity(qty)
        setModalOpen(true);
    }
    async function useEffectF(){
        if(!localStorage.getItem('login-token')){
            navigate("/login");
        }

        const userDataResponse = await Get(constants.BASE_API_URL + constants.APIS.USER_DATA + `?email=${userEmail}`, {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
            Accept: 'application/json'
        })
        
        setTableData(userDataResponse.data);
    }

    async function updateCards(){
        if(!localStorage.getItem('login-token')){
            navigate("/login");
        }

        const userDataResponse = await Get(constants.BASE_API_URL + constants.APIS.USER_DATA + `?email=${userEmail}`, {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
            Accept: 'application/json'
        })
        const userStockData = userDataResponse.data;
        let stockPricesMaptemp = new Map([]);
        for(let i = 0; i<userDataResponse.data.length; i++){
            const stockName = userDataResponse.data[i].stockName;
            if(stockPricesMaptemp.has(stockName))continue;
            const stockPriceData = await Get(constants.BASE_API_URL + constants.APIS.ALL_STOCKS_DATA + `?stock_name=${stockName}`)
            stockPricesMaptemp.set(stockName, stockPriceData.data.data.price);
        }
        setStockPricesMap(stockPricesMaptemp);
        
        const newvalues = [];
        newvalues[0] = userBalance;
        newvalues[1] = 0;
        newvalues[2] = 0;
        userStockData.forEach((item) => {
            newvalues[1] += Number(item.quantity * item.stockPurchasePrice);
            newvalues[2] += Number(item.quantity * stockPricesMaptemp.get(item.stockName));
        })
        setValues(newvalues);
    }
    

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffectF();
    }, [modalOpen])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        updateCards();
    }, [tabledata])
  return (
    <div style={{ padding: "1% 2%", fontFamily:"Poppins" }}>
      <Navbar leftText={"Personal Dashboard"} showBalance={false} iconType='Home'/>
      <div style={{ padding: "2%", backgroundColor: "#F5efea", margin: "1% 0", borderRadius: "10px", boxShadow: "3px 3px lightgray", }}>
        <Grid container className="main-grid" variant="circular">
            {values && headingsForCard.map((item, index) => {
                return <Grid item xs={4}>
                <div className="display-card">
                    <Card bgcolor={colors[index]} heading={item} value={values[index].toFixed(2) + `₹`}/>
                </div>
              </Grid>
            })}
        </Grid>

        <Table sx={{
                    '& tr td:last-child': {
                        textAlign: 'center',
                    },
                    '& tr th:last-child': {
                        textAlign: 'center',
                    },
                    '& th': {
                        backgroundColor: 'lightgray', // Set background color to red for all th elements
                    },
                    '& tr:nth-of-type(even)': {
                        backgroundColor: 'white', // Change the background color for odd rows (stripes)
                    },
                    
                }} stripe='odd' borderAxis="both" borderRadius='1' style={{'boxShadow' : '2px 2px lightgray'}} >
                    <thead>
                        <tr style={{'backgroundColor' : 'lightgray!important'}}>
                            <th style={{ width: '20%' }}>Stock Name</th>
                            <th>Purchase Price</th>
                            <th>Stocks Purchased</th>
                            <th>Current Price</th>
                            <th>Stocks Available</th>
                            <th>Total Invested Value</th>
                            <th>Total Current Value</th>    
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tabledata &&
                        tabledata.map((item) => {
                            return <tr key={item.recordId}>
                                <td>{item.stockName}</td>
                                <td>{item.stockPurchasePrice}</td>
                                <td>{item.purchaseQuantity}</td>
                                <td>{stockPricesMap.get(item.stockName)}</td>
                                <td>{item.quantity}</td>
                                <td>{item.totalPurchaseValue}</td>
                                <td>{stockPricesMap.get(item.stockName) * item.quantity}</td>
                                <td><Button onClick={() => openModal(item.stockName, stockPricesMap.get(item.stockName), item.quantity, item.recordId)} variant="outlined">Sell</Button></td>
                            </tr>
                        })
                    }  
                    </tbody>
                </Table>
      </div>
      {modalOpen && <Modal type={"Sell"} setModalOpen={setModalOpen} stockData={selectedStockData} balance={values[0]} email={userEmail} buyStockFunction={sellStock} maxAllowedQuantity={maxAllowedQuantity}/>}
      <style>{style}</style>
    </div>
  );
};

export default Profile;