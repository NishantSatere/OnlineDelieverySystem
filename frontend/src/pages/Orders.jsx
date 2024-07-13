import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../redux/actions/ordersAction";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector(state => state.orders);

    const getallorders = async () => {
        await dispatch(getMyOrders());
    }

    const handleOrderClick = (orderId) => {
        navigate(`/order/${orderId}`);
    }
    
    useEffect(() => {
        getallorders();
    },[]);

    return (
        <div>
            <div className="flex justify-between items-center mx-36 mt-5">
                <a href="/profile" className=" text-white hover:bg-gray-200 hover:text-black transition duration-300 cursor-pointer active:bg-gray-300 "><ArrowBackIcon fontSize="large"/></a>
                <h1 className="text-white text-3xl font-semibold text-center flex-grow">Your Orders</h1>
                <div className="w-16"></div> {/* Empty div to balance the flexbox */}
            </div>
            
            <div className="grid grid-flow-row auto-rows-max mt-5 mx-28">
                <ul>
                    {orders.map((order, index) => {
                        return (
                            <li className="flex h-20 items-center justify-evenly rounded-md bg-white m-5 hover:bg-gray-200 transition duration-300 cursor-pointer active:bg-gray-300" 
                                key={index}
                                onClick={() => handleOrderClick(order.orderId)}>
                                <div className=" flex flex-col">
                                    <span><RestaurantIcon fontSize="small" /></span>
                                    <span className=" font-bold">{order.HotelName}</span>
                                </div>
                                <div className=" flex ">
                                    <span><CurrencyRupeeIcon fontSize="small" /></span>
                                    <span className=" font-bold">{order.orderAmount}</span>
                                </div>
                                <div className=" flex flex-col">
                                    <span><FastfoodIcon fontSize="small" /></span>
                                    <span>{order.products.length}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
