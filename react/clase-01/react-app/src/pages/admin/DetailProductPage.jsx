import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";

function DetailProductPage() {
    const [product, setProduct] = useState("");
    const { idProduct } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:2023/products/${idProduct}`, {
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
                setProduct(data)
            })
    }, [idProduct])


    const handleCommentSubmit = () => {
        // Enviar el nuevo comentario al servidor
        fetch(`http://localhost:2023/products/${idProduct}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ comment: newComment, user: localStorage.getItem('email') })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw ('Error al enviar el comentario');
                }
            })
            .then((data) => {
                console.log(data);
                setComments(prevComments => [...prevComments, data.comment]);
                setNewComment("");// Limpiar el campo de comentario después de enviar
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    return (
        <>
            <div className="container mx-auto pt-6 mt-6">
                <Title>Product Detail</Title>
                {product ? (
                    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                        <p className="text-gray-700 mb-4">{product.description}</p>

                        {/* Puedes agregar más detalles del producto según sea necesario */}
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600">Price: ${product.price}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default DetailProductPage;