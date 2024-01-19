import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "./Title";

function ProductsList({ }) {
    const URL = "https://vercel-api-taupe-mu.vercel.app";
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [product_id, setProductId] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${URL}/products`, {
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
    console.log(products);
    return (
        <>
            <div className="container mx-auto pt-6 mt-6">
                <Title>All Recipes</Title>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Link to={`/products/${product._id}`} key={product._id}>
                            <div className="bg-white p-6 rounded-md shadow-md">
                                <h2 className="text-xl font-bold mb-2 text-gray-600">{product.name}</h2>
                                <p className="text-gray-500 mb-4">{product.description}</p>
                                <img src={`${URL}/${product.file?.path}`} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-600">Price: ${product.price}</p>
                                    <p>imagen : {`${URL}/${product.file?.path}`}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </>
    )
}

export default ProductsList;