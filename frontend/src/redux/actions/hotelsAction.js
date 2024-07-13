import axios from "axios";
import Cookies from 'js-cookie';

export const getHotels = () => async (dispatch) => {
    try {
        const token = Cookies.get('token');
        const { data } = await axios.get('http://localhost:5001/getallhotels', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        console.log(data);
        dispatch({ type: 'fetchHotelsSuccess', payload : {hotels : data.hotels} });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'fetchHotelsFail', payload: { message: error.message } });
    }
}