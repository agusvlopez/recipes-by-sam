import { useState, useEffect } from "react";
import ProductViewPage from "./src/pages/ProductViewPage";
import { Link } from "react-router-dom";

function ProductsList({ }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [product_id, setProductId] = useState(0);
    useEffect(() => {
        fetch('http://localhost:2023/products')
            .then((response) => response.json())
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
            <h3>Lista de productos</h3>
            <button onClick={handleError}>Mensaje de error</button>
            {error}
            <div className="product-list"></div>
            <ul>
                {
                    products.map((product) => <li key={product._id}>
                        <Link to={`/products/${product._id}`}>{product.name}</Link></li>)
                }
            </ul>
            <ProductViewPage />
        </>
    )
}

export default ProductsList;