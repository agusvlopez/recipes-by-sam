import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { Loader } from "../../components/Loader";
import { useCreateProductMutation, useGetProductQuery, useUpdateProductMutation } from "../../features/apiSlice";

const ProductPage = () => {
    const navigate = useNavigate();
    const { idProduct } = useParams();
    const isEditMode = !!idProduct;
    const [keepImage, setKeepImage] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingNew, setIsLoadingNew] = useState(false);
    const [file, setFile] = useState(null);
    const [productData, setProductData] = useState({
        stock: "",
        description: "",
        name: "",
        price: "",
    });

    const [createProduct] = useCreateProductMutation();
    const { data: product } = useGetProductQuery(idProduct);
    const [updateProduct] = useUpdateProductMutation();

    useEffect(() => {
        const clearMessages = setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 2000);

        return () => clearTimeout(clearMessages);
    }, [successMessage, errorMessage]);

    useEffect(() => {
        if (isEditMode && product) {
            setProductData(product);
            if (product.file) {
                setKeepImage(true);
            }
            setIsLoading(false);
        }
    }, [idProduct, navigate, isEditMode, product]);

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
            setKeepImage(false);
        } else if (!isEditMode) {
            setFile(newFile);
            setKeepImage(false);
        }
    };

    const handleDataFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoadingNew(true);

        const formDataForUpdate = new FormData();
        formDataForUpdate.append('stock', productData.stock);
        formDataForUpdate.append('description', productData.description);
        formDataForUpdate.append('name', productData.name);
        formDataForUpdate.append('price', productData.price);

        if (file) {
            formDataForUpdate.append('file', file);
        }

        try {
            if (isEditMode) {
                const result = await updateProduct({ idProduct, formData: formDataForUpdate }).unwrap();
                console.log('Product updated successfully:', result);
            } else {
                const result = await createProduct(formDataForUpdate).unwrap();
                console.log('Product added successfully:', result);
            }

            navigate('/admin/products', { state: { successMessage: isEditMode ? 'Product updated successfully!' : 'Product added successfully!' }, replace: true });

        } catch (error) {
            setErrorMessage(`Error ${isEditMode ? 'updating' : 'adding'} product. Please try again.`);
            console.error(error);
        } finally {
            setIsLoadingNew(false);
        }
    };

    return (
        <>
            <div className="container mx-auto p-4 mt-8">
                {errorMessage && (
                    <div className="bg-red-500 text-white p-4 mt-4">
                        {errorMessage}
                    </div>
                )}
                <div className="p-2">
                    <Title>{isEditMode ? 'Edit Product' : 'Add New Product'}</Title>
                    {isEditMode && isLoading || isLoadingNew ? (
                        <Loader />
                    ) : (
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
                                    className="p-2 border rounded-md"
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
                                    className="p-2 border rounded-md"
                                    required
                                />
                            </div>
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
                            <div className="mb-4">
                                <button
                                    type="submit"
                                    className="text-white p-2 rounded-md focus:outline-none focus:ring form-submit--button"
                                >
                                    {isEditMode ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductPage;