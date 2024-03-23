import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { useGetProductsQuery } from "../features/apiSlice";

function ProductsList({ }) {

    const { data: products, isLoading } = useGetProductsQuery();

    return (
        <>
            <div>
                <div className="text-center mb-6 py-16 section-product--cover">
                    <h1 className="uppercase section-about--title">All Recipe Books</h1>
                    <h2 className="pt-2 pb-2 text-4xl font-bold section-about--subtitle ">Find The Perfect Recipe Book For You</h2>
                    <p className="text-xl text-gray-600">
                        There's full of variety of recipes in our recipe books to delight you and everyone.
                    </p>
                </div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="container mx-auto mt-6 p-12 pt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                            {products.map((product) => (
                                <Link to={`/products/${product._id}`} key={product._id}>
                                    <div className=" p-6 rounded-md product--card">
                                        <img src={product.file} alt={product.name} className="product--card-img w-full h-48 object-cover mb-4" />
                                        <h2 className="text-xl mb-2 recipes-books--title">{product.name}</h2>
                                        <div className="flex items-center justify-center">
                                            <p className="recipes-books--detail">See detail</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductsList;