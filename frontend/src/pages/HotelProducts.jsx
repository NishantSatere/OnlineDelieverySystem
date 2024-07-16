import React from "react";
import { useEffect } from "react";
import { getProducts } from "../redux/actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; export const HotelProducts = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useParams()
    const { products } = useSelector(state => state.products);
    const { isAuthenticated } = useSelector(state => state.user);


    const getallproducts = async () => {
        await dispatch(getProducts(id));
        console.log(products);
    }
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }else{
            getallproducts();
        }

    }, [isAuthenticated, navigate, id]);

    return (
        <div>
            {/* <button onClick={getallproducts}>Get Products</button> */}
            <div className="grid grid-flow-row mx-28">
                <ul className="my-5">
                    {products.map((product, index)=>{
                        return (
                            <li key={index}>
                                <div className="flex my-5 justify-around items-center h-32 bg-white rounded-md">
                                    {/* Left Box */}
                                    <div className="bg-black w-32 h-32 rounded-md flex items-center justify-center">
                                        <span className="text-white">Box</span>
                                    </div>

                                    {/* Right Section */}
                                    <div className="flex items-center justify-evenly bg-slate-500 rounded-md">
                                        {/* Product Information */}
                                        <div className="flex flex-col px-4 py-2">
                                            <span className="font-bold text-white">{product.nameOfProduct}</span>
                                            <span className="text-white">{product.description}</span>
                                        </div>

                                        <div className="px-4 py-2">
                                            {product.priceOfProduct}
                                        </div>

                                        {/* Rating */}
                                        <div className="px-4 py-2">
                                            <span className="text-white">{product.HotelId}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                    
                </ul>
            </div>
        </div>
    );
}