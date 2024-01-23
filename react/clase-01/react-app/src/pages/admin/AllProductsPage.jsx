import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../../components/Title";
import { Loader } from "../../components/Loader";
import { useGetProductsQuery } from "../../features/apiSlice";


function AdminProductsPage({ }) {

    const { data: products, isLoading } = useGetProductsQuery();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <div className="container mx-auto mt-8 p-4">
                <Title>Products List</Title>
                <div className="mb-6">
                    <Link to={'./newProduct'}><button className="p-2 text-white rounded">Add a product +</button></Link>
                </div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products?.map((product) => (
                            <Link to={`./${product._id}`} key={product._id}>
                                <div key={product._id} className="bg-white p-4 rounded-md shadow-md">
                                    <img src={product.file} alt="" />
                                    <h3 className="text-xl font-bold mb-2 mt-2">{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p className="text-gray-700 mt-2">${product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 p-4 text-white rounded-full shadow-md"
                >
                    &#8593;
                </button>
            </div>

        </>
    )
}

export default AdminProductsPage;