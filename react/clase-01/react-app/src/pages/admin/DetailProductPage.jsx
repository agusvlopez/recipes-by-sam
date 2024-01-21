import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { Loader } from "../../components/Loader";

function DetailProductPage() {
    const URL = "http://localhost:2023";

    const [product, setProduct] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const { idProduct } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${URL}/products/${idProduct}`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else if (response.status == 401) {
                    navigate('/login', { replace: true });
                    return {};
                }
            })
            .then((data) => {
                setProduct(data)
            })
    }, [idProduct])


    const handleDeleteProduct = (idProduct) => {
        // Envía la solicitud DELETE al servidor
        navigate(`/admin/products/${idProduct}/delete`);
    };

    const handleEditProduct = (idProduct) => {
        // Redirige a la página de edición del producto
        navigate(`/admin/products/${idProduct}/edit`);
    };

    return (
        <>
            <div className="container mx-auto p-4 pt-8">
                <Title>Product Detail</Title>
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
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleEditProduct(product._id)}
                                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 mr-2"
                                >
                                    Edit Product
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
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