import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "./Title";

function ProductsList({ }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [product_id, setProductId] = useState(0);

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
    }, []); //el array vacio significa que se ejecuta solamente cuando se monta el componente.
    //con el useEffect() controlamos los cambios de estados y las actualizaciones..

    useEffect(() => {
        console.log("Cambiar la variable");
    }, [products]);

    const handleError = () => {
        setError("Error forzado");
    }

    return (
        <>
            <div className="container mx-auto pt-6 mt-6">
                <Title>All Recipes</Title>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Link to={`/products/${product._id}`}>
                            <div key={product._id} className="bg-white p-6 rounded-md shadow-md">
                                <Link to={`/products/${product._id}`} className="text-xl font-bold mb-2 text-indigo-600 hover:underline">{product.name}</Link>
                                <p className="text-gray-500 mb-4">{product.description}</p>
                                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </>
    )
}

export default ProductsList;