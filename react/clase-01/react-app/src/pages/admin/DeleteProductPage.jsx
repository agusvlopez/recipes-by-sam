import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { Loader } from "../../components/Loader";
import { useDeleteProductMutation, useGetProductQuery } from "../../features/apiSlice";

function DetailProductPage() {
    const [alertMessage, setAlertMessage] = useState("");
    const { idProduct } = useParams();

    const navigate = useNavigate();
    const { data: product } = useGetProductQuery(idProduct);
    const [deleteProduct] = useDeleteProductMutation();

    const handleDeleteProduct = (idProduct) => {

        deleteProduct(idProduct);

        setAlertMessage("Product deleted successfully");

        setTimeout(() => {
            navigate('/admin/products');
        }, 2000);
    };

    return (
        <>
            <div className="container mx-auto p-4 pt-8">
                <Title>Delete {product.name}</Title>
                {alertMessage && (
                    <div className="bg-red-500 text-white p-4 mt-4">
                        {alertMessage}
                    </div>
                )}
                {product ? (
                    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md md:flex gap-4">
                        <div>
                            <img src={product.file} alt="" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-600">Price: ${product.price}</p>
                            </div>
                            <div className="mt-4">
                                <p className="font-semibold text-lg">Are you completly sure you want to delete this product?</p>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
                                >
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    )
}

export default DetailProductPage;