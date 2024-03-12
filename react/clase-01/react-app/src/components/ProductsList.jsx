import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "./Title";
import { Loader } from "./Loader";
import { useGetProductsQuery } from "../features/apiSlice";


function ProductsList({ }) {

    const { data: products, isLoading } = useGetProductsQuery();

    const truncateDescription = (description) => {
        return description.length > 100 ? description.substring(0, 100) + "..." : description;
    };

    return (
        <>
            <div className="container mx-auto mt-6 p-12 pt-0">
                <div className="text-center mb-6">
                    <h1 className="pl-6 pt-6 uppercase section-about--title">All Recipe Books</h1>
                    <h2 className="pl-6 pt-2 text-4xl font-bold section-about--subtitle ">Find The Perfect Recipe Book For You</h2>
                </div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                        {products.map((product) => (
                            <Link to={`/products/${product._id}`} key={product._id}>
                                <div className=" p-6 rounded-md product--card">
                                    <img src={product.file} alt={product.name} className="product--card-img w-full h-48 object-cover mb-4" />
                                    <h2 className="text-xl mb-2 recipes-books--title">{product.name}</h2>
                                    {/* <p className="text-gray-500 mb-4">{truncateDescription(product.description)}</p> */}
                                    <div className="flex items-center justify-center">
                                        <p className="recipes-books--detail">See detail</p>
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