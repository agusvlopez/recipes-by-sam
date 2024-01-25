import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "./Title";
import { Loader } from "./Loader";
import { useGetProductsQuery } from "../features/apiSlice";


function ProductsList({ }) {

    const { data: products, isLoading } = useGetProductsQuery();

    return (
        <>
            <div className="container mx-auto mt-6 p-4">
                <Title>All Recipe Books</Title>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Link to={`/products/${product._id}`} key={product._id}>
                                <div className="bg-white p-6 rounded-md shadow-md">
                                    <h2 className="text-xl font-bold mb-2 text-gray-600">{product.name}</h2>
                                    <p className="text-gray-500 mb-4">{product.description}</p>
                                    <img src={product.file} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-600">Price: ${product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductsList;