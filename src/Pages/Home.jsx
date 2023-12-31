import React, { useEffect, useState } from "react";
import '../Styles/home.css'
import Products from "../Components/Products";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import CatagorySection from "../Components/CategorySection";

const Home = () => {
    const navigate = useNavigate()
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products")
                const data = await res.json()
                setApiData(data)
                setLoading(false);
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        API()
    }, [])

    const handleClick = (id) => {
        navigate(`/home/product/${id}`)
    }

    return (
        <>
            <div>
                <CatagorySection />
                {loading ? <Loader /> :
                    <div className="productsWrapper">
                        {apiData.map((element) => (
                            <Products id={element.id} keyId={element.id} image={element.image} category={element.category} price={element.price} title={element.title} handleClick={() => handleClick(element.id)} />
                        ))}
                    </div>
                }
            </div>
        </>
    )
};

export default Home;
