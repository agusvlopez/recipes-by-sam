import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductViewPage({ }) {
    const [product, setProduct] = useState("");
    const { idProduct } = useParams()
    useEffect(() => {
        fetch(`http://localhost:2023/products/${idProduct}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data)
            })
    }, [idProduct])

    return (
        <div>
            <h2>{idProduct}</h2>
            <p>{product.name}</p>
            <p>{product.description}</p>
        </div>
    )
}

export default ProductViewPage;