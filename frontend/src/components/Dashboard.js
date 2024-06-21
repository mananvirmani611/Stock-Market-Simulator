import { useEffect, useState } from "react";
import { Get, Patch } from "../services/ThirdPartyUtilityService";
import constants from "../constants";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';
import Pagination from '@mui/material/Pagination';
import Modal from "./Modal";
import {useSelector, useDispatch} from 'react-redux'
import { fetchBalance, fetchEmail, updateBalance } from "../slices/emailSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Dashboard = function(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [email, setEmail] = useState(null);
    const userEmail = useSelector((state) => state.email.email);
    const userBalance = useSelector((state) => state.email.balance);

    const [stockData, setStockData] = useState(null);
    const [pageNo, setPageNo] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStockData, setSelectedStockData] = useState({stock : "", price : ""});

    const handlePageChange = function(event, value){
        setPageNo(value);
    }
    async function openModal(stockName, stockPrice){
        if(userBalance === -1){
            dispatch(fetchBalance());
        }
        else{
            if(stockPrice > userBalance){
                toast.error("Insufficient Balance", {autoClose : 500});
                return;
            }
            setModalOpen(true);
            setSelectedStockData({stock : stockName, price: stockPrice})
        }
    }
    const buyStock = async function(stockData, quantity, totalPrice){
        const reqBody = {
          stockName : stockData.stock,
          quantity : quantity,
          purchaseQuantity : quantity,
          stockPurchasePrice : stockData.price,
          totalPurchaseValue : totalPrice,
          email : userEmail,
        }
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
            Accept: 'application/json'
        }
        Patch(constants.BASE_API_URL + constants.APIS.BUY_STOCK, reqBody, headers)
        .then((res) => {
          console.log(res);
          toast.success("Purchase Successful", {autoClose : 500});
          dispatch(updateBalance(userBalance - totalPrice));
          setModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    useEffect(() => { 
        if(!localStorage.getItem('login-token')){
            navigate("/login");
        }
        if(!userEmail){
            dispatch(fetchEmail());
        }
        else{
            dispatch(fetchBalance());
        }
        
        Get(constants.BASE_API_URL + constants.APIS.ALL_STOCKS_DATA + `?page_no=${pageNo}`, {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
            Accept: 'application/json'
        })
        .then((res) => {
            setStockData(res.data.data);
        })

    }, [userEmail, pageNo])

    return <div style={{fontFamily:"Poppins"}}>
        {userEmail && userBalance && <div style={{'padding' : '1% 2%'}}>
        {userEmail && <Navbar email={userEmail} leftText="Dashboard" rightText={`Credits Left: `} showBalance={true} iconType='Profile'/>}
        {stockData &&
            <div style={{ 'padding': '2%', 'backgroundColor' : '#ebe0d6', 'margin' : '1% 0', 'borderRadius' : '10px', 'boxShadow' : '3px 3px lightgray'}}>
                <Table sx={{
                    '& tr td:last-child': {
                        textAlign: 'center',
                    },
                    '& tr th:last-child': {
                        textAlign: 'center',
                    },
                    '& tr th:nth-last-child(2)': {
                        textAlign: 'center',
                    },
                    '& tr td:nth-last-child(2)': {
                        textAlign: 'center',
                    },
                    '& th': {
                        backgroundColor: '#dbc5b3', // Set background color to red for all th elements
                    },
                    '& tr:nth-of-type(even)': {
                        backgroundColor: 'white', // Change the background color for odd rows (stripes)
                    },
                }} borderAxis="both" borderRadius='1' style={{'boxShadow' : '2px 2px lightgray'}} >
                    <thead style={{fontSize:'20px', fontWeight:900}}>
                        <tr style={{'backgroundColor' : 'gray!important'}}>
                            <th style={{ width: '30%', 'border' : '2px solid gray' }}>Stock Name</th>
                            <th style={{ width: '40%', 'border' : '2px solid gray' }}>Stock Price</th>
                            <th style={{'border' : '2px solid gray'}}>Buy Stock</th>
                            <th style={{'border' : '2px solid gray'}}>Analysis</th>
                        </tr>
                    </thead>
                    <tbody style={{fontSize:'18px'}}>
                        {stockData.map((row) => (
                            <tr key={row.stock}>
                                <td style={{'border' : '1.5px solid gray'}}>{row.stock}</td>
                                <td style={{'border' : '1.5px solid gray'}}>{row.price}</td>
                                <td style={{'border' : '1.5px solid gray'}}><Button variant="outlined" onClick={() => openModal(row.stock, row.price)}>Buy </Button></td>
                                <td style={{'border' : '1.5px solid gray'}}><Button variant="outlined"><a href={`https://www.google.com/finance/quote/${row.stock}:NSE`} target="_blank" style={{color:'gray', textDecoration : "none"}}>View</a></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination count={5} onChange={handlePageChange} style={{'margin' : '1% 0'}} variant="outlined"/>
            </div>
        }

        {modalOpen && <Modal type={"Buy"} setModalOpen={setModalOpen} stockData={selectedStockData} balance={userBalance} email={userEmail} buyStockFunction={buyStock}/>}
    </div>}
    </div>
}

export default Dashboard;