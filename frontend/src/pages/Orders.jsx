import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../redux/actions/ordersAction";

export const Orders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.orders);

    const getallorders = async () => {
        dispatch(getMyOrders());
    }

    return (
        <div>
            <button onClick={getallorders}>Get Orders</button>
            <ul>
                {orders && orders.map((order, index) => (
                    <li key={index}>{order.name}</li>
                ))}
            </ul>
        </div>
    );
}
