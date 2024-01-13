import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";

function DetailProductPage() {
    const [product, setProduct] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const { idProduct } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:2023/products/${idProduct}`, {
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
        fetch(`http://localhost:2023/products/${idProduct}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error deleting product');
                }
            })
            .then((data) => {
                console.log(data);
                setAlertMessage("Product deleted successfully");
                // Puedes realizar acciones adicionales después de la eliminación, como navegar a otra página
                setTimeout(() => {
                    navigate('/admin/products');
                }, 2000); // Redirige a /admin/products después de 2 segundos
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    return (
        <>
            <div className="container mx-auto pt-6 mt-6">
                <Title>Product Detail</Title>
                {alertMessage && (
                    <div className="bg-red-500 text-white p-4 mt-4">
                        {alertMessage}
                    </div>
                )}
                {product ? (
                    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                        <p className="text-gray-700 mb-4">{product.description}</p>

                        {/* Puedes agregar más detalles del producto según sea necesario */}
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600">Price: ${product.price}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
                        >
                            Delete Product
                        </button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default DetailProductPage;