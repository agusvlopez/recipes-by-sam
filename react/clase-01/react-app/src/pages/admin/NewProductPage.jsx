import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";

function NewProductPage({ }) {
    const [file, setFile] = useState(null)
    const [productData, setProductData] = useState({
        stock: "",
        description: "",
        name: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Limpiar mensajes después de 3 segundos
        const clearMessages = setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);

        return () => clearTimeout(clearMessages);
    }, [successMessage, errorMessage]);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setFile(file);
        console.log(file);
    }

    function convertFormData(formData) {
        const plainObject = {};
        formData.forEach((value, key) => {
            plainObject[key] = value;
        });
        return plainObject;
    }

    const handleAddProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('stock', productData.stock);
        formData.append('description', productData.description);
        formData.append('name', productData.name);
        formData.append('file', file);

        fetch('http://localhost:2023/products', {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    setSuccessMessage("Product added successfully!");
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
                setErrorMessage("Error adding product. Please try again.");
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
                    <Title>Add New Product</Title>
                    <form
                        onSubmit={handleAddProduct}
                        encType="multipart/form-data"
                    >
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
                            <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
                                Image:
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        {/* Add other form fields as needed */}
                        <button
                            type="submit" // Change to "submit" if using a form submit
                            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewProductPage;