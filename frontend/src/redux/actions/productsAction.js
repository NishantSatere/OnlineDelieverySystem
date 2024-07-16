import axios from 'axios';
import Cookies from 'js-cookie';

export const getProducts = (id) => async (dispatch) => {
    try {
        console.log('Hotel ID:', id.id);
        const token = Cookies.get('token');
        const { data } = await axios.get(`http://localhost:5001/getallhotels/1`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        // console.log('Data:', data.Products);
        dispatch({ type: 'fetchProductsSuccess', payload: { products: data.Products } });
    } catch (error) {
        console.error('Error fetching products:', error);
        dispatch({ type: 'fetchProductsFail', payload: { message: error.message } });
    }
};
