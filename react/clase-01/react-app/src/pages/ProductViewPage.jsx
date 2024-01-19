import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../components/Title";

function ProductViewPage({ }) {
    const URL = "http://localhost:2023";
    const [product, setProduct] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { idProduct } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${URL}/products/${idProduct}`, {
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

        fetch(`${URL}/products/${idProduct}/reviews`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
                // setNewUser(data.user);
                console.log(data);
            });

    }, [idProduct, comments])


    const handleCommentSubmit = () => {
        // Enviar el nuevo comentario al servidor
        fetch(`${URL}/products/${idProduct}/reviews`, {
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

    const handleNewComment = (e) => {
        setNewComment(e.target.value);
    }

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

                        <div className="mt-8">
                            <h4 className="text-xl font-bold mb-4">Comments</h4>
                            <div className="mb-4">
                                <textarea
                                    rows="4"
                                    cols="50"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={handleNewComment}
                                    className="p-2 border rounded-md w-full"
                                />
                                <button
                                    onClick={handleCommentSubmit}
                                    className="mt-2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
                                >
                                    Send Comment
                                </button>
                            </div>

                            <ul>
                                {comments.map((comment, index) => (

                                    <li key={index} className="mb-2 text-gray-800"><span className="block font-bold">{comment.user}</span>{comment.comment}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default ProductViewPage;