import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";

const ProductPage = () => {
    const URL = "https://vercel-api-beta-coral.vercel.app";
    const [file, setFile] = useState("");
    const [productData, setProductData] = useState({
        stock: "",
        description: "",
        name: "",
        price: "",
        file: {
            path: "",
            filename: "",
        }
    });
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
            fetch(`${URL}/products/${idProduct}`, {
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
                    setKeepImage(true);
                    console.log(data);
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
        const fileInput = e.target;
        const newFile = fileInput.files[0];

        console.log("New File:", newFile);

        if (isEditMode && newFile) {
            setFile(newFile);
        }
        else {
            setFile(newFile);
            // Handle other scenarios as needed
        }
    };

    const handleDataFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('stock', productData.stock);
        formData.append('description', productData.description);
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        if (!isEditMode) {
            formData.append('file', file);
        }

        const url = isEditMode
            ? `${URL}/products/${idProduct}`
            : `${URL}/products`;

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

                    // Redirigir a otra página después de 2 segundos
                    setTimeout(() => {
                        navigate('/admin/products');
                    }, 2000);

                    setProductData({
                        stock: "",
                        description: "",
                        name: "",
                        price: ""
                    });
                    setFile(null);  // Reset file field
                } else {
                    throw new Error('Error');
                }
            })
            .catch((error) => {
                setErrorMessage(`Error ${isEditMode ? 'updating' : 'adding'} product. Please try again.`);
                console.error(error);
            });
    };

    const handleImageFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        fetch(`${URL}/products/${idProduct}/image`, {
            method: 'PUT',
            headers: {
                'auth-token': localStorage.getItem('token'),
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    setSuccessMessage("Product image updated successfully!");
                    // Redirigir a otra página después de 2 segundos
                    setTimeout(() => {
                        navigate('/admin/products');
                    }, 2000);
                } else {
                    throw new Error('Error updating product image');
                }
            })
            .catch((error) => {
                setErrorMessage('Error updating product image. Please try again.');
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
                    <form onSubmit={handleDataFormSubmit} encType="multipart/form-data">
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
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                                Price: $
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* Mostrar la sección de imagen incluso al agregar un nuevo producto */}
                        {!isEditMode && (
                            <div className="mb-4">
                                <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
                                    Image:
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={handleImageChange}
                                    required={!keepImage}
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
                            >
                                {isEditMode ? 'Update Product Data' : 'Add Product Data'}
                            </button>
                        </div>
                    </form>

                    {/* Formulario solo para la imagen */}
                    {isEditMode &&
                        <>
                            <div className="mb-4">
                                <p>Current Image</p>
                                <div className="w-1/4">
                                    <img src={`${URL}/${file?.path}`} alt="" />
                                </div>
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
                            <form onSubmit={handleImageFormSubmit} encType="multipart/form-data">
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
                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
                                    >
                                        Update Product Image
                                    </button>
                                </div>
                            </form>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default ProductPage;