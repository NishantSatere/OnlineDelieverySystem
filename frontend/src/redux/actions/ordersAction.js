import axios from "axios";
import Cookies from 'js-cookie';

export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({ type: 'fetchOrders' });  // Dispatch action to indicate loading state
        const token = Cookies.get('token');
        const { data } = await axios.get('http://localhost:5001/myorders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        console.log("hello", data.Orders);
        dispatch({ type: 'fetchOrdersSuccess', payload: data.Orders });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'fetchOrdersFail', payload: { message: error.message } });
    }
}
