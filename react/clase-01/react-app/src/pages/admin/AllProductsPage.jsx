import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../../components/Title";


function AdminProductsPage({ }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:2023/products', {
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
                setProducts(data);
            });

        return () => {
            console.log("se ejecuta cuando se desmonta el componente");
        }
    }, []);

    return (
        <>
            <div className="container mx-auto mt-8 p-4">
                <Title>Products List</Title>
                <div className="mb-6">
                    <Link to={'./newProduct'}><button className="p-2 text-white rounded">Add a product +</button></Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Link to={`./${product._id}`} key={product._id}>
                            <div key={product._id} className="bg-white p-4 rounded-md shadow-md">
                                <img src={`http://localhost:2023/uploads/${product.file.filename}`} alt="" />
                                {/* <img src={`../../../public/uploads/${product.file.filename}`} alt="" /> */}
                                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="text-gray-700">${product.price}</p>
                                {/* Add more product details or actions if needed */}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminProductsPage;