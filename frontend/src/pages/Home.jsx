import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHotels } from '../redux/actions/hotelsAction';
import { useDispatch, useSelector } from 'react-redux';
export default function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { hotels } = useSelector(state => state.hotels);
    const getallhotels = async () => {
        await dispatch(getHotels());
        // console.log(hotels);
    }

    const handleHotelClick = (id) => {
        navigate(`/hotelProducts/${id}`);
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }else{
            getallhotels();
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <ul className='grid grid-cols-3 gap-12 mx-14 my-14'>
                {hotels.map((hotel, index) => {
                    return (
                        <li
                        key={index}
                        onClick={()=>{handleHotelClick(hotel.id)}}>
                            <div className='flex flex-col justify-center bg-white h-72 rounded-md hover:bg-gray-200 transition duration-300 cursor-pointer active:bg-gray-300'>
                                <img src={hotel.HotelImage} alt='Hotel' className='w-full h-48 object-cover rounded-t-md' />
                                
                                <span className='font-bold text-2xl'>{hotel.HotelName}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>

    );
}
