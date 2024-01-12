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

    const navigate = useNavigate();

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
                    return response.json();
                } else {
                    throw new Error('Error');
                }
            })
            .then((data) => {
                console.log(data);
                // Handle success, e.g., navigate to a different page
            })
            .catch((error) => {
                console.error(error);
                // Handle error, e.g., display an error message
            });
    };

    const handleAddFile = () => {
        if (!file) {
            alert('you must upload file')
            return
        }

        const formdata = new FormData()
        formdata.append('file', file)

        fetch('http://localhost:2023/products/file', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(formdata)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                console.log(res);
                console.log(res.originalname);
                console.log(res._id);

            })
            .catch(err => {
                console.error(err)
            })

        document.getElementById('fileinput').value = null

        setFile(null)
    }

    return (
        <>
            <div className="container mx-auto pt-6 mt-6">
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

                <div className="container mt-5">
                    <div className="card p-3">
                        <div className="row">
                            <div className="col-10">
                                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                                    Image:
                                </label>
                                <input
                                    id="fileinput"

                                    className="w-full p-2 border rounded-md"
                                    type="file"
                                />
                            </div>
                            <div className="col-2">
                                <button
                                    onClick={handleAddFile}
                                    type="button"
                                    className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
                                >Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewProductPage;