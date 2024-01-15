import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";

const ProductPage = () => {
    const [productData, setProductData] = useState({
        stock: "",
        description: "",
        name: "",
    });
    const [file, setFile] = useState(null);
    const [keepImage, setKeepImage] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { idProduct } = useParams();
    const isEditMode = !!idProduct;

    useEffect(() => {
        // Limpiar mensajes después de 3 segundos
        const clearMessages = setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);

        return () => clearTimeout(clearMessages);
    }, [successMessage, errorMessage]);

    useEffect(() => {
        // Si está en modo de edición, cargar detalles del producto
        if (isEditMode) {
            fetch(`http://localhost:2023/products/${idProduct}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 401) {
                        navigate('/login', { replace: true });
                        return {};
                    } else {
                        throw new Error('Error fetching product details');
                    }
                })
                .then((data) => {
                    setProductData(data);
                    setFile(data.file);
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    }, [idProduct, navigate, isEditMode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        if (isEditMode) {
            const fileInput = e.target;
            const file = fileInput.files[0];
            setFile(file);
            setKeepImage(false); // Set to false when a new image is selected in edit mode
        } else {
            const file = e.target.files[0];
            setFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('stock', productData.stock);
        formData.append('description', productData.description);
        formData.append('name', productData.name);

        formData.append('file', file);

        const url = isEditMode
            ? `http://localhost:2023/products/${idProduct}`
            : 'http://localhost:2023/products';

        const method = isEditMode ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'auth-token': localStorage.getItem('token'),
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    setSuccessMessage(isEditMode ? "Product updated successfully!" : "Product added successfully!");
                    setProductData({
                        stock: "",
                        description: "",
                        name: "",
                    });
                } else {
                    throw new Error('Error');
                }
            })
            .then((data) => {
                console.log(data);
                // Handle success, e.g., navigate to a different page
            })
            .catch((error) => {
                setErrorMessage(`Error ${isEditMode ? 'updating' : 'adding'} product. Please try again.`);
                console.error(error);
            });
    };

    return (
        <>
            <div className="container mx-auto pt-6 mt-6">
                {successMessage && (
                    <div className="bg-green-500 text-white p-4 mt-4">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-500 text-white p-4 mt-4">
                        {errorMessage}
                    </div>
                )}
                <div className="p-6">
                    <Title>{isEditMode ? 'Edit Product' : 'Add New Product'}</Title>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                Product Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={productData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={productData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full p-2 border rounded-md"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">
                                Stock:
                            </label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={productData.stock}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {isEditMode &&
                            <>
                                <div className="mb-4">
                                    <p>Current Image</p>
                                    <img src={file?.filename} alt="" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="keepImage" className="block text-gray-700 font-bold mb-2">
                                        Keep Current Image:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="keepImage"
                                        name="keepImage"
                                        checked={keepImage}
                                        onChange={() => setKeepImage(!keepImage)}
                                    />
                                </div>
                            </>
                        }
                        <div className="mb-4">
                            <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
                                Image:
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleImageChange}
                                required={!keepImage} // No se requiere si se mantiene la imagen actual
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
                        >
                            {isEditMode ? 'Update Product' : 'Add Product'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductPage;